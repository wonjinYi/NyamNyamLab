// imported Modules =============================================
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import { Modal, Input, TimePicker, Button, Divider, Select, message } from 'antd';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"

// imported components
import Loading from "../../../../ShareComponents/atoms/Loading";

// Main Component ===============================================
import DataStorage from "../../../../DataStorage";
const NYAM_TYPES = DataStorage("NYAM_TYPES");
const NYAM_TYPES_KEY = DataStorage("NYAM_TYPES_KEY");

const SUMMARY_INIT_VALUE = { name: null, description: null, open: null, close: null, type: null, lat: null, lng: null, comment: null };
const MENUITEM_INIT_VALUE = [{ name: '', price: '' }];

export default function NyamEditor({ labAccessInfo, taskType, pickCoord, defaultNyamValue, refreshMaps, nyamEditorModalVisible, setNyamEditorModalVisible, setIsPickmode, setMapsModalVisible }) {
    const [isLoading, setIsLoading] = useState(false);
    const [resetLock, setResetLock] = useState(false); // 냠에디터를 닫았다 열었을 때, selectedNyam의 내용으로 초기화시킬지. ( false : 초기화함, true : 초기화 안함, null : 폼 업데이트됨 )

    const [summary, setSummary] = useState(SUMMARY_INIT_VALUE);
    const [menuItems, setMenuItems] = useState(MENUITEM_INIT_VALUE);

    const { accessManagerUrl, labId } = labAccessInfo;
    const title = (taskType === "create" ? "새로운 냠 만들기" : "냠 수정하기");

    const initFormData = useCallback(() => {
        if (taskType === "edit" && defaultNyamValue != null) {
            // apply default value to "summary"
            const tempSummary = { ...defaultNyamValue };
            delete tempSummary.menu;
            setSummary(tempSummary);

            // apply default value to "menuItems"
            let tempMenuItems = [];
            tempMenuItems = (JSON.parse(defaultNyamValue.menu)).menu;
            setMenuItems(tempMenuItems);

        } else if (taskType === "create") {
            setSummary({ ...SUMMARY_INIT_VALUE, lat: pickCoord.y, lng: pickCoord.x, comment: JSON.stringify({ "comment": [] }) });
            setMenuItems(MENUITEM_INIT_VALUE)
        }

        setResetLock(null);
    }, [defaultNyamValue, taskType, pickCoord]);

    // 폼 초기값 지정.
    useEffect(() => {
        if (resetLock === false && nyamEditorModalVisible === true) {
            initFormData();
            setResetLock(null);
        }
    }, [resetLock, nyamEditorModalVisible, initFormData]);

    // 좌표 수정 업데이트.
    useEffect(() => {
        if (nyamEditorModalVisible === true && resetLock === true) {
            setSummary({ ...summary, lat: pickCoord.y, lng: pickCoord.x });
            setResetLock(null);
        }

    }, [pickCoord, nyamEditorModalVisible, resetLock, summary])



    // about onChange
    function onChangeSummary(target, value) {
        setSummary({ ...summary, [target]: value });
    }
    function onChangeMenuItems(index, type, value) {
        setMenuItems([...menuItems.slice(0, index), { ...menuItems[index], [type]: value }, ...menuItems.slice(index + 1)]);
    }

    // add/remove menu item
    function addNewMenuItem(index) { setMenuItems([...menuItems.slice(0, index), { name: '', price: '' }, ...menuItems.slice(index)]) }
    function removeMenuItem(index) { setMenuItems([...menuItems.slice(0, index), ...menuItems.slice(index + 1)]); }

    // about footer buttons.
    function clearAll(e) {
        const summaryReplace = {...SUMMARY_INIT_VALUE, id:summary.id, lat:summary.lat, lng:summary.lng, comment:summary.comment};

        setSummary(summaryReplace);
        setMenuItems(MENUITEM_INIT_VALUE);
    }

    async function onSubmit(e) {
        setIsLoading(true);

        const nyam = {};
        Object.assign(nyam, summary);
        
        // 검증
        for (let property of Object.keys(nyam)) {
            if (nyam[property] === null || nyam[property] === "") {
                message.warning("비어있는 정보를 채워넣어주세요!");
                setIsLoading(false);
                return;
            }
        }

        for (let item of menuItems) {
            if (item.name === '' || item.price === '') {
                message.warning("비어있는 정보를 채워넣어주세요!");
                setIsLoading(false);
                return;
            }
        }

        // 요청 데이터 준비
        Object.assign(nyam, { "menu": JSON.stringify({ "menu": menuItems }) });
        
        try {
            // 요청
            const rawData = {
                nyam : nyam,
                labId : labId,
            };
            const data = JSON.stringify(rawData);
            const url = `${accessManagerUrl}?taskTarget=nyam&taskType=${taskType}`;
            await axios.post(url, data);

            // 리프레시
            await refreshMaps();
            setNyamEditorModalVisible(false);
            setResetLock(false);
            setIsLoading(false);

            // 완료메시지
            if (taskType === "create") { message.success("새로운 냠을 만들었습니다!"); }
            else if (taskType === "edit") { message.success("냠이 수정되었습니다!"); }
        } catch (err) {
            setIsLoading(false);
            console.error(err);
            message.error("앗, 뭔가 잘못됐습니다. 다시 시도해주세요", 2.0);
        }
    }

    function onClose(e) {
        setNyamEditorModalVisible(false);
        setResetLock(false);
        if (taskType === "edit") {
            setMapsModalVisible(true);
        }
    }

    function onCoordEdit(e) {
        message.info("냠의 새로운 위치를 정해주세요", 5);
        setResetLock(true);
        setNyamEditorModalVisible(false);
        setIsPickmode(true);
    }

    return (
        <NyamEditorWrap className="NyamEditor">
            <Modal
                title={title}
                visible={nyamEditorModalVisible}
                onCancel={onClose}
                footer={null}
            >
                <SummaryWrap>
                    <Divider>개요</Divider>

                    <Coord>
                        <span style={{ marginRight: "8px", textAlign: "center" }}>{`위도 ${summary.lat}`}</span>
                        <span style={{ marginRight: "8px", textAlign: "center" }}>{`경도 ${summary.lng}`}</span>
                        <Button onClick={onCoordEdit} >위치 수정</Button>
                    </Coord>

                    <StyledInput name="name" placeholder="가게 이름" value={summary.name} onChange={(e) => { onChangeSummary(e.target.name, e.target.value) }} />
                    <StyledInput name="description" placeholder="설명" value={summary.description} onChange={(e) => { onChangeSummary(e.target.name, e.target.value) }} />

                    <TimePickersWrap>
                        <TimePicker
                            name="openTime" format="HH:mm" placeholder="문 여는 시간" value={summary.open ? moment(summary.open, "HH:mm") : null}
                            onChange={(time, timeString) => { onChangeSummary("open", timeString); }} style={{ flexGrow: "1", marginRight: SPACE }}
                            minuteStep={5}
                        />
                        <TimePicker
                            name="closeTime" format="HH:mm" placeholder="문 닫는 시간" value={summary.close ? moment(summary.close, "HH:mm") : null}
                            onChange={(time, timeString) => { onChangeSummary("close", timeString); }} style={{ flexGrow: "1" }}
                            minuteStep={5}
                        />
                    </TimePickersWrap>

                    <Select placeholder="유형을 골라주세요" value={summary.type} onChange={(value) => { onChangeSummary("type", value); }}>
                        {NYAM_TYPES_KEY.map((key, index) => (<Select.Option value={key} key={index}>{NYAM_TYPES[key]}</Select.Option>))}
                    </Select>
                </SummaryWrap>

                <MenusWrap>
                    <Divider>메뉴</Divider>

                    {menuItems.map((item, index) => MenuItem(index, item.name, item.price, addNewMenuItem, removeMenuItem, onChangeMenuItems))}
                    <StyledButton shape="circle" icon={<PlusOutlined />} style={{}} onClick={(e) => { addNewMenuItem(menuItems.length) }} />

                    <Divider />
                </MenusWrap>

                <ButtonsWrap>
                    <Button type="link" onClick={clearAll}>모두 지우기</Button>
                    <Button onClick={onSubmit} style={{ marginLeft: "auto" }}>저장</Button>
                </ButtonsWrap>

                <Loading isLoading={isLoading} />
            </Modal>
        </NyamEditorWrap>
    );
}

// style ========================================================
const SPACE = "4px";

// -- antd redefined style
const StyledInput = styled(Input)`
    margin-bottom : ${SPACE};
    `;

const StyledButton = styled(Button)`
    margin-right : ${SPACE};
    `;

// -- user defined style
const NyamEditorWrap = styled.div``;

const SummaryWrap = styled.div`
    display : flex;
    flex-direction : column;
    align-items : stretch;
    `;

const Coord = styled.div`
    display : flex;
    justify-content : flex-end;
    align-items : center;

    margin-bottom : ${SPACE}
    `;

const TimePickersWrap = styled.div`
    display : flex;
    margin-bottom : ${SPACE}
    `;

const MenusWrap = styled.div``;

const MenuItemWrap = styled.div`
    display : flex;
    `;

const ButtonsWrap = styled.div`
    display : flex;
    `;

// function =====================================================
// *

// 유사 컴포넌트 ================================================
function MenuItem(index, name, price, addNewMenuItem, removeMenuItem, onChangeMenuItems) {
    return (
        <MenuItemWrap key={index}>
            <StyledButton shape="circle" icon={<PlusOutlined />} style={{}} onClick={(e) => { addNewMenuItem(index); }} />
            <StyledButton shape="circle" icon={<MinusOutlined />} onClick={(e) => { removeMenuItem(index) }} />

            <StyledInput placeholder="메뉴 이름" value={name} style={{ marginRight: SPACE }} onChange={(e) => { onChangeMenuItems(index, "name", e.target.value); }} />
            <StyledInput placeholder="메뉴 가격" value={price} onChange={(e) => { onChangeMenuItems(index, "price", e.target.value); }} />
        </MenuItemWrap>
    )
}

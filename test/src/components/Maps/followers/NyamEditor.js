// imported Modules =============================================
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import { Modal, Input, TimePicker, Button, Tooltip, Divider, Select } from 'antd';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"

// imported components
import Loading from "../../atoms/Loading";

/* ******************************************* */
// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
import DataStorage from "../../../DataStorage";
const NYAM_TYPES = DataStorage("NYAM_TYPES");
const NYAM_TYPES_KEY = DataStorage("NYAM_TYPES_KEY");
const NYAM_LIST_SOURCE = DataStorage("NYAM_LIST_SOURCE");
// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
/* ******************************************* */

// Main Component ===============================================

const SUMMARY_INIT_VALUE = { name: null, description: null, open: null, close: null, type: null, lat: null, lng: null, comment: null };
const MENUITEM_INIT_VALUE = [{ name: null, price: null }];

export default function NyamEditor({ title, pickCoord, taskType, defaultNyamValue, refreshMaps, nyamEditorModalVisible, setNyamEditorModalVisible }) {
    const [isLoading, setIsLoading] = useState(false);

    const [summary, setSummary] = useState(SUMMARY_INIT_VALUE);
    const [menuItems, setMenuItems] = useState(MENUITEM_INIT_VALUE);

    useEffect(() => {
        if (taskType === "edit" && defaultNyamValue != null) {
            // apply default value to "summary"
            let tempSummary = {};
            Object.assign(tempSummary, defaultNyamValue);
            delete tempSummary.menu;
            setSummary(tempSummary);

            // apply default value to "menuItems"
            let tempMenuItems = [];
            tempMenuItems = (JSON.parse(defaultNyamValue.menu)).menu;
            setMenuItems(tempMenuItems);
        }
    }, [defaultNyamValue, taskType]);

    // about onChange
    function summaryOnChange(target, value) {
        setSummary({ ...summary, [target]: value });
    }
    function menuItemOnChange(index, type, value) {
        setMenuItems([...menuItems.slice(0, index), { ...menuItems[index], [type]: value }, ...menuItems.slice(index + 1)]);
    }

    // add/remove menu item
    function addNewMenuItem(index) { setMenuItems([...menuItems.slice(0, index), { name: '', price: '' }, ...menuItems.slice(index)]) }
    function removeMenuItem(index) { setMenuItems([...menuItems.slice(0, index), ...menuItems.slice(index + 1)]); }

    // about footer buttons.
    function clearAll(e) {
        setSummary(SUMMARY_INIT_VALUE);
        setMenuItems(MENUITEM_INIT_VALUE);
    }

    async function onSubmit(e) {
        setIsLoading(true);

        const data = {};
        Object.assign(data, summary);

        // 요청 데이터 준비
        if (taskType === "create") {
            Object.assign(data, { "comment": JSON.stringify({ "comment": [] }) });
            data.lat = pickCoord.y;
            data.lng = pickCoord.x;
        } else if (taskType === "edit") {

        }
        Object.assign(data, { "menu": JSON.stringify({ "menu": menuItems }) });

        // 검증
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            if (data[keys[i]] === null || data[keys[i]] === "") {
                console.log('통과하지못했음');
                setIsLoading(false);
                return;
            }
        }

        // 요청
        const strData = JSON.stringify(data);
        const url = `${NYAM_LIST_SOURCE}?taskTarget=nyam&taskType=${taskType}`;
        await axios.post(url, strData);

        // 리프레시
        await refreshMaps();
        setNyamEditorModalVisible(false);
        setIsLoading(false);
    }

    return (
        <NyamEditorWrap className="NyamEditor">
            <Modal
                title={title}
                visible={nyamEditorModalVisible}
                onCancel={() => { setNyamEditorModalVisible(false) }}
                footer={null}
            >
                <SummaryWrap>
                    <Divider>개요</Divider>

                    <StyledInput name="name" placeholder="가게 이름" value={summary.name} onChange={(e) => { summaryOnChange(e.target.name, e.target.value) }} />
                    <StyledInput name="description" placeholder="설명" value={summary.description} onChange={(e) => { summaryOnChange(e.target.name, e.target.value) }} />

                    <TimePickersWrap>
                        <TimePicker
                            name="openTime" format="HH:mm" placeholder="문 여는 시간" value={summary.open ? moment(summary.open, "HH:mm") : null}
                            onChange={(time, timeString) => { summaryOnChange("open", timeString); }} style={{ flexGrow: "1", marginRight: SPACE }}
                            minuteStep={5}
                        />
                        <TimePicker
                            name="closeTime" format="HH:mm" placeholder="문 닫는 시간" value={summary.close ? moment(summary.close, "HH:mm") : null}
                            onChange={(time, timeString) => { summaryOnChange("close", timeString); }} style={{ flexGrow: "1" }}
                            minuteStep={5}
                        />
                    </TimePickersWrap>

                    <Select placeholder="유형을 골라주세요" value={summary.type} onChange={(value) => { summaryOnChange("type", value); }}>
                        {NYAM_TYPES_KEY.map((key, index) => (<Select.Option value={key} key={index}>{NYAM_TYPES[key]}</Select.Option>))}
                    </Select>
                </SummaryWrap>

                <MenusWrap>
                    <Divider>메뉴</Divider>

                    { menuItems.map((item, index) => MenuItem(index, item.name, item.price, addNewMenuItem, removeMenuItem, menuItemOnChange)) }
                    <StyledButton shape="circle" icon={<PlusOutlined />} style={{}} onClick={(e) => { addNewMenuItem(menuItems.length) }} />
                    
                    <Divider />
                </MenusWrap>

                <ButtonsWrap>
                    <Button type="link" onClick={clearAll}>모두 지우기</Button>
                    <Button onClick={onSubmit} style={{ marginLeft: "auto" }}>가즈아</Button>
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
function MenuItem(index, name, price, addNewMenuItem, removeMenuItem, menuItemOnChange) {
    return (
        <MenuItemWrap key={index}>
            <StyledButton shape="circle" icon={<PlusOutlined />} style={{}} onClick={(e) => { addNewMenuItem(index); }} />
            <StyledButton shape="circle" icon={<MinusOutlined />} onClick={(e) => { removeMenuItem(index) }} />

            <StyledInput placeholder="메뉴 이름" value={name} style={{ marginRight: SPACE }} onChange={(e) => { menuItemOnChange(index, "name", e.target.value); }} />
            <StyledInput placeholder="메뉴 가격" value={price} onChange={(e) => { menuItemOnChange(index, "price", e.target.value); }} />
        </MenuItemWrap>
    )
}
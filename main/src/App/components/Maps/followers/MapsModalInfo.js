// imported Modules =============================================
import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";

import styled from 'styled-components';
import { Button, message, Tooltip } from "antd";
import { FormOutlined, QuestionCircleOutlined } from "@ant-design/icons"

// imported components ==========================================
import ContentsTable from "../../atoms/ContentsTable";
import DeleteBtn from "../../atoms/DeleteBtn";

// Main Component ===============================================
export default function MapsModalInfo({ nyamListSource, selectedNyam, refreshMaps, setIsLoading, setMapsModalVisible, setNyamEditorModalVisible, setNyamEditorTaskType }) {
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const { open, close, description, menu } = selectedNyam;
    const parsedMenu = JSON.parse(menu).menu;

    const onDelete = useCallback( async () => {
        setIsLoading(true);

        const url = `${nyamListSource}?taskTarget=nyam&taskType=delete`;
        const data = JSON.stringify(selectedNyam);

        await axios.post(url, data);

        await refreshMaps();
        setMapsModalVisible(false);
        setIsLoading(false);

        message.success("냠이 역사의 뒤안길로 사라졌습니다");
    },[setIsLoading, nyamListSource, refreshMaps, selectedNyam, setMapsModalVisible]);

    useEffect(() => {
        if (deleteConfirm === true) {
            onDelete();
            setDeleteConfirm(false);
        }
    }, [deleteConfirm, onDelete]);

    

    function openNyamEditor(e) {
        setNyamEditorTaskType("edit");
        setMapsModalVisible(false);
        setNyamEditorModalVisible(true);
    }

    return (
        <MapsModalInfoWrap className="MapsModalInfo">
            {/* 우측 상단 도구 */}
            <Tools>
                <a href={`https://map.naver.com/v5/search/${removeSpace(selectedNyam.name)}`} target="_blank" rel="noreferrer">
                    <Tooltip title="네이버지도" placement="top">
                        <Button shape="circle" icon={<QuestionCircleOutlined />} size="normal" style={{ marginRight: SPACE }} />
                    </Tooltip>
                </a>
                <Tooltip title="수정" placement="top">
                    <Button shape="circle" icon={<FormOutlined />} size="normal" style={{ marginRight: SPACE }} onClick={openNyamEditor} />

                </Tooltip>

                <Tooltip title="삭제" placement="top">
                    <DeleteBtn setDeleteConfirm={setDeleteConfirm} />
                    {/* <Button shape="circle" icon={<DeleteOutlined />} size="normal" onClick={(e) => { onDelete(); }} /> */}
                </Tooltip>
            </Tools>

            {/* 개요 */}
            <Summary>
                <div>
                    <Title>영업시간</Title>
                    <p>{open}~{close}</p>
                </div>
                <p style={{ marginLeft: "8px" }}>{description}</p>
            </Summary>

            {/* 메뉴목록 */}
            <ContentsTable desc={["메뉴", "가격"]} dataOrder={["name", "price"]} data={parsedMenu} />
        </MapsModalInfoWrap>
    );
}

// style ========================================================
const SPACE = "4px";

const MapsModalInfoWrap = styled.div`
    display : flex;
    flex-direction : column;

    flex : 1;
    margin-right : ${"8px"}; 

    @media(max-width : 768px){
        margin-right : 0;
        margin-bottom : 8px;
    }
    `;
const Tools = styled.div`
    display : flex;
    justify-content : flex-end;
    margin-bottom : ${SPACE};
    `;

const Summary = styled.div`
    display : flex;
    `;

const Title = styled.p`
    margin : 0;
    font-weight : bold;
    `;

// function =====================================================
function removeSpace(string) {
    const str = string.split(' ').join('');
    return str;
}
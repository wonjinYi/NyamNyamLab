// imported Modules =============================================
import React, { useState } from 'react';
import axios from "axios";

import styled from 'styled-components';


import { Button, message, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons"

// imported components ==========================================
import NyamEditor from "./NyamEditor";
import ContentsTable from "../../atoms/ContentsTable";

// Main Component ===============================================
export default function MapsModalInfo ({ nyamListSource, selectedNyam, refreshMaps, setIsLoading, setMapsModalVisible }) {
    const [ nyamEditorModalVisible, setNyamEditorModalVisible ] = useState(false);

    const { open, close, description, menu } = selectedNyam;
    const parsedMenu = JSON.parse(menu).menu;

    return (
        <MapsModalInfoWrap className="MapsModalInfo">
            <Tools>
                <a href={`https://map.naver.com/v5/search/${removeSpace(selectedNyam.name)}`} target="_blank" rel="noreferrer">
                    <Tooltip title="네이버지도" placement="top">
                        <Button shape="circle" icon={<QuestionCircleOutlined />} size="normal" style={{marginRight:SPACE}} />
                    </Tooltip>
                </a>
                <Tooltip title="수정" placement="top">
                    <Button shape="circle" icon={<FormOutlined />} size="normal" onClick={(e)=>{setNyamEditorModalVisible(true);}} style={{marginRight:SPACE}} />
                </Tooltip>
                <Tooltip title="크큭..없.앤.다." placement="top">
                    <Button shape="circle" icon={<DeleteOutlined />} size="normal" onClick={(e)=>{handleDelete(nyamListSource, selectedNyam, setIsLoading, setMapsModalVisible, refreshMaps);}} />
                </Tooltip>
            </Tools>

            <Summary>
                <div>
                    <Title>영업시간</Title> 
                    <p>{open}~{close}</p>
                </div>
                <p style={{marginLeft:"8px"}}>{description}</p>
            </Summary>

            <ContentsTable desc={["메뉴","가격"]} dataOrder={["name","price"]} data={parsedMenu} />

            <NyamEditor 
                title="냠 수정하기" pickCoord={null} taskType="edit" defaultNyamValue={selectedNyam} 
                refreshMaps={refreshMaps} nyamEditorModalVisible={nyamEditorModalVisible} setNyamEditorModalVisible={setNyamEditorModalVisible} 
            />

            
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

const MenuWrap = styled.div`
    display : flex;
    flex-direction : column;
    `;


const Title = styled.p`
    margin : 0;
    font-weight : bold;
    `;

// function =====================================================
async function handleDelete(nyamListSource, selectedNyam, setIsLoading, setMapsModalVisible, refreshMaps) {
    setIsLoading(true);

    const url = `${nyamListSource}?taskTarget=nyam&taskType=delete`;
    const data = JSON.stringify(selectedNyam);

    await axios.post(url, data);

    await refreshMaps();
    setMapsModalVisible(false);
    setIsLoading(false);

    message.success("냠이 역사의 뒤안길로 사라졌습니다");
}

function removeSpace(string) {
    const str = string.split(' ').join('');
    return str;
}
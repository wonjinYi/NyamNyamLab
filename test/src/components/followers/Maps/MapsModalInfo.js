// imported Modules =============================================
import React, { useState } from 'react';
import axios from "axios";

import styled from 'styled-components';


import { List, Button, Tooltip } from "antd";
import { FormOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons"

// imported components ==========================================
import NyamEditor from "./NyamEditor";

// Main Component ===============================================
export default function MapsModalInfo ({ nyamListSource, selectedNyam, refreshMaps, setIsLoading, setMapsModalVisible }) {
    const [ nyamEditorModalVisible, setNyamEditorModalVisible ] = useState(false);

    const { open, close, description, menu } = selectedNyam;
    const parsedMenu = JSON.parse(menu).menu;

    return (
        <MapsModalInfoWrap className="MapsModalInfo">
            <Tools>
                <a href={`https://map.naver.com/v5/search/${selectedNyam.name}`} target="_blank" rel="noreferrer">
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

            <MenuWrap>
                <Title>메뉴</Title>
                <List
                    size="small"
                    header={null}
                    footer={null}
                    bordered
                    dataSource={parsedMenu.map( item => ( `${item.name} ${item.price}` ) )}
                    renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                    style={{borderRadius:"8px"}}
                />
            </MenuWrap>

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

}
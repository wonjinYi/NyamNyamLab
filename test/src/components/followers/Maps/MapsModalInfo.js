// imported Modules =============================================
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Modal, Button, List } from "antd";
import axios from "axios";
import parser from "yargs-parser";

// imported components ==========================================
import Loading from "../../atoms/Loading";

// Main Component ===============================================
export default function MapsModalInfo ({ nyamListSource, selectedNyam }) {
    const { open, close, description, menu } = selectedNyam;
    const parsedMenu = JSON.parse(menu).menu;

    return (
        <MapsModalInfoWrap className="MapsModalInfo">
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
                    renderItem={item => <List.Item>{item}</List.Item>}
                    style={{borderRadius:"8px"}}
                />
                
            </MenuWrap>
        </MapsModalInfoWrap>
    );
}

// style ========================================================
const MapsModalInfoWrap = styled.div`
    display : flex;
    flex-direction : column;

    padding-right : 8px; 
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

const Menus = styled.ul`

`;

// function =====================================================
// *
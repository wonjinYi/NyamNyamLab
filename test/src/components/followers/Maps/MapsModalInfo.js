// imported Modules =============================================
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Modal, Button } from "antd";
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
                <p style={{marginLeft:"8px"}}>{`_ ${description}`}</p>
            </Summary>
            <MenuWrap>
                <Title>메뉴</Title>
                <Menus>
                {
                    parsedMenu.map( menu => (
                        <li key={menu.index}><strong>{menu.name}</strong> {menu.price}</li>
                    ))
                }
                </Menus>
            </MenuWrap>
        </MapsModalInfoWrap>
    );
}

// style ========================================================
const MapsModalInfoWrap = styled.div`
    display : flex;
    flex-direction : column;
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
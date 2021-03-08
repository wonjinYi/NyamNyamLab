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
                <p><Title>영업시간</Title> {open}~{close}</p>
                <p>{description}</p>
            </Summary>
            <Menus>
                <Title>메뉴</Title>
                <Contents>
                {
                    parsedMenu.map( menu => (
                        <li><strong>{menu.name}</strong> {menu.price}</li>
                    ))
                }
                </Contents>
            </Menus>
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

const Menus = styled.div`
    display : flex;
    flex-direction : column;
    `;

const Title = styled.span`
    font-weight : bold;
    `;

const Contents = styled.ul`

`;

// function =====================================================
// *
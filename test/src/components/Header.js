// imported Modules =============================================
import { React } from 'react';
import styled from 'styled-components';

// imported components ==========================================
import Menu from "./followers/Header/Menu";

// Main Component ===============================================
export default function Header ({ setFilters, isPickmode, setIsPickmode }) {
    return (
        <HeaderWrap className="Header">
            <Logo>냠냠랩(TEST)</Logo>
            <Menu setFilters={setFilters} isPickmode={isPickmode} setIsPickmode={setIsPickmode} />
        </HeaderWrap>
    );
}

// style ========================================================
const HeaderWrap = styled.div`
    display : flex;
    align-items : center;

    padding : 10px 0px;

    background-color : #333333;
    color : #FFFFFF;
    `;

const Logo = styled.h1`
    margin : 0;
    padding : 10px 20px;
    color : #FFFFFF;
    font-family: 'Poor Story', cursive;
    `;

// function =====================================================
// *
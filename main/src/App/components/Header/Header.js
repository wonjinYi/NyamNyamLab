// imported Modules =============================================
import { React } from 'react';
import styled from 'styled-components';

// imported components ==========================================
import Tools from "./followers/Tools";

// Main Component ===============================================
export default function Header ({ setFilters, setIsPickmode, setNyamEditorTaskType }) {
    return (
        <HeaderWrap className="Header">
            <Logo>
                <LogoImg src={"./logo.svg"} alt="logo Image"></LogoImg>
                <LogoText>냠냠랩</LogoText>
            </Logo>
            <Tools setFilters={setFilters} setIsPickmode={setIsPickmode} setNyamEditorTaskType={setNyamEditorTaskType} />
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

const LogoImg = styled.img`

    `;
const LogoText = styled.h1`
    margin : 0;
    padding : 10px 20px;
    color : #FFFFFF;
    font-family: 'Poor Story', cursive;
    `;

// function =====================================================
// *
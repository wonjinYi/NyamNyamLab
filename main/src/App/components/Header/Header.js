// imported Modules =============================================
import { React } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// imported components ==========================================
import Tools from "./followers/Tools";

// imported etc resource ========================================
import LOGO_IMG from "../../../logo.svg";

// Main Component ===============================================
export default function Header ({ setFilters, setIsPickmode, setNyamEditorTaskType }) {
    return (
        <HeaderWrap className="Header">
            <Link to={{ pathname:"/" }}>
                <Logo>
                    <LogoImg src={LOGO_IMG} alt="logo Image"></LogoImg>
                    <LogoText>냠냠랩</LogoText>
                </Logo>
            </Link>
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

const Logo = styled.div`
    display : flex;
    align-items : center;
    justify-contents : center;
    padding : 0px 10px;
    `;

const LogoImg = styled.img`
    width : 48px;
    height : 48px;
    `;
const LogoText = styled.h1`
    margin : 0;
    margin-left : 8px;
    color : #FFFFFF;
    font-family: 'Poor Story', cursive;
    `;

// function =====================================================
// *
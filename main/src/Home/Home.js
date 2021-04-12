// imported Modules =============================================
import React from 'react';
import { Link } from "react-router-dom";

import styled from 'styled-components';


// imported components ==========================================
import LabFinder from "./LabFinder";
import Footer from "../ShareComponents/atoms/Footer";
// Main Component ===============================================
// temp 
import Logo from "../logo.svg";
export default function Home() {
    
    return (
        <HomeWrap className="Home">
            <Header style={{display:"flex", alignItems:"center"}}>
                <Link to={{pathname:"/app"}}>
                    <span style={{fontSize:"64px"}}>[임시] 데이터 연구소 지도를 보시려면 여기를 클릭해주세요 [임시]</span>
                </Link>
            </Header>
            
            <LogoSection>
                <img src={Logo} alt="nyamnyamlab logo" />
                <LogoText>냠냠랩</LogoText>
            </LogoSection>

            <LabFinder />

            <Footer />
        </HomeWrap>
    );
}

// style ========================================================
const HomeWrap = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;

    height : 100%;

    background-color : #333333;
    color : #FFFFFF;
    `;

const Header = styled.div`
    height : 20%;
    `;

const LogoSection = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    height : 200px;

    color : #FFFFFF;
    `;

const LogoText = styled.h1`
    margin : 0;
    margin-left : 8px;
    
    font-size : 48px;
    color : #FFFFFF;
    font-family: 'Poor Story', cursive;
    `;

// function =====================================================
// *
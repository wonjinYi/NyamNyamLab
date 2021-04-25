// imported Modules =============================================
import React, { useState } from 'react';

import { Button } from 'antd';
import { GithubOutlined } from "@ant-design/icons"
import styled from 'styled-components';

// imported components ==========================================
import LabFinder from "./LabFinder";
import Loading from "../ShareComponents/atoms/Loading";
import Footer from "../ShareComponents/atoms/Footer";

// Main Component ===============================================

import LogoImage from "../logo.svg";
export default function Home() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <HomeWrap className="Home">
            <MainSection>
                <Header>
                    <Button disabled style={{borderRadius:'16px', marginRight:'12px'}}>
                        연구소 만들기
                    </Button>
                    <Button disabled shape="circle" icon={<GithubOutlined />} />
                </Header>
                <Contents>
                    <Logo>
                        <img src={LogoImage} alt="nyamnyamlab logo" />
                        <LogoText>냠냠랩</LogoText>
                    </Logo>
                    <LabFinder setIsLoading={setIsLoading} />
                </Contents> 
            </MainSection>

            <DetailSection>
                <h1 style={{margin : '200px 0', textAlign:'center'}}>
                    소개가 들어갈 공간
                </h1>
            </DetailSection>

            <Footer />

            <Loading isLoading={isLoading} />
        </HomeWrap>
    );
}

// style ========================================================
const HomeWrap = styled.div`
    
    `;

const MainSection = styled.div`
    display : flex;
    flex-direction : column;
    height : 100vh;

    background-color : #333333;
    color : #FFFFFF;
    `;

const Header = styled.div`
    display : flex;
    justify-content : flex-end;
    margin : 12px;
    `;

const Contents = styled.div`
    display : flex;
    flex : 1;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    `;

const Logo = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;

    color : #FFFFFF;
    `;

const LogoText = styled.h1`
    margin : 0;
    margin-left : 8px;
    
    font-size : 48px;
    color : #FFFFFF;
    font-family: 'Poor Story', cursive;
    `;

const DetailSection = styled.div`

`;
// function =====================================================
// *
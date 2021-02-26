import { React } from 'react';
import styled from 'styled-components';

export default function Header () {
    return (
        <HeaderWrap className="Header">
            <Logo>냠냠랩(TEST)</Logo>
            <Menu>
                [메뉴]
            </Menu>
        </HeaderWrap>
    );
}

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

    font-family: 'Poor Story', cursive;
    `;

const Menu = styled.div`
    display : flex;
    `;
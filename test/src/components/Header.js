import { React, useState } from 'react';
import styled from 'styled-components';

export default function Header () {
    return (
        <HeaderWrap className="Header">
            <Logo>냠냠랩</Logo>
            <Menu>
                [메뉴]
            </Menu>
        </HeaderWrap>
    );
}

const HeaderWrap = styled.div`
    display : flex;
    align-items : center;
    `;

const Logo = styled.h1`
    margin : 0;
    padding : 10px 20px;
    `;

const Menu = styled.div`
    display : flex;
    `;
// imported Modules =============================================
import { React } from 'react';
import styled from 'styled-components';

// Main Component ===============================================
export default function Menu () {
    return (
        <MenuWrap className="Menu">
            <span>필터</span>
            <span>새로만들기</span>
        </MenuWrap>
    );
}

// style ========================================================
const MenuWrap = styled.div`
    display : flex;
    justify-contents : center;
    align-items : center;

    padding : 10px 0px;

    background-color : #333333;
    color : #FFFFFF;
    `;

// function =====================================================
// *
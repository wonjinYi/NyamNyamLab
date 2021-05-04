// imported Modules =============================================
import { React } from "react";

import styled from "styled-components";
import { Button } from 'antd';

// Main Component ===============================================
export default function Confirm({ pickedCenter, activatePickmode, closeCenterPicker }) {
    return (
        <ConfirmWrap className="Confirm">
            <ConfirmWindow>
                <p>연구소 위치와 배율을 결정할까요?</p>
                <p><strong>위도 </strong>{pickedCenter.lat}</p>
                <p><strong>경도 </strong>{pickedCenter.lng}</p>
                <p><strong>지도 기본배율 </strong>{pickedCenter.zoom}</p>

                <Button onClick={e => closeCenterPicker(true)} type="primary">좋아요!</Button>
                <Button onClick={activatePickmode} style={{ marginLeft: "8px" }}>다시!</Button>
            </ConfirmWindow>
        </ConfirmWrap>
    );
}

// style ========================================================
const ConfirmWrap = styled.div`
    
    `;

const ConfirmWindow = styled.div`
    position : fixed;
    top : calc(50% + 48px);
    left : 50%;
    transform: translateX( -50% );
    padding : 24px 48px;

    background-color : white;
    box-shadow : 0px 5px 15px 0px #BCBCBC;

    @media(max-width:768px){
        width : 80%;
    }
    `;

// const TransparentBackdrop = styled.div`
//     position : fixed;
//     top : 0; 
//     left : 0;

//     width : 100%;
//     height : 100%;

//     background-color : rgba(0,0,0,0);
//     `;
// imported Modules =============================================
import { React, useState, useEffect } from "react";
import styled from "styled-components";

import { Checkbox, Popover, Button, Tooltip } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons"
import 'antd/dist/antd.css';

// imported Components ==========================================
// *

/* ******************************************* */
// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
import DataStorage from "../../../DataStorage"; 
const NYAM_TYPES = DataStorage("NYAM_TYPES");
const NYAM_TYPES_KEY = DataStorage("NYAM_TYPES_KEY");
// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
/* ******************************************* */

// Main Component ===============================================
export default function Menu ({ setFilters, setIsPickmode }) {
    const [checked, setChecked] = useState( initChecked(NYAM_TYPES_KEY) );

    useEffect ( () => { 
        setFilters(checked); 
    }, [checked, setFilters]);

    function onChange(e) { setChecked({ ...checked, [e.target.nyamType] : e.target.checked }) }

    return (
        <MenuWrap className="Menu">
            {/* 냠 필터링 */}
            <Popover placement="bottom" title={"냠 필터링"} content={filterContent(onChange, checked)} trigger="click">
                <Tooltip title="냠 필터링" placement="left">
                    <MenuButton shape="circle" icon={<FilterOutlined />} />
                </Tooltip>
            </Popover>

            {/* 새로운 냠 */}
            <Popover placement="bottom" title={"새로운 냠 만들기"} content={createNyamContent} trigger="click">
                <Tooltip title="새로운 냠" placement="right">
                    <MenuButton shape="circle" icon={<PlusOutlined />} style={{marginLeft:"8px"}} onClick={ () => { setIsPickmode(true); }} />
                </Tooltip>
            </Popover>
        </MenuWrap>
    );
}

function filterContent(onChange, checked) {
    return (
        <div className="filterContent">
        {
            NYAM_TYPES_KEY.map( key => (
                <Checkbox onChange={onChange} checked={checked[key]} nyamType={key} key={key}>{NYAM_TYPES[key]}</Checkbox>
            ))
        }
        </div>
    )
}

const createNyamContent = (
    <div>
        <p style={{margin:"0"}}><strong>지도에서 새로운 남의 위치를 찍어주세요</strong></p>
        {/* <p style={{margin:"0"}}>버튼을 다시누르면 '새로운 냠 만들기'가 취소됩니다</p> */}
    </div>
);
    
// style ========================================================
const MenuWrap = styled.div`
    display : flex;
    justify-contents : center;
    align-items : center;

    padding : 10px 0px;

    background-color : #333333;
    color : #FFFFFF;
    `;

const MenuButton = styled(Button)`
    border : 0;
    `;

// function =====================================================
function initChecked(arr) {
    let obj = {};
    arr.forEach( el => {
        obj[el] = true;
    });

    return obj;
}
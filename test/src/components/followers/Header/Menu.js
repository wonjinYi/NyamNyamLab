// imported Modules =============================================
import { React, useState, useEffect } from "react";
import styled from "styled-components";

import { Checkbox, Popover, Button, Tooltip } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons"
import 'antd/dist/antd.css';

import DataStorage from "../../../DataStorage"; // [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요

// Main Component ===============================================
const NYAM_TYPES = DataStorage("NYAM_TYPES"); // [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
const NYAM_TYPES_KEY = DataStorage("NYAM_TYPES_KEY");

export default function Menu ({ setFilters }) {
    const [checked, setChecked] = useState( initChecked(NYAM_TYPES_KEY) );
    useEffect ( () => { 
        setFilters(checked); 
    }, [checked, setFilters]);

    function onChange(e) { setChecked({ ...checked, [e.target.nyamType] : e.target.checked }) }

    return (
        <MenuWrap className="Menu">
            <Popover className="filter" placement="bottom" title={"냠 필터링"} content={filterContent(onChange, checked)} trigger="click">
                <Tooltip title="냠 필터링">
                    <MenuButton shape="circle" icon={<FilterOutlined />} />
                </Tooltip>
            </Popover>

            <Tooltip className="create" title="새로운 냠">
                <MenuButton shape="circle" icon={<PlusOutlined />} style={{marginLeft:"8px"}} />
            </Tooltip>
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
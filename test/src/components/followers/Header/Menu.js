// imported Modules =============================================
import { React, useState, useEffect } from "react";
import styled from "styled-components";

import { Checkbox, Popover, Button, Tooltip } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons"
import 'antd/dist/antd.css';

// Main Component ===============================================
export default function Menu ({ setFilters }) {
    const [checked, setChecked] = useState({
        meal : true,
        fastfood : true,
        cvs : true,
        cafe : true,
    });
    useEffect ( () => { setFilters(checked); }, [checked, setFilters] );

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
        <div>
            <Checkbox onChange={onChange} checked={checked.meal} nyamType="meal">밥</Checkbox>
            <Checkbox onChange={onChange} checked={checked.fastfood} nyamType="fastfood">패스트푸드</Checkbox>
            <Checkbox onChange={onChange} checked={checked.cvs} nyamType="cvs">편의점</Checkbox>
            <Checkbox onChange={onChange} checked={checked.cafe} nyamType="cafe">카페</Checkbox>
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
// *
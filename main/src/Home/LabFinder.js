// imported Modules =============================================
import { React, useState, useEffect } from 'react';

import styled from 'styled-components';
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from "@ant-design/icons"

import axios from "axios";
// imported components ==========================================
// *

// Main Component ===============================================

const RUN_SCRIPT = "https://script.google.com/macros/s/AKfycbx2r57wW6_v9qSH13GkEsXcZqHJIryMs4RXraGRVJMtuBfasUAzhq2qFRSFJhL8EBLSKQ/exec";

export default function LabFinder() {
    const [inputValue, setInputValue] = useState('');
    const submitBtn = (
        <Button
            shape="circle" icon={<SearchOutlined />} size="normal"
            onClick={onSubmit}
        />
    );

    async function onSubmit(e) {
        console.log(inputValue);
        const { data } = await axios.get(`${RUN_SCRIPT}?SpreadSheetID=${inputValue}`)
        console.log(data.status);
        console.log(data.data); // 1UVa8EDyyGh2QC6lA5eurjFER8B6paTMpOTYncZ6AwPQ 
    }

    return (
        <LabFinderWrap className="LabFinder">
            <FinderInput
                placeholder="연구소로 가는 길을 알려주세요" size="large"
                suffix={submitBtn}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); }}
                onPressEnter={onSubmit}
            />
            <FindHistory>

            </FindHistory>
        </LabFinderWrap>
    );
}

// style ========================================================
const LabFinderWrap = styled.div`
    display : flex;
    flex : 1;
    flex-direction : column;
    justify-content : center;
    align-items : flex-start;
    
    width : 80%;
    `;

const FinderInput = styled(Input)`
    width : 100%;
    margin : 8px; 

    border-radius : 24px;
    
    border-color : white;
    &:hover { border-color : white; }
    &:focus { border-color : white; }
    `;

const FindHistory = styled.div`
    display : flex;
    justify-content : flex-start;
    `;
const HistoryItem = styled.span`
    padding : 4px 8px;
    border-radius : 24px;
    background-color : #FFFFFF;
    color : #333333;
    `;
// function =====================================================
// *
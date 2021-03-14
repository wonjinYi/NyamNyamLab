// imported Modules =============================================
import React from 'react';
import styled from 'styled-components';

import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons"

// Main Component ===============================================
export default function Comment ({ index, content, onDelete }) {
    return (
        <CommentWrap className="Comment">
            <Content>{content}</Content>
            <Tooltip className="deleteComment" title="크큭..없.앤.다." placement="right">
                <Button index={index} shape="circle" icon={<DeleteOutlined />} style={{}} onClick={(e)=>{onDelete(index)}} />
            </Tooltip>
        </CommentWrap>
    );
}

// style ========================================================
const SPACE = "4px";

const CommentWrap = styled.div`
    display : flex;
    justify-content : flex-end;

    margin-top : ${SPACE};
    `;

const Content = styled.p`
    padding : ${SPACE};
    border : 1px solid #DCDCDC;
    border-radius : 8px;
    margin : 0;
    max-width : 100%;
    margin-right : ${SPACE};
    
    word-break: break-all;
    overflow-wrap: break-word;
    `;

// function =====================================================
// *
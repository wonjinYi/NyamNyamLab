// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons"

// Main Component ===============================================
export default function Comment ({ content, onDelete }) {
    return (
        <CommentWrap className="Comment">
            <Content>{content}</Content>
            <Tooltip className="deleteComment" title="크큭..없.앤.다." placement="right">
                <Button shape="circle" icon={<DeleteOutlined />} style={{}} onClick={onDelete} />
            </Tooltip>
        </CommentWrap>
    );
}

// style ========================================================
const SPACE = "4px";

const CommentWrap = styled.div`
    display : flex;
    justify-content : flex-end;
    
    margin-bottom : ${SPACE};
    `;

const Content = styled.p`
    padding : ${SPACE};
    border : 1px solid #DCDCDC;
    border-radius : 8px;
    margin : 0;
    margin-right : ${SPACE};
    `;

// function =====================================================
// *
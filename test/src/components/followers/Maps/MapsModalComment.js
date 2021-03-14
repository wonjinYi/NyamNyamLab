// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Tooltip, Input } from "antd";
import { EditOutlined } from "@ant-design/icons"

// imported components ==========================================
import Comment from "../../atoms/Comment";

// Main Component ===============================================
export default function MapsModalComment ({ nyamListSoruce, selectedNyam }) {
    const commentsData = JSON.parse(selectedNyam.comment).comment;

    return (
        <MapsModalCommentWrap className="MapsModalComment">
            
            <Comments>
            {
                commentsData.map( ( item, index ) => (
                    <Comment key={index} content={item} onDelete={onDelete} />
                ))
            }
            </Comments>

            <Form>
                <Input placeholder="새로운 의견을 적어주세요" style={{borderRadius:"8px", marginRight:"4px"}}></Input>
                <Tooltip className="deleteComment" title="새로운 의견적기" placement="right">
                    <Button shape="circle" icon={<EditOutlined />} size="normal" style={{}} onClick={onCreate} />
                </Tooltip>
            </Form>
            
        </MapsModalCommentWrap>
    );
}

// style ========================================================
const MapsModalCommentWrap = styled.div`
    display : flex;
    flex-direction : column;

    width : 40%;

    margin-left : auto;
    padding : 16px;
    border : 1px solid #dbdbdb;
    border-radius : 8px;
    `;

const Comments = styled.div`
    display : flex;
    flex-direction : column;
    align-content : flex-end;
    justify-content : flex-start;
   
    overflow-y: auto;
`;

const Form = styled.div`
    display :flex;
    align-items : center;
`;

// function =====================================================
function onCreate() {
    console.log("새로쓰기")
}
function onDelete() {
    console.log("삭제삭제");
}
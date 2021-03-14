// imported Modules =============================================
import React, { useState } from 'react';
import axios from "axios";

import styled from 'styled-components';

import { Button, Tooltip, Input } from "antd";
import { EditOutlined } from "@ant-design/icons"

// imported components ==========================================
import Comment from "../../atoms/Comment";

// Main Component ===============================================
export default function MapsModalComment ({ nyamListSource, selectedNyam, refreshMaps, setIsLoading }) {
    const [newComment, setNewComment] = useState(null);
    const commentsData = JSON.parse(selectedNyam.comment).comment;

    async function onCreate(e) {
        setIsLoading(true);

        // 검증
        if (newComment==null || newComment===''){ 
            setIsLoading(false);
            return; 
        }

        // 요청 데이터 준비`
        const url = `${nyamListSource}?taskTarget=comment&taskType=edit`;
        const data = JSON.stringify({
            id : selectedNyam.id,
            comment : JSON.stringify({ comment : [newComment, ...commentsData ] })
        });
        
        // 요청
        //console.log(data);
        await axios.post(url, data);

        // 리프레시
        await refreshMaps();
        setNewComment(null);
        setIsLoading(false);
    }

    async function onDelete(index) {
        setIsLoading(true);

        // 요청 데이터 준비
        const url = `${nyamListSource}?taskTarget=comment&taskType=edit`;
        const data = JSON.stringify({
            id : selectedNyam.id,
            comment : JSON.stringify({ comment : [...commentsData.slice(0,index), ...commentsData.slice(index+1)] })
        });
        
        // 요청
        //console.log(data);
        await axios.post(url, data);

        // 리프레시
        await refreshMaps();
        setIsLoading(false);
    }

    return (
        <MapsModalCommentWrap className="MapsModalComment">
            <Form>
                <Input placeholder="새로운 의견을 적어주세요" value={newComment} onChange={(e)=>{setNewComment(e.target.value);}} style={{borderRadius:"8px", marginRight:"4px"}} />
                <Tooltip className="deleteComment" title="새로운 의견적기" placement="right">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size="normal" onClick={onCreate} />
                </Tooltip>
            </Form>

            <Comments>
            {
                commentsData.length > 0 
                ?   commentsData.map( ( item, index ) => (
                        <Comment key={index} index={index} content={item} onDelete={onDelete} />
                    ))
                
                :   <EmptyNoti><h1>아무것도 없었다</h1></EmptyNoti>
            }
            </Comments>
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
    height : 100%;
    overflow-y: auto;
    `;

const Form = styled.div`
    display :flex;
    align-items : center;
    `;

const EmptyNoti = styled.div`
    display : flex;
    height : 100%;
    justify-content : center;
    align-items : center;
    `;
// function =====================================================
// *
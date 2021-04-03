// imported Modules =============================================
import React, { useCallback, useState } from 'react';
import axios from "axios";

import styled from 'styled-components';

import { Button, Tooltip, Input, Popover } from "antd";
import { EditOutlined, SmileOutlined } from "@ant-design/icons"

import Picker from 'emoji-picker-react';

// imported components ==========================================
import Comment from "../../atoms/Comment";

// Main Component ===============================================
export default function MapsModalComment({ nyamListSource, selectedNyam, refreshMaps, setIsLoading }) {
    const [newComment, setNewComment] = useState('');
    const commentsData = JSON.parse(selectedNyam.comment).comment;

    async function onCreate(e) {
        setIsLoading(true);

        // 검증
        if (newComment == null || newComment === '') {
            setIsLoading(false);
            return;
        }

        // 요청 데이터 준비`
        const url = `${nyamListSource}?taskTarget=comment&taskType=edit`;
        const data = JSON.stringify({
            id: selectedNyam.id,
            comment: JSON.stringify({ comment: [newComment, ...commentsData] })
        });

        // 요청
        //console.log(data);
        await axios.post(url, data);

        // 리프레시
        await refreshMaps();
        setNewComment('');
        setIsLoading(false);
    }

    const onDelete = useCallback(async (index) => {
        setIsLoading(true);

        // 요청 데이터 준비
        const url = `${nyamListSource}?taskTarget=comment&taskType=edit`;
        const data = JSON.stringify({
            id: selectedNyam.id,
            comment: JSON.stringify({ comment: [...commentsData.slice(0, index), ...commentsData.slice(index + 1)] })
        });

        // 요청
        //console.log(data);
        await axios.post(url, data);

        // 리프레시
        await refreshMaps();
        setIsLoading(false);
    }, [nyamListSource, selectedNyam, commentsData, setIsLoading, refreshMaps]);

    return (
        <MapsModalCommentWrap className="MapsModalComment">
            <Form>
                <Input 
                    placeholder="새로운 의견을 적어주세요" 
                    value={newComment} onChange={(e) => { setNewComment(e.target.value); }} 
                    style={{ borderRadius: "8px", marginRight: "4px" }} 
                    suffix={
                        <Popover placement="bottom" title={null} content={<Picker onEmojiClick={(e,obj) => {setNewComment(newComment+obj.emoji)}} />} trigger="click">
                            <Tooltip title="이모지" placement="top">
                                <SmileOutlined />
                            </Tooltip>
                        </Popover>
                    }
                />
                
                <Tooltip className="deleteComment" title="쓰기" placement="right">
                    <Button type="primary" shape="circle" icon={<EditOutlined />} size="normal" onClick={onCreate} />
                </Tooltip>
            </Form>

            <Comments>
                {
                    commentsData.map((item, index) => (
                        <Comment key={index} index={index} content={item} onDelete={onDelete} />
                    ))
                }
            </Comments>
        </MapsModalCommentWrap>
    );
}

// style ========================================================
const BORDER_COLOR = "#dbdbdb";

const MapsModalCommentWrap = styled.div`
    display : flex;
    flex-direction : column;

    width : 40%;

    margin-left : auto;
    padding : 16px;

    border : 1px solid ${BORDER_COLOR};
    border-bottom : 12px solid ${BORDER_COLOR};
    border-radius : 8px;

    @media(max-width : 768px){
        width : 100%;
    }
    `;

 const Form = styled.div`
    display :flex;
    align-items : center;
    `;

const Comments = styled.div`
    display : flex;
    flex-direction : column;
    align-content : flex-end;
    justify-content : flex-start;

    height : 100%;

    overflow-y: auto;
    `;

// function =====================================================
// *
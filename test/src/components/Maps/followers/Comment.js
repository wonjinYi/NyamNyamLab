// imported Modules =============================================
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

// imported Components 
import DeleteBtn from "../../atoms/DeleteBtn";

// Main Component ===============================================
export default function Comment ({ index, content, onDelete }) {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    useEffect( () => {
        if(deleteConfirm === true){
            onDelete(index);
            setDeleteConfirm(false);
        }
    }, [deleteConfirm]);

    return (
        <CommentWrap className="Comment">
            <Content>{content}</Content>
            <DeleteBtn setDeleteConfirm={setDeleteConfirm} />
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
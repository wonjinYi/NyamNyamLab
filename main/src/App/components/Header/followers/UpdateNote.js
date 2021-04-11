// imported Modules =============================================
import React, { useEffect, useState } from 'react';
import { Modal } from "antd";
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

// imported components ==========================================
// *

// Main Component ===============================================
import mdSource from "./UpdateNoteRaw.md";

export default function UpdateNote({ updateNoteModalVisible, setUpdateNoteModalVisible}) {
    const [markdown, setMarkdown] = useState('');

    useEffect( () => {
        async function init() {
            const str = await fetch(mdSource)
            .then( res => res.text() );

            setMarkdown(str);
        }
        init();
    }, [markdown]);

    return (
        <UpdateNoteWrap className="UpdateNote">
            <Modal
                title={"업데이트 노트"}
                visible={updateNoteModalVisible}
                onCancel={() => { setUpdateNoteModalVisible(false) }}
                footer={null}
                style={{minWidth:"50%"}}
            >
                <ReactMarkdown children={markdown} />
            </Modal>
        </UpdateNoteWrap>
    );
}

// style ========================================================
const UpdateNoteWrap = styled.div`

    `;

// function =====================================================
// *
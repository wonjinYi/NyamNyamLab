// imported Modules =============================================
import { React, useState } from 'react';
import styled from 'styled-components';

import { Popover, Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

// imported components ==========================================
// *

// Main Component ===============================================
const POPOVER_TITLE = "정말로 지울까요?";

export default function DeleteBtn({ setDeleteConfirm }) {
    const [visible, setVisible] = useState(false);

    const formContent = (
        <div className="confirmContent" style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={onConfirm} type="primary" style={{ marginRight: "4px" }}>네</Button>
            <Button onClick={onCancle}>아니요</Button>
        </div>
    );

    function onConfirm() {
        setDeleteConfirm(true);
        setVisible(false);
    }

    function onCancle() {
        setVisible(false);
    }

    return (
        <DeleteBtnWrap className="DeleteBtn">
            <Popover
                trigger="click" visible={visible} onVisibleChange={(visible)=>{setVisible(visible)}}
                placement="right" title={POPOVER_TITLE} content={formContent} onClick={(e) => { setVisible(true); }}
            >
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Popover>
        </DeleteBtnWrap>
    );
}

// style ========================================================
const DeleteBtnWrap = styled.div`

    `;

// function =====================================================
// *
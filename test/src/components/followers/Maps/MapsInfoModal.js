// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, Button } from 'antd';

// imported components ==========================================
// *

// Main Component ===============================================
export default function MapsInfoModal ({selectedNyam, mapsModalVisible, setMapsModalVisible}) {
    if (selectedNyam === null) {
        return ( <div></div> );
    }
    console.log(selectedNyam);
    const { name, open, close } = selectedNyam;

    return (
        <MapsInfoModalWrap className="MapsInfoModal">
            <Modal
                title={name}
                visible={mapsModalVisible}
                onCancel={() => { setMapsModalVisible(false) }}
                footer={null}
            >
                <span>{open}~{close}</span>
            </Modal>
        </MapsInfoModalWrap>
    );
}

// style ========================================================
const MapsInfoModalWrap = styled.div`
    display : flex;
    `;

// function =====================================================
// *
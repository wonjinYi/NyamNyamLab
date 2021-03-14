// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

// imported components ==========================================
import MapsModalInfo from "./MapsModalInfo";
import MapsModalComment from "./MapsModalComment";

// Main Component ===============================================
export default function MapsModal ({nyamListSource, selectedNyam, mapsModalVisible, setMapsModalVisible}) {
    return (
        selectedNyam !== null
            ?
                <MapsModalWrap className="MapsModal">
                    <StyledModal
                        title={selectedNyam.name}
                        visible={mapsModalVisible}
                        onCancel={() => { setMapsModalVisible(false) }}
                        footer={null}
                    >
                        <ModalContentsWrap>
                            <MapsModalInfo  selectedNyam={selectedNyam} />
                            <MapsModalComment nyamListSource={nyamListSource} selectedNyam={selectedNyam} />
                        </ModalContentsWrap>
                        
                    </StyledModal>
                </MapsModalWrap>
    
            :   
                <div></div>
    );
}

// style ========================================================
const MapsModalWrap = styled.div`

    `;

const ModalContentsWrap = styled.div`
    display : flex;
`;
const StyledModal = styled(Modal)`
    min-width : 50%;
`;
// function =====================================================
// *
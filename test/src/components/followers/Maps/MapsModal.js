// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

// imported components ==========================================
import MapsModalInfo from "./MapsModalInfo";
import MapsModalComment from "./MapsModalComment";
import Loading from "../../atoms/Loading";

// Main Component ===============================================
export default function MapsModal ({nyamListSource, selectedNyam, refreshMaps, mapsModalVisible, setMapsModalVisible}) {
    const [ isLoading, setIsLoading ] = useState(false);
    console.log(selectedNyam);
    return (
        selectedNyam != null
            ?
                <MapsModalWrap className="MapsModal">
                    <StyledModal
                        title={selectedNyam.name}
                        visible={mapsModalVisible}
                        onCancel={() => { setMapsModalVisible(false) }}
                        footer={null}
                    >
                        <ModalContentsWrap>
                            <MapsModalInfo nyamListSource={nyamListSource} selectedNyam={selectedNyam} refreshMaps={refreshMaps} setIsLoading={setIsLoading} setMapsModalVisible={setMapsModalVisible} />
                            <MapsModalComment nyamListSource={nyamListSource} selectedNyam={selectedNyam} refreshMaps={refreshMaps} setIsLoading={setIsLoading} />
                        </ModalContentsWrap>

                        <Loading isLoading={isLoading} />
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

    @media(max-width : 768px){
        flex-direction : column;
    }
`;
const StyledModal = styled(Modal)`
    min-width : 50%;
`;
// function =====================================================
// *
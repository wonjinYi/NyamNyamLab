// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

// imported components ==========================================
import MapsModalInfo from "../followers/MapsModalInfo";
import MapsModalComment from "../followers/MapsModalComment";
import Loading from "../../../../ShareComponents/atoms/Loading";

// Main Component ===============================================
export default function MapsModal ({labAccessInfo, selectedNyam, refreshMaps, mapsModalVisible, setMapsModalVisible, setNyamEditorModalVisible, setNyamEditorTaskType}) {
    const [ isLoading, setIsLoading ] = useState(false);

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
                            <MapsModalInfo 
                                labAccessInfo={labAccessInfo} selectedNyam={selectedNyam} refreshMaps={refreshMaps} 
                                setIsLoading={setIsLoading} setMapsModalVisible={setMapsModalVisible} setNyamEditorModalVisible={setNyamEditorModalVisible} setNyamEditorTaskType={setNyamEditorTaskType}
                            />
                            <MapsModalComment labAccessInfo={labAccessInfo} selectedNyam={selectedNyam} refreshMaps={refreshMaps} setIsLoading={setIsLoading} />
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
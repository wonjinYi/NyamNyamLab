// imported Modules =============================================
import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

// imported components ==========================================
import MapsModalInfo from "./MapsModalInfo";
import MapsModalComment from "./MapsModalComment";

// Main Component ===============================================
export default function MapsInfoModal ({nyamListSource, selectedNyam, mapsModalVisible, setMapsModalVisible}) {
    const [ isLoading, setIsLoading ] = useState(false);
    
    return (
        selectedNyam !== null
            ?
                <MapsInfoModalWrap className="MapsInfoModal">
                    <Modal
                        title={selectedNyam.name}
                        visible={mapsModalVisible}
                        onCancel={() => { setMapsModalVisible(false) }}
                        footer={null}
                    >
                        <MapsModalInfo nyamListSource={nyamListSource} selectedNyam={selectedNyam} />
                        <MapsModalComment nyamListSource={nyamListSource} nyamid={selectedNyam.id} />
                    </Modal>
                </MapsInfoModalWrap>
    
            :   <div></div>
          
    );
}

// style ========================================================
const MapsInfoModalWrap = styled.div`
    display : flex;
    `;

// function =====================================================
// const getData = {
//     comments : async (src, id) => {
//         const { data } = await axios.get(`${src}?type=comment&id=${id}`);
//         console.log('comment', data);

//         return data
//     },
//     menus : async (src, id) => {
//         const { data } = await axios.get(`${src}?type=menu&id=${id}`);
//         console.log('comment', data);

//         return data
//     }
// }
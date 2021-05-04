// imported Modules =============================================
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Drawer } from 'antd';

// imported components ==========================================
import SelectType from './drawerContents/SelectType';
import Movein from './drawerContents/Movein';
import Construct from './drawerContents/Construct';

// Main Component ===============================================
const contentsIndex = {
    selectType: 'selectType',
    movein: 'movein',
    construct: 'construct'
};

export default function LabCreator({ labCreatorVisible, setLabCreatorVisible }) {
    const [currentContent, setCurrentContent] = useState(contentsIndex.selectType);

    const contentsProps = {
        setCurrentContent : setCurrentContent, 
        contentsIndex : contentsIndex, 
        setLabCreatorVisible : setLabCreatorVisible,
    };

    return (
        <LabCreatorWrap className="LabCreator">
            <Drawer
                title={null}
                placement="right"
                closable={false}
                width={window.innerWidth > 768 ? '50%' : '90%'}
                onClose={e => setLabCreatorVisible(false)}
                visible={labCreatorVisible}
            >
                {
                    (() => {
                        switch(currentContent){
                            case contentsIndex.selectType:
                                return <SelectType {...contentsProps} />;
                            case contentsIndex.movein:
                                return <Movein {...contentsProps} />;
                            case contentsIndex.construct:
                                return <Construct {...contentsProps} />
                            default :
                                return <h1>무언가 잘못되었습니다</h1>
                        }
                    })()   
                }
            </Drawer>
        </LabCreatorWrap>
    );
}

// style ========================================================
const LabCreatorWrap = styled.div`
    width : 100%;
    `;


const ContentWrap = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;

    height : 100%;
    `;

// function =====================================================
// *

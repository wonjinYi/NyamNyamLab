// imported Modules =============================================
import { React, useState, useEffect } from 'react';

import styled from 'styled-components';
import { Input, Button, Modal, message } from 'antd';

import ScriptTag from 'react-script-tag';

// imported components ==========================================
import DataStorage from '../../../../DataStorage.js';

// Main Component ===============================================
const MAP_SOURCE = DataStorage('MAP_SOURCE');
let map = null;

const CENTER_INIT_VALUE = {
    lat : null,
    lng : null,
    zoom : null,
};

const CENTER_DEFAULT_VALUE = {
    lat : 37.5642135,
    lng : 127.0016985,
    zoom : 10,
};

export default function CenterPicker({ centerPickerVisible, setCenterPickerVisible, centerData, setCenterData }) {
    const [newCenter, setNewCenter] = useState(CENTER_INIT_VALUE);

    useEffect( () => {
        if(centerPickerVisible){
            if(!centerData){
                setNewCenter(CENTER_DEFAULT_VALUE);
            } else {
                setNewCenter(centerData);
            }
            console.log(newCenter);
        }
    }, [centerPickerVisible])
    

    return (
        <CenterPickerWrap className="CenterPicker">
            <StyledModal visible={centerPickerVisible} onCancel={e => setCenterPickerVisible(false)} closable={false} title={null} footer={null}>

                <ScriptTag
                    type="text/javascript" src={MAP_SOURCE}
                    onLoad={async () => {
                        const mapOptions = {
                            center: new window.naver.maps.LatLng(newCenter.lat, newCenter.lng),
                            zoom: newCenter.zoom,
                        };
                        map = new window.naver.maps.Map("map", mapOptions);
                        message.info('연구소의 위치를 선택해주세요');
                    }}
                />
                <Map id="map"></Map>
            </StyledModal>
        </CenterPickerWrap>
    );
}

// style ========================================================
const CenterPickerWrap = styled.div`
    `;

const StyledModal = styled(Modal)`
    min-width : 50%;
    min-height : 80%;
    `;

const Map = styled.div`
    width : 100%;
    height : 100%;
    `;

// function =====================================================
function isThereNull(obj) {
    console.log('굉')
    const keys = Object.keys(obj);
    for(let key of keys){
        if(!obj[key]){
            console.log('널이다널!!!!');
        }
    }
}
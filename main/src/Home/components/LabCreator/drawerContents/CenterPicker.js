// imported Modules =============================================
import { React, useState, useEffect } from 'react';

import styled from 'styled-components';
import { Input, Button, Modal, message } from 'antd';

import ScriptTag from 'react-script-tag';

// imported components ==========================================
import Confirm from '../../../../ShareComponents/atoms/Confirm';

// Main Component ===============================================
import DataStorage from '../../../../DataStorage.js';
const MAP_SOURCE = DataStorage('MAP_SOURCE');

let map = null;
let centerMarker = null;

const CENTER_INIT_VALUE = {
    lat: null,
    lng: null,
    zoom: null,
};

const CENTER_DEFAULT_VALUE = {
    lat: 37.5250000,
    lng: 127.0016985,
    zoom: 13,
};

export default function CenterPicker({ centerPickerVisible, setCenterPickerVisible, currentCenter, setCurrentCenter }) {
    const [pickedCenter, setPickedCenter] = useState(CENTER_INIT_VALUE);
    const [isPickmode, setIsPickmode] = useState(true);

    const [isLoadedPickedCenter, setIsLoadedPickedCenter] = useState(false);
    const [isLoadedMaps, setIsLoadedMaps] = useState(false);

    useEffect(() => {
        if (centerPickerVisible) {
            if (containsNull(currentCenter)) {
                setPickedCenter(CENTER_DEFAULT_VALUE);
            } else {
                setPickedCenter(currentCenter);
            }
            setIsLoadedPickedCenter(true);
        }
    }, [centerPickerVisible])

    useEffect(() => {
        if (isLoadedPickedCenter && isLoadedMaps) {
            const mapOptions = {
                center: new window.naver.maps.LatLng(pickedCenter.lat, pickedCenter.lng),
                zoom: pickedCenter.zoom,
            };
            map = new window.naver.maps.Map('map', mapOptions);

            /*const zoomListener =*/ window.naver.maps.Event.addListener(map, 'zoom_changed', function (e) {
                setPickedCenter({ ...pickedCenter, zoom: map.getZoom(), });
            });

            activatePickmode();
        }
    }, [isLoadedMaps, isLoadedPickedCenter])

    function activatePickmode() {
        setIsPickmode(true);

        if (centerMarker) { centerMarker.setMap(null); }
        map.setOptions('draggable', true);
        map.setOptions('zoomOrigin', null);
        
        map.setCursor('Crosshair');
        const pickListener = window.naver.maps.Event.addListener(map, 'click', function (e) {
            const center = {
                lat: e.coord.y,
                lng: e.coord.x,
                zoom: map.getZoom(),
            };
            setPickedCenter(center);

            centerMarker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(center.lat, center.lng),
                map: map,
                icon: {
                    url: `img/icons/svg/center.svg`,
                    size: new window.naver.maps.Size(48, 48),
                    origin: new window.naver.maps.Point(0, 0),
                    anchor: new window.naver.maps.Point(24, 24),
                }
            });

            const position = new window.naver.maps.LatLng(center.lat, center.lng);
            map.panTo(position);
            deactivatePickmode(pickListener, position);
        });
        message.destroy();
        message.info('연구소의 위치를 선택해주세요');
    }

    function deactivatePickmode(pickListener, position) {
        setIsPickmode(false);

        map.setOptions('draggable', false);
        map.setOptions('zoomOrigin', position);
        map.setCursor('Move');
        window.naver.maps.Event.removeListener(pickListener);
    }

    function closeCenterPicker(isConfirmed) {
        if (isConfirmed) {
            setCurrentCenter(pickedCenter);
        }
        map.destroy();
        setCenterPickerVisible(false);
    }

    return (
        <CenterPickerWrap className="CenterPicker">
            <Backdrop onClick={e => closeCenterPicker(false)} />

            <ScriptTag type="text/javascript" src={MAP_SOURCE} onLoad={() => { setIsLoadedMaps(true); }} />
            <Map id="map"></Map>
            {
                !isPickmode
                    ? <Confirm pickedCenter={pickedCenter} activatePickmode={activatePickmode} closeCenterPicker={closeCenterPicker} />
                    : null
            }
        </CenterPickerWrap>
    );
}

// style ========================================================
const CenterPickerWrap = styled.div`
    position : absolute;
    top : 0; 
    left : 0;
    width : 100vw;
    height : 100vh;  
    
    display : flex;
    justify-content : center;
    align-items : center;
    `;

const Map = styled.div`
    position : fixed !important;
    top : 10%; 
    left : 5%;
    width : 90%;
    height : 80%;
    `;

const Backdrop = styled.div`
    position : fixed;
    top : 0; 
    left : 0;

    width : 100%;
    height : 100%;

    background-color : rgba(0,0,0, 0.75);
    `;

// function =====================================================
function containsNull(obj) {
    const keys = Object.keys(obj);
    let isContains = false;

    for (let key of keys) {
        if (!obj[key]) {
            isContains = true;
            break;
        }
    }

    return isContains;
}
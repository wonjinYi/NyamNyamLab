// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import axios from "axios";

import styled from "styled-components";

// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
import DataStorage from "../DataStorage"; // [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요

// imported components ==========================================
import MapsModal from "./followers/Maps/MapsModal";
import NyamEditor from "./followers/Maps/NyamEditor";
import Loading from "./atoms/Loading";

// imported supporters
import naverMapsinit from "./suppoters/naverMapsInit";
import naverMapsSetNyams from "./suppoters/naverMapsSetNyams";

// Main Component ===============================================
let map = null;

const mapValues = {
    nyamListSource : DataStorage("NYAM_LIST_SOURCE"),
    nyamTypes : DataStorage("NYAM_TYPES_KEY"),
    mapSource : "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
    center : {
        lat : 37.552472, 
        lng : 127.076665,
    },
    zoom : 16,
};

export default function Maps ({ filters, isPickmode, setIsPickmode }) {
    const [nyams, setNyams] = useState(null);
    const [markers, setMarkers] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedNyam, setSelectedNyam] = useState(null);
    const [pickCoord, setPickCoord] = useState(null); // 새로 추가할 냠의 좌표값. { x : 123, y : 123 }

    const [mapsModalVisible, setMapsModalVisible] = useState(false);
    const [nyamEditorModalVisible, setNyamEditorModalVisible] = useState(false);

    useEffect( () => {
        if ( markers !== null ) {
            setMarkersVisible(filters, setIsLoading, markers);
        }
    }, [filters]);

    useEffect( () => {
        if(isPickmode === true){
            map.setCursor("Crosshair");
            const listener = window.naver.maps.Event.addListener(map, 'click', function(e) {
                if (isPickmode===true) {
                    const { x, y } = e.coord;
        
                    setPickCoord({x, y});
                    setIsPickmode(false);
                    setNyamEditorModalVisible(true);
                    window.naver.maps.Event.removeListener(listener);
                }
            });   
        } else if (isPickmode === false) {
            map.setCursor("Move");
        }
    }, [isPickmode]);

    // useEffect(() => {
    //     console.log("logloglog", markers, nyams);
    // })

    return (
        <MapsWrap className="Maps">
            <ScriptTag 
                type="text/javascript" src={mapValues.mapSource}
                onLoad={ async () => { 
                    setIsLoading(true);
                     map = naverMapsinit(mapValues);
                    await naverMapsSetNyams(map, mapValues, markers, setMarkers, nyams, setNyams, setMapsModalVisible, setSelectedNyam);
                    //console.log(nyams, markers);
                    setIsLoading(false);
                }} 
            />

            <Map id="map"></Map>
            <MapsModal nyamListSource={mapValues.nyamListSource} selectedNyam={selectedNyam} mapsModalVisible={mapsModalVisible} setMapsModalVisible={setMapsModalVisible} />
            <NyamEditor title={"새로운 냠 만들기"} nyamEditorModalVisible={nyamEditorModalVisible} setNyamEditorModalVisible={setNyamEditorModalVisible} pickCoord={pickCoord}/>

            <Loading isLoading={isLoading} />
        </MapsWrap>
    );
}

// style ========================================================
const MapsWrap = styled.div`
    display : flex;
    flex : 1;
    `;

const Map = styled.div`
    width: 100%;
    height : 100%;
    `;

// function =====================================================
const setMarkersVisible = (filters, setIsLoading, markers) => {
    setIsLoading(true);

    const types = mapValues.nyamTypes; // 정의되어있는 type배열 불러오기

    types.forEach( type => {
        const target = markers[type]; // markers의 한 type을 대상으로 정함
        if (target.length === 0) { return; } // 대상이 비어있으면 바로 함수종료

        const dest = filters[type]; // 업데이트 하려고 하는 값
        if ( target[0].getVisible() !== dest ){ // target안의 첫번째 마커의 visible속성과, 업데이트 하려고 하는 값이 다르면
            target.forEach( marker => { marker.setVisible(dest); }); // 업데이트!
            return;
        }
    });

    setIsLoading(false);
}
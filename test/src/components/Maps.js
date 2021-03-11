// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import axios from "axios";

import styled from "styled-components";

import DataStorage from "../DataStorage"; // [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요

// imported components ==========================================
import MapsModal from "./followers/Maps/MapsModal";

import Loading from "./atoms/Loading";

// Main Component ===============================================
console.log("map");
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

const nyams = markersInit();
const markers = markersInit();
let _isPickmode = null;

export default function Maps ({ filters, isPickmode, setPickCoord }) {
    const [isLoading, setIsLoading] = useState(false);
    const [mapsModalVisible, setMapsModalVisible] = useState(false);
    const [selectedNyam, setSelectedNyam] = useState(null);

    useEffect( () => {
        if ( markers !== null ) {
            setMarkersVisible(filters, setIsLoading);
        }
    }, [filters]);

    useEffect( () => {
        _isPickmode = isPickmode;
        
        if(isPickmode === true){
            map.setCursor("Crosshair");
        } else if (isPickmode === false) {
            map.setCursor("Move");
        }
    }, [isPickmode]);

    return (
        <MapsWrap className="Maps">
            <ScriptTag type="text/javascript" onLoad={() => { init(setIsLoading, setMapsModalVisible, setSelectedNyam, isPickmode, setPickCoord); }} src={mapValues.mapSource} />

            <Map id="map"></Map>
            <MapsModal nyamListSource={mapValues.nyamListSource} selectedNyam={selectedNyam} mapsModalVisible={mapsModalVisible} setMapsModalVisible={setMapsModalVisible} />
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
const reqNyamList = {
    read : async () => {
        const { data } = await axios.get(mapValues.nyamListSource);
        console.log("readNyams", data);

        return data;
    },
}

const setMarkersVisible = (filters, setIsLoading) => {
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

const init = async(setIsLoading, setMapsModalVisible, setSelectedNyam, isPickmode, setPickCoord) => {
    setIsLoading(true);

    // set naver.maps.Map
    const { center, zoom } = mapValues;

    const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
    };
    map = new window.naver.maps.Map("map", mapOptions);   

    // read nyamList
    const nyamList = await reqNyamList.read();

    // set markers
    const org = nyamList.shift(); // organization
    /*const org_marker = */ new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(org.lat, org.lng),
        map: map,
        icon: {
          url : `img/icons/${org.type}.png`,
          size: new window.naver.maps.Size(48, 48),
          origin: new window.naver.maps.Point(0, 0),
        }
    });

    nyamList.forEach( item => { // nyam items
        const temp = new window.naver.maps.Marker({
            position : new window.naver.maps.LatLng(item.lat, item.lng),
            map : map,
            icon : {
                content: [
                    '<div>',
                        '<div style="background-color:rgba(255,255,255,0.8); padding:5px; border-radius:16px; border:1px solid #d9d9d9;">',
                            `<span>${item.name}</span>`,
                        '</div>',
                        `<img src="img/icons/${item.type}.png">`,
                    '</div>'
                ].join(''),
                anchor: new window.naver.maps.Point(16, 48),
            }
        });

        temp.addListener("click", (e) => {
            const targetid = e.overlay["_nmarker_id"];
            const types = mapValues.nyamTypes;
            console.log(e.coord);
            for( let i = 0; i<types.length; i++){
                const type = types[i];
                let chk = false;

                for( let j=0; j<markers[type].length; j++ ){
                    if ( targetid === markers[type][j]["_nmarker_id"] ){
                        setSelectedNyam(nyams[type][j]);
                        setMapsModalVisible(true);
                        chk = true;
                        break;
                    }
                }

                if (chk) { break; }
            }
        });

        nyams[item.type].push(item);
        markers[item.type].push(temp);
    });

    // set eventListener
    map.addListener("click", (e) => {
        console.log(_isPickmode);
        if (_isPickmode===true) {
            const { x, y } = e.coord;
            console.log("[Maps] lat lng : ", x, y);

            setPickCoord({x, y});
        }
        
    });
    

    setIsLoading(false);
}

function markersInit () {
    let obj = {};
    (mapValues.nyamTypes).forEach( category => {
        obj[category] = [];
    });

    return obj;
}
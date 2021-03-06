// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import axios from "axios";

import styled from "styled-components";

import DataStorage from "../DataStorage"; // [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요

// imported components ==========================================
import MapsInfoModal from "./followers/Maps/MapsInfoModal";

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

export default function Maps ({ filters }) {
    //const [markers, setMarkers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mapsModalVisible, setMapsModalVisible] = useState(false);
    const [selectedNyam, setSelectedNyam] = useState(null);

    useEffect( () => {
        if ( markers !== null ) {
            setMarkersVisible(filters, setIsLoading);
        }
    }, [filters]);

    return (
        <MapsWrap className="Maps">
            <ScriptTag type="text/javascript" onLoad={() => { init(setIsLoading, setMapsModalVisible, setSelectedNyam); }} src={mapValues.mapSource} />

            <Map id="map"></Map>
            <MapsInfoModal selectedNyam={selectedNyam} mapsModalVisible={mapsModalVisible} setMapsModalVisible={setMapsModalVisible} />
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
        console.log(data);

        return data;
    },

    write : () => {

    },
}

const setMarkersVisible = (filters, setIsLoading) => {
    setIsLoading(true);
    console.log(markers);
    const types = mapValues.nyamTypes;
    types.forEach( type => {
        const target = markers[type];
        if (target.length === 0) { return; }

        const dest = filters[type];

        if ( target[0].getVisible() !== dest ){ // 마커의 visible속성과 filters 프롭스값이 다르면
            target.forEach( marker => { marker.setVisible(dest); });
            return;
        }
    });

    setIsLoading(false);
}

const init = async(setIsLoading, setMapsModalVisible, setSelectedNyam) => {
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

            mapValues.nyamTypes.forEach ( type => {
                for( let i=0; i<markers[type].length; i++ ){
                    if ( targetid === markers[type][i]["_nmarker_id"] ){
                        setSelectedNyam(nyams[type][i]);
                        setMapsModalVisible(true);
                        return;
                    }
                }
            });
        });

        nyams[item.type].push(item);
        markers[item.type].push(temp);
    });

    // set eventListener
    map.addListener("click", (e) => {
        const latlng = e.coord;
        console.log("lat lng : ", latlng);
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
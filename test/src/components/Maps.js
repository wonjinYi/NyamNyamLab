// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import axios from "axios";

import styled from "styled-components";

// imported components ==========================================
import Loading from "./atoms/Loading";

// Main Component ===============================================
let map = null;
const mapValues = {
    nyamListSource : "https://script.google.com/macros/s/AKfycbyuACrtmBSgcaehSnfbDVhSAMeScTP455Z44h4jtjxRGxJ5UNeVdOEh/exec",
    nyamTypes : ["meal", "fastfood", "cvs", "cafe"],
    mapSource : "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
    center : {
        lat : 37.552472, 
        lng : 127.076665,
    },
    zoom : 16,
};

export default function Maps ({ filters }) {
    const [markers, setMarkers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        if ( markers !== null ) {
            setMarkersVisible(markers, filters, setIsLoading);
        }
    }, [filters]);

    return (
        <MapsWrap className="Maps">
            <ScriptTag type="text/javascript" onLoad={() => { init(setIsLoading, markers, setMarkers); }} src={mapValues.mapSource} />

            <Map id="map"></Map>
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

const setMarkersVisible = (markers, filters, setIsLoading) => {
    setIsLoading(true);

    const types = mapValues.nyamTypes;
    types.forEach( type => {
        const target = markers[type];
        const dest = filters[type];

        if ( target[0].getVisible() !== dest ){ // 마커의 visible속성과 filters 프롭스값이 다르면
            target.forEach( marker => { marker.setVisible(dest); });
            return;
        }
    });

    setIsLoading(false);
}

const init = async(setIsLoading, markers, setMarkers) => {
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

    const items = markersInit(); // nyam items
    nyamList.forEach( item => { 
        const temp = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(item.lat, item.lng),
            map: map,
            icon: {
              url : `img/icons/${item.type}.png`,
              size: new window.naver.maps.Size(32, 32),
              origin: new window.naver.maps.Point(0, 0),
            }
        });
        items[item.type].push(temp);
    });
    setMarkers(items);

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
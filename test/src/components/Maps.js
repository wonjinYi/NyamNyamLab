// imported Modules =============================================
import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";
import axios from "axios";
import styled from "styled-components";

// imported components ==========================================
// *

// Main Component ===============================================
const mapValues = {
    nyamListSource : "https://script.google.com/macros/s/AKfycbyuACrtmBSgcaehSnfbDVhSAMeScTP455Z44h4jtjxRGxJ5UNeVdOEh/exec",
    mapSource : "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
    center : {
        lat : 37.552472, 
        lng : 127.076665,
    },
    zoom : 16,
}

export default function Maps () {
    let map = null;
    let markers = [];

    const init = async() => {
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
        const org = nyamList.shift();
        const temp = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(org.lat, org.lng),
            map: map,
            icon: {
              url : `img/icons/${org.type}.png`,
              size: new window.naver.maps.Size(48, 48),
              origin: new window.naver.maps.Point(0, 0),
            }
        });

        markers = nyamList.map( item => (
            new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(item.lat, item.lng),
                map: map,
                icon: {
                  url : `img/icons/${item.type}.png`,
                  size: new window.naver.maps.Size(32, 32),
                  origin: new window.naver.maps.Point(0, 0),
                }
            })
        ));

        // set eventListener
        map.addListener("click", (e) => {
            const latlng = e.coord;
            console.log("lat lng : ", latlng);
        });
    }

    return (
        <MapsWrap className="Maps">
            <ScriptTag type="text/javascript" onLoad={init} src={mapValues.mapSource} />
            <Map id="map"></Map>
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
        console.log(typeof data);

        return data;
    },

    write : () => {

    },
}
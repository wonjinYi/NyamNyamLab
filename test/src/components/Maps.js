import { React, useState, useEffect } from "react";
import ScriptTag from "react-script-tag";

import styled from "styled-components";

export default function Maps () {
    let map;

    const init = () => {
        console.log("hi")
        const mapOptions = {
            center: new window.naver.maps.LatLng(36.583853, 128.119446),
            zoom: 7
        };
        map = new window.naver.maps.Map("map", mapOptions);   
    }

    return (
        <MapsWrap className="Maps">
            <ScriptTag type="text/javascript" onLoad={init} src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67" />
            <Map id="map"></Map>
        </MapsWrap>
    );
}

const MapsWrap = styled.div`
    width : 100%;
    `;

const Map = styled.div`
    width: 100%;
    height : 100vh;
`;
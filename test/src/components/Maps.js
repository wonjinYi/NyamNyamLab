import { React, useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Maps () {
    return (
        <MapsWrap className="Maps">
            <div id="map"></div>
        </MapsWrap>
    );
}

const MapsWrap = styled.div`
    
    `;
// imported Modules =============================================
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import styled from 'styled-components';

// imported components ==========================================
import Home from "./Home/Home";
import App from "./App/App";

// Main Component ===============================================
export default function NyamNyamLab() {
    return (
        <NyamNyamLabWrap className="NyamNyamLab">
            <BrowserRouter>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/app" component={App} />
            </BrowserRouter>
        </NyamNyamLabWrap>
    );
}

// style ========================================================
const NyamNyamLabWrap = styled.div`
    width : 100%;
    height : 100%;
    `;

// function =====================================================
// *
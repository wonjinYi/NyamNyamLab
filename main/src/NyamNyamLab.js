// imported Modules =============================================
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// imported components ==========================================
import Home from "./Home/Home";
import App from "./App/App";

// Main Component ===============================================
import DataStorage from "./DataStorage";
const ROUTE = DataStorage("ROUTE"); // HOME, APP

export default function NyamNyamLab() {
  const [route, setRoute] = useState(ROUTE.HOME);
  const [labAccessInfo, setLabAccessInfo] = useState(null); // labId, accessManagerUrl

  useEffect(() => {
    if (labAccessInfo) setRoute(ROUTE.APP);
    else setRoute(ROUTE.HOME);
  }, [labAccessInfo]);

  return (
    <NyamNyamLabWrap className="NyamNyamLab">
      {route === ROUTE.HOME && <Home setRoute={setRoute} setLabAccessInfo={setLabAccessInfo} />}
      {route === ROUTE.APP && <App setRoute={setRoute} labAccessInfo={labAccessInfo} />}
    </NyamNyamLabWrap>
  );
}

// style ========================================================
const NyamNyamLabWrap = styled.div`
  width: 100%;
  height: 100%;
`;

// function =====================================================
// *

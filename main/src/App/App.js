// imported Modules =============================================
import React, { useState } from 'react';
import styled from "styled-components";
      //import {notification} from "antd";

// imported components ==========================================
import Header from "./components/Header/Header";
import Maps from "./components/Maps/Maps";
import Footer from "../ShareComponents/atoms/Footer";

// Main Component ===============================================
export default function App({location, history}) {
  const [filters, setFilters] = useState({});
  const [isPickmode, setIsPickmode] = useState(false); // 현재 '새로운 냠'버튼을 눌러 새로운 위치를 찍는 상태인지
  const [nyamEditorTaskType, setNyamEditorTaskType] = useState(null); // 냠에디터 taskType : create / edit

  const labAccessInfo = location.state;
  
  return (
    <AppWrap className="App" style={{ cursor : (isPickmode ? 'Crosshair' : 'auto') }}>
      <Header setFilters={setFilters} setIsPickmode={setIsPickmode} setNyamEditorTaskType={setNyamEditorTaskType} />
      <Maps 
        filters={filters} 
        isPickmode={isPickmode} setIsPickmode={setIsPickmode}
        nyamEditorTaskType={nyamEditorTaskType} setNyamEditorTaskType={setNyamEditorTaskType} 
        labAccessInfo={labAccessInfo}  
      />
      <Footer />
    </AppWrap>
  );
}

// style ========================================================
const AppWrap = styled.div`
  display : flex;
  flex-direction : column;
  height : 100%;
`;



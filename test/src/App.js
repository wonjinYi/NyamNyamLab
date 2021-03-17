// imported Modules =============================================
import { React, useState } from 'react';
import styled from "styled-components";

// imported components ==========================================
import Header from "./components/Header/Header";
import Maps from "./components/Maps/Maps";
import Footer from "./components/Footer/Footer";

// Main Component ===============================================
export default function App() {
  const [filters, setFilters] = useState({});
  const [isPickmode, setIsPickmode] = useState(null); // 현재 '새로운 냠'버튼을 눌러 새로운 위치를 찍는 상태인지를 표현. true / false

  return (
    <AppWrap className="App" style={{ cursor : (isPickmode ? 'Crosshair' : 'auto') }}>
      <Header setFilters={setFilters} setIsPickmode={setIsPickmode} />
      <Maps filters={filters} isPickmode={isPickmode} setIsPickmode={setIsPickmode} />
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



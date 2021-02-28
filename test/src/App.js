// imported Modules =============================================
import { React, useState } from 'react';
import styled from "styled-components";

// imported components ==========================================
import Header from "./components/Header";
import Maps from "./components/Maps";
import Footer from "./components/Footer";

// Main Component ===============================================
export default function App() {
  const [filters, setFilters] = useState({});

  return (
    <AppWrap className="App">
      <Header setFilters={setFilters} />
      <Maps filters={filters} />
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



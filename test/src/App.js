import { React, useState } from 'react';
import styled from "styled-components";

import Header from "./components/Header";
import Maps from "./components/Maps";
import Footer from "./components/Footer";

export default function App() {

  return (
    <AppWrap className="App">
      <Header />
      <Maps />
      <Footer />
    </AppWrap>
  );
}

const AppWrap = styled.div`
  display : flex;
  flex-direction : column;

  height : 100%;
`;

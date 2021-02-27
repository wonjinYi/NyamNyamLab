// imported Modules =============================================
import { React} from 'react';
import styled from "styled-components";

// imported components ==========================================
import Header from "./components/Header";
import Maps from "./components/Maps";
import Footer from "./components/Footer";

// Main Component ===============================================
export default function App() {
  return (
    <AppWrap className="App">
      <Header />
      <Maps />
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

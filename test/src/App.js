// imported Modules =============================================
import { React, useEffect, useState } from 'react';
import styled from "styled-components";
import {notification} from "antd";

// imported components ==========================================
import Header from "./components/Header/Header";
import Maps from "./components/Maps/Maps";
import Footer from "./components/Footer/Footer";

// Main Component ===============================================
export default function App() {
  const [filters, setFilters] = useState({});
  const [isPickmode, setIsPickmode] = useState(null); // 현재 '새로운 냠'버튼을 눌러 새로운 위치를 찍는 상태인지를 표현. true / false

  // temp temp temp temp temp temp temp temp temp temp
  useEffect( () => {
    notification.open({
      message: '안녕히계세요여러분저는이세상의모든굴레와...',
      description:
        "여기(nyam.wonj.in)는 멀지않은 미래에 모든 사람의 '냠 연구소'로 통하는 대문으로 바뀔 예정입니다. 대문에서 'datalab_gorani'을 입력하시면 현재와 같은 페이지를 열람하실 수 있습니다. 데이터연구소의 '냠 연구소'는 구글시트가 망하기 전까지는 유지됩니다.",
      duration : 0
    });
  }, []);
  // temp temp temp temp temp temp temp temp temp temp

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



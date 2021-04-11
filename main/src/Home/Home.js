// imported Modules =============================================
import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
// imported components ==========================================

// Main Component ===============================================
export default function Home() {
    // // temp temp temp temp temp temp temp temp temp temp
    // useEffect( () => {
    //     notification.open({
    //     message: '안녕히계세요여러분저는이세상의모든굴레와...',
    //     description:
    //         "여기(nyam.wonj.in)는 멀지않은 미래에 모든 사람의 '냠 연구소'로 통하는 대문으로 바뀔 예정입니다. 대문에서 'datalab_gorani'를 입력하시면 현재와 같은 페이지를 열람하실 수 있습니다. 데이터연구소의 '냠 연구소'는 구글시트가 망하기 전까지는 유지됩니다.",
    //     duration : 10
    //     });
    // }, []);
    // // temp temp temp temp temp temp temp temp temp temp

    return (
        <HomeWrap className="Home">
            <h1>Home</h1>
            <h1>데이터연구소의 '냠 연구소'를 보고싶으시다구요? 아래 링크로 가시면 됩니다.</h1>
            <Link to={{ pathname: "/app" }}>클릭</Link>
        </HomeWrap>
    );
}

// style ========================================================
const HomeWrap = styled.div`

    `;

// function =====================================================
// *
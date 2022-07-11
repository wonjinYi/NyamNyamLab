// imported Modules =============================================
import { React } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
// imported components ==========================================
// *

// Main Component ===============================================
export default function SelectType({ setCurrentContent, contentsIndex, setLabCreatorVisible }) {
  return (
    <SelectTypeWrap className="SelectType">
      <Button
        onClick={(e) => setLabCreatorVisible(false)}
        shape="circle"
        icon={<LeftOutlined />}
      ></Button>
      <ContentWrap>
        <h2>냠냠랩에 연구소를 만들고 싶으신가요?</h2>
        <p>🤔 어떤 유형을 선택하시겠어요?</p>

        <div>
          <Button
            onClick={(e) => setCurrentContent(contentsIndex.movein)}
            size="large"
            style={{ marginRight: "16px" }}
          >
            🏢 입주
          </Button>
          {/* <Button disabled onClick={(e) => setCurrentContent(contentsIndex.construct)} size="large"> */}
          <Button disabled size="large">
            🏗 건설
          </Button>
        </div>

        <div style={{ marginTop: "16px" }}>
          <p>
            <strong>✍️ 공통 준비물 </strong>
            새로운 연구소를 만들기 위해서는 <strong>구글 계정</strong>이 꼭 필요합니다. 냠냠랩이
            구글서비스 기반으로 동작하기 때문에, 사용가능한 gmail을 하나 준비해주셔야 합니다. 물론
            gmail이 아니더라도 연구소를 가질 수는 있지만, 추후 연구소 관리가 정말정말로 어려울 수
            있어요.
          </p>
          <p>
            <strong>🏢 입주 </strong>
            간편하게 이용할 수 있어 가장 추천드리는 방법이에요. 냠냠랩이 이미 마련해둔 공간에
            대장님의 연구소를 자동으로 준비해드려요. 냠냠랩에서 대장님의 연구내용을 관리하는 만큼,
            비교적 빠른 시설보수와 연구지원을 받을 수 있어요.
          </p>
          <p style={{ color: "lightgrey" }}>
            <strong>🏗 건설 </strong>
            냠냠랩이 관리하지 않는 대장님만의 독립적인 연구소를 만들어드려요. 연구소 접근에 접근하는
            과정이나 프로그램 업데이트를 따라오시는 일이 많이 까다로울 수 있어요. 하지만 원하신다면
            저희가 성의껏 준비한 가이드를 따라 건설에 도전해보세요. 연구내용을 대장님, 그리고
            함께하는 개척자 분들만 알 수 있는 특징이 있어요. 냠냠랩이 알면 안되는 내용이
            들어가있거나, 본인이 연구소를 직접 관리하고 싶다면 선택해주세요.
          </p>
        </div>
      </ContentWrap>
    </SelectTypeWrap>
  );
}

// style ========================================================
const SelectTypeWrap = styled.div``;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;
// function =====================================================
// *

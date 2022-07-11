// imported Modules =============================================
import { React } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
// imported components ==========================================
// *

// Main Component ===============================================
export default function Construct({ setCurrentContent, contentsIndex }) {
  return (
    <ConstructWrap className="Construct">
      <Button
        onClick={(e) => setCurrentContent(contentsIndex.selectType)}
        shape="circle"
        icon={<LeftOutlined />}
      ></Button>
      <ContentWrap>
        <h2>건설</h2>
      </ContentWrap>
    </ConstructWrap>
  );
}

// style ========================================================
const ConstructWrap = styled.div``;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;
// function =====================================================
// *

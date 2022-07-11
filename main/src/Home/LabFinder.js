// imported Modules =============================================
import { React, useState, useEffect } from "react";

import styled from "styled-components";
import { Input, Button, Menu, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import axios from "axios";

// imported components ==========================================

// Main Component ===============================================
import DataStorage from "../DataStorage";
const ACCESS_MANAGER = DataStorage("ACCESS_MANAGER");
const ROUTE_MANAGER = DataStorage("ROUTE_MANAGER");

const FIND_OPTION = { route: 0, manual: 1 };
const PLACE_HOLDER = [
  { first: "연구소 이름을 알려주세요", second: "출입 비밀번호를 알려주세요" },
  { first: "연구소 ID를 알려주세요", second: "연구소 접근제어장치 주소를 알려주세요" },
];

export default function LabFinder({ setIsLoading, setLabAccessInfo }) {
  const [isReady, setIsReady] = useState(false); // app으로 라우팅할 준비가 되었는지

  const [findOption, setFindOption] = useState(FIND_OPTION.route); // route, manual.

  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");

  // ▼ 고라니의 연구소 접속을 위한 임시 기능 !! 고라니의 연구소 접속을 위한 임시 기능 !! 고라니의 연구소 접속을 위한 임시 기능 !! ▼
  const [TEMP_DATALAB_AUTOACCESS, SET_TEMP_DATALAB_AUTOACCESS] = useState(false);

  useEffect(() => {
    if (TEMP_DATALAB_AUTOACCESS === true && firstInput === "데이터연구소") {
      onSubmit();
    }
  }, [firstInput]);
  // ▲ 고라니의 연구소 접속을 위한 임시 기능 !! 고라니의 연구소 접속을 위한 임시 기능 !! 고라니의 연구소 접속을 위한 임시 기능 !! ▲

  async function onSubmit(e) {
    switch (findOption) {
      case FIND_OPTION.route:
        setIsLoading(true);
        const postData = {
          taskType: "doRoute",
          data: {
            labName: firstInput,
            routePw: secondInput,
          },
        };
        const {
          data: { status, data },
        } = await axios.post(ROUTE_MANAGER, JSON.stringify(postData));

        if (status === "success") {
          setLabAccessInfo({
            labId: data,
            accessManagerUrl: ACCESS_MANAGER,
          });
          message.destroy();
          message.success("연구소로 달려가고있어요!");
        } else {
          console.log("에러!!에러!!!에러!!!");
          message.error({
            content: "앗.. 연구소를 찾지 못했어요...",
            duration: 0,
            key: "LabFinder_01",
            onClick: (e) => {
              message.destroy("LabFinder_01");
            },
          });
        }

        setIsLoading(false);
        break;

      case FIND_OPTION.manual:
        break;
      default:
        console.error("예상하지 못한 FIND_OPTION입니다");
    }
  }

  return (
    <LabFinderWrap className="LabFinder">
      <SelectMenu
        onClick={(e) => {
          setFindOption(parseInt(e.key));
        }}
        selectedKeys={`${findOption}`}
        mode="horizontal"
      >
        <SelectItem key={`${FIND_OPTION.route}`}>이름으로 찾기</SelectItem>
        <SelectItem disabled key={`${FIND_OPTION.manual}`}>
          직접 찾기
        </SelectItem>
      </SelectMenu>
      <FinderForm>
        <FinderInput
          placeholder={PLACE_HOLDER[findOption].first}
          size="large"
          value={firstInput}
          onChange={(e) => {
            setFirstInput(e.target.value);
          }}
          onPressEnter={onSubmit}
        />
        <FinderInputPw
          placeholder={PLACE_HOLDER[findOption].second}
          size="large"
          type="password"
          value={secondInput}
          onChange={(e) => {
            setSecondInput(e.target.value);
          }}
          onPressEnter={onSubmit}
        />
        <FinderButton icon={<SearchOutlined />} size="large" onClick={onSubmit}>
          내 연구소 찾기
        </FinderButton>

        <FinderButton
          type="primary"
          size="large"
          style={{ marginTop: "16px" }}
          onClick={(e) => {
            setFirstInput("데이터연구소");
            SET_TEMP_DATALAB_AUTOACCESS(true);
          }}
        >
          <span style={{ fontSize: "10px", paddingRight: "4px" }}>모두를 위한</span>
          고라니 연구소
        </FinderButton>
      </FinderForm>
    </LabFinderWrap>
  );
}

// style ========================================================
const LabFinderWrap = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 32px;
  width: 80%;
`;

const SelectMenu = styled(Menu)`
  border: none;
  padding: 0px 8px;
  margin-bottom: 16px;
  background-color: #333333;
`;

const SelectItem = styled(Menu.Item)`
  color: white;
`;

const FinderForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  width: 350px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const FinderInput = styled(Input)`
  width: 100%;
  margin-bottom: 16px;

  border-radius: 24px;

  border-color: white;
  &:hover {
    border-color: white;
  }
  &:focus {
    border-color: white;
  }
`;

const FinderInputPw = styled(Input.Password)`
  width: 100%;
  margin-bottom: 16px;

  border-radius: 24px;

  border-color: white;
  &:hover {
    border-color: white;
  }
  &:focus {
    border-color: white;
  }
`;

const FinderButton = styled(Button)`
  width: 100%;
  border-radius: 24px;
  vertical-align: middle;
`;

// const FindHistory = styled.div`
//     display : flex;
//     justify-content : flex-start;
//     `;
// const HistoryItem = styled.span`
//     padding : 4px 8px;
//     border-radius : 24px;
//     background-color : #FFFFFF;
//     color : #333333;
//     `;

// function =====================================================
// *

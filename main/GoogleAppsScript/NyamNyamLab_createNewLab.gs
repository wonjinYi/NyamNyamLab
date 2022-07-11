/*
Wonjin Yi. 2022. < NyamNyamLab 조직 내부의 냠냠거리 공유 서비스 >
NyamNyamLab_CreateNewLab : 버전 1

이 코드는 입주 옵션에 대한 새로운 연구소를 생성하는 역할을 담당합니다.
1. 기존 템플릿으로부터 냠냠랩 관리 계정의 드라이브에 새로운 연구소(구글시트) 생성 및 사용자설정값 입력
2. NyamNyamLab_RouteManager로 새로운 라우팅 추가요청
3. 호출된 냠냠랩 프론트엔드 서비스로의 생성절차 완료 응답

이 코드는 냠냠랩 프론트엔드 서비스로부터 직접 호출됩니다.
*/

//┌── Global Constants ────────────────────────────┐

const SHEET_INDEX = { nyam: 0, setting: 1, captain: 2 };

const SETTING_KEYS = ["name", "lat", "lng", "zoom", "customIcon", "defaultPermission"];
const CAPTAIN_KEYS = ["captainPw"];

const TEMPLATE_ID = "1Dgd_vMUR9QF8eHZWeGXJenlXn3SpxUwySc80J-IS1xY";
const ROUTE_MANAGER_URL =
  "https://script.google.com/macros/s/AKfycbz5iYlaH55WjYJSzvlEnM1ADaP5iwRD8gAbYhHgMtQDQLjHgEmlBi1XZRITl5u1AzZCLA/exec";

const STATUS = { success: "success", error: "error" };

//└─────────────────────────────────────────

//┌── Receive Request ─────────────────────────────┐

function test() {
  // const postData = {
  //   labName : '굉굉',
  //   lat: 53.53,
  //   lng : 53.53,
  //   zoom : 53,
  //   customIcon : false,
  //   defaultPermission : 'edit',
  //   captainEmail : 'studioplug17@gmail.com',
  //   routePw : 'aaa',
  //   captainPw : 'bbb',
  // };
}

function doGet(e) {}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const {
      labName,
      lat,
      lng,
      zoom,
      customIcon /*, defaultPermission*/,
      captainEmail,
      routePw /*, captainPw*/,
    } = postData;

    // 템플릿문서 복제
    const template = SpreadsheetApp.openById(TEMPLATE_ID);

    const newLab = template.copy(`냠냠랩:${labName}`);
    const newLabUrl = newLab.getUrl();
    const newLabId = getSpreadSheetId(newLabUrl);
    SpreadsheetApp.setActiveSpreadsheet(newLab);

    // 새로운 연구소에 사용자 설정값 입력
    const settingRow = [labName, lat, lng, zoom, customIcon /*, defaultPermission*/];
    // const captainRow = [encrypte(captainPw)];

    const settingSheet = SpreadsheetApp.setActiveSheet(newLab.getSheets()[SHEET_INDEX.setting]);
    settingSheet.appendRow(settingRow);

    //const captainSheet = SpreadsheetApp.setActiveSheet(newLab.getSheets()[SHEET_INDEX.captain]);
    //captainSheet.appendRow(captainRow);

    // 냠냠대장 시트 편집자로 추가
    newLab.addEditor(captainEmail);

    // <NyamNyamLab_RouteManager>로 신규 라우팅 등록 요청
    var d = {
      labId: newLabId,
      labName: labName,
      routePw: routePw,
    };
    requestAddRoute(d);

    var mailBody = `<body style="margin: 0"> <div style="background-color: #333333; display: flex; align-items: center; padding: 12px"> <h1 style=" color: white; padding-left: 8px; margin: 0; font-weight: 200; font-size: 48px; display: flex; align-items: center; padding: 12px; " > 냠냠랩 </h1> </div> <div style="background-color: #505050; padding: 32px; color: white"> <p style="font-size: 12px">───── 냠냠랩 지킴이, 고라니로부터 도착한 편지 ─────</p> <h2>✅ 대장님의 연구소가 잘 만들어졌어요!</h2> <br /> <p>대장님이 요청하신 ${labName}연구소 입주가 모두 처리되었어요.</p> <p> 아래와 같이 연구소와 연구데이터에 접근하실 수 있는 방법을 안내드립니다. <span style="background-color: yellow; color: red; font-weight: bolder"> 단, 연구소 출입 비밀번호만 빼구요! </span> </p> <p>출입비밀번호는 저도 알지 못하고, 알려드릴 수 없어요. 때문에 대장님께서 잘 기억해 주셔야 합니다. </p> <br /> <h3 style="color: white">연구소 접속하기</h3> <ol style="color: white"> <li style="color: white"> 냠냠랩 홈페이지에서 [연구소 이름을 알려주세요]에 ${labName}입력 </li> <li style="color: white">[출입 비밀번호를 알려주세요]에 출입 비밀번호 입력</li> <li style="color: white">[연구소 찾기]버튼 클릭</li> </ol> <br /> <h3>연구소 데이터 스프레드 시트로 열람하기</h3> <p> 그동안 냠냠랩에서 연구하신 내용이 어떤 꾸밈도 없이 완전한 날 것으로 있는 공간이에요. 혹여나 데이터 백업이 필요하거나 대규모의 수정이 필요하다면 사용해보세요. </p> <a href="https://docs.google.com/spreadsheets/d/${newLabId}" target="_blank" style="text-decoration: none; color: #62b6ff; font-weight: lighter" >https://docs.google.com/spreadsheets/d/${newLabId}</a > <br /><br /> <p>혹시 연구를 하시다가 도움이 필요한 일이 생긴다면 아래에 적어드린 이메일주소로 연락주세요! 성의껏 도와드릴게요.</p><br /><br /><br /> <p>고라니 드림</p> </div> <div style="background-color: #333333; padding: 32px"> <a href="https://nyam.wonj.in/" target="_blank" style="text-decoration: none; color: #62b6ff; font-weight: lighter" >https://nyam.wonj.in/</a > <p style="text-decoration: none; color: white; font-weight: lighter; margin: 0"> goranimaster17@gmail.com </p> </div> </body>`;

    MailApp.sendEmail({
      to: captainEmail,
      subject: `[냠냠랩] 대장님의 \"${labName}\" 연구소가 생겼어요! `,
      htmlBody: mailBody,
    });

    // 프로그램 종료
    return buildResponse({
      status: STATUS.success,
      data: "정상적으로 잘 생성되었습니다" + JSON.stringify(d),
    });
  } catch (err) {
    Logger.log(err);
    return buildResponse({
      status: STATUS.error,
      data: String(err),
    });
  }
}

//└─────────────────────────────────────────┘

//┌── Main Processing ─────────────────────────────┐

//└─────────────────────────────────────────┘

//┌── Utilities ─────────────────────────────────┐

// 스프레드시트의 url로부터 문서 id를 추출합니다.
function getSpreadSheetId(url) {
  const temp = url.split("/");
  const id = temp[temp.length - 2];

  return id;
}

function reqAddRouteTest() {
  // var data =
  requestAddRoute({
    labId: "123",
    labName: "nametest",
    routePw: "aaaa",
  });
}

// <NyamNyamLab_RouteManager>로 addRoute요청을 보냅니다.
function requestAddRoute({ labId, labName, routePw }) {
  const url = ROUTE_MANAGER_URL;
  const reqData = {
    taskType: "addRoute",
    data: {
      labId: labId,
      labName: labName,
      routePw: routePw,
    },
  };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(reqData),
  };

  UrlFetchApp.fetch(url, options);
}

// 비밀번호를 암호화합니다.
function encrypte(input) {
  const signature = Utilities.computeHmacSha256Signature(input, HMAC_KEY);
  return String(signature);
}

// doGet, doPost에 대한 응답을 Json형태의 양식에 맞추어 구성합니다.
function buildResponse({ status, data }) {
  const response = {
    status: status,
    data: data,
  };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

//└─────────────────────────────────────────┘

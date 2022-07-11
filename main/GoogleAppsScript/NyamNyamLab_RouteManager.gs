/*
Wonjin Yi. 2022. < NyamNyamLab 조직 내부의 냠냠거리 공유 서비스 >
NyamNyamLab_RouteManager : 버전 2

이 코드는 세 가지 역할을 담당합니다
1. '입주'옵션으로 새로이 생성된 '내 연구소'의 라우팅 정보 신규등록
2. '입주'옵션으로 이미 등록되어있는 '내 연구소'의 라우팅 정보 불러오기
3. '입주'옵션으로 이미 등록되어있는 '내 연구소'의 라우팅 비밀번호 변경하기 

이 코드는 두 개의 프로그램으로부터 호출됩니다.
1. 냠냠랩 프론트엔드 서비스 (doRoute)
2. NyamNyamLab_CreateNewLab_Movein (addRoute)
*/

//┌── Global Constants ────────────────────────────┐
const SHEET_INDEX = { route: 0 };

const KEY = ["id", "labName", "labId", "routePassword"];
const KEY_INDEX_NUM = { id: 0, labName: 1, labId: 2, routePassword: 3 };
const KEY_INDEX_COL = { id: "A", labName: "B", labId: "C", routePassword: "D" };

const STATUS = { success: "success", error: "error" };

//└─────────────────────────────────────────

//┌── Receive Request ─────────────────────────────┐

function doGet(e) {
  // 연구소 이름 중복체크
  const { labName } = e.parameter;
  if (!findLabByName(labName)) {
    return buildResponse({
      status: STATUS.success,
      data: true,
    });
  } else {
    return buildResponse({
      status: STATUS.success,
      data: false,
    });
  }
}

function test() {
  var c = {
    taskType: "addRoute",
    data: {
      labName: "testtest",
      routePw: "d",
      labId: "tts",
    },
  };

  var e = {
    postData: {
      contents: JSON.stringify(c),
    },
  };

  doPost(e);
}

function doPost(e) {
  try {
    Logger.log(e);
    const postData = JSON.parse(e.postData.contents);

    const { taskType, data } = postData;

    switch (taskType) {
      case "doRoute":
        const labKey = doRoute(data); // data : { labName, routePw }
        return buildResponse({
          status: labKey ? STATUS.success : STATUS.error,
          data: labKey,
        });

      case "addRoute":
        addRoute(data); // data : { labName, routePw, labId }
        return buildResponse({
          status: STATUS.success,
          data: "정상적으로 라우팅 목록에 추가되었습니다.",
        });
        break;

      default:
        return buildResponse({
          status: STATUS.error,
          data: "예상하지 못한 taskType입니다.",
        });
    }
  } catch (err) {
    return buildResponse({
      status: STATUS.error,
      data: err,
    });
  }
}

//└─────────────────────────────────────────┘

//┌── Main Processing ─────────────────────────────┐

// 새로운 '내 연구소' 라우팅 정보를 추가합니다.
function addRoute({ labName, routePw, labId }) {
  const newId = generateNewId();
  const pw = encrypte(routePw);

  const newRow = [newId, labName, labId, pw];
  appendNewRow({
    order: SHEET_INDEX.route,
    newRow: newRow,
  });
}

// 이미 존재하는 '내 연구소' 라우팅 정보를 찾아옵니다.
function doRoute({ labName, routePw }) {
  const lab = findLabByName(labName);

  if (lab) {
    let labKey = null;

    const isMatched = isSameArr(encrypte(routePw), lab[KEY_INDEX_NUM.routePassword]);

    if (isMatched) {
      labKey = lab[KEY_INDEX_NUM.labId];
    }

    return labKey;
  } else {
    return null;
  }
}

//└─────────────────────────────────────────┘

//┌── Utilities ─────────────────────────────────┐

// labName으로 해당 데이터에 해당하는 '내 연구소'정보를 불러옵니다.
function findLabByName(labName) {
  let lab = null;
  const values = getSheetValues({
    order: SHEET_INDEX.route,
    withKey: false,
  });

  for (row of values) {
    if (labName == row[KEY_INDEX_NUM.labName]) {
      lab = row;
      break;
    }
  }

  return lab;
}

// 새로운 row를 append할 때 사용할 id를 결정합니다.
function generateNewId() {
  const values = getSheetValues({
    order: SHEET_INDEX.route,
    withKey: false,
  });

  var newId = 0;
  if (values.length != 0) {
    const maxId = values.pop()[KEY_INDEX_NUM.id];
    newId = maxId + 1;
  }

  return newId;
}

// order번째에 해당하는 sheet의 내용을 불러옵니다.
function getSheetValues({ order, withKey }) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[order]);
  const sheetValues = sheet.getDataRange().getValues();

  if (!withKey) {
    sheetValues.shift();
  }

  return sheetValues;
}

function appendNewRow({ order, newRow }) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[order]);
  sheet.appendRow(newRow);
}

// 비밀번호를 암호화합니다.
function encrypte(input) {
  const signature = Utilities.computeHmacSha256Signature(input, HMAC_KEY);
  return String(signature);
}

function encrypteTest() {
  const input = "aaa";
  const signature = Utilities.computeHmacSha256Signature(input, HMAC_KEY);
  Logger.log(String(signature));
}

// 두 배열의 원소가 모두 일치하는지 확인합니다.
function isSameArr(arr1, arr2) {
  let isSame = true;

  try {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
        isSame = false;
        break;
      }
    }
    return isSame;
  } catch (e) {
    return false;
  }
}

// doGet, doPost에 대한 응답을 Json구조의 양식에 맞추어 구성합니다.
function buildResponse({ status, data }) {
  const response = {
    status: status,
    data: data,
  };
  Logger.log(response);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

//└─────────────────────────────────────────┘

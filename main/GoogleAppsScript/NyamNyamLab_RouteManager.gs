/*
Wonjin Yi. 2021. < NyamNyamLab 조직 내부의 냠냠거리 공유 서비스 >
NyamNyamLab_RouteManager : 버전 1

이 코드는 세 가지 역할을 담당합니다
1. '입주'옵션으로 새로이 생성된 '내 연구소'의 라우팅 정보 신규등록
2. '입주'옵션으로 이미 등록되어있는 '내 연구소'의 라우팅 정보 불러오기
3. '입주'옵션으로 이미 등록되어있는 '내 연구소'의 라우팅 비밀번호 변경하기 

이 코드는 냠냠랩 프론트엔드 서비스로부터 직접 호출됩니다.
*/

//┌── Global Constants ────────────────────────────┐

const KEY = ['id', 'labName', 'labId', 'routePassword'];
const KEY_INDEX_NUM = { id: 0, labName: 1, labId: 2, routePassword: 3 };
const KEY_INDEX_COL = { id: 'A', labName: 'B', labId: 'C', routePassword: 'D' };

const HMAC_KEY = <KEY>;
const STATUS = { success: "success", error: "error" };

//└─────────────────────────────────────────



//┌── Receive Request ─────────────────────────────┐

function doGet(e) {
  return buildResponse({
    status: STATUS.success,
    data: 123123,
  });
}

function doPost(e) {

  try {
    const postData = JSON.parse(e.postData.contents);
    const { taskType, labName, routePw } = postData;

    switch(taskType){
      case "doRoute":
          const labKey = doRoute(labName, routePw);
          return buildResponse({
            status: (labKey ? STATUS.success : STATUS.error),
            data: labKey,
          });

      case "addRoute":
          break;

      default:
        return buildResponse({
          status: STATUS.error,
          data: "아무런 일도 일어나지 않았습니다",
        });
    }
  } catch (err) {
    return buildResponse({
          status: STATUS.error,
          data: "아무런 일도 일어나지 않았습니다",
        });
  }
  
}

//└─────────────────────────────────────────┘



//┌── Main Processing ─────────────────────────────┐

// 새로운 '내 연구소' 라우팅 정보를 추가합니다.
function addLabRoute() {
  const ss = SpreadSheetApp.getActiveSpreadsheet();
  const routeList = ss.getDataRange().getValues();
  Logger.log(routeList);
}

// 이미 존재하는 '내 연구소' 라우팅 정보를 찾아옵니다.
function doRoute(labName, routePw) {
  const lab = findLabByName(labName);

  if (lab) {
    let labKey = null;

    const isMatched = isSameArr(
      encrypte(routePw),
      lab[KEY_INDEX_NUM.routePassword]
    );

    if (isMatched) { labKey = lab[KEY_INDEX_NUM.labId]; }

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
    order: 0,
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

  // 비밀번호를 암호화합니다.
function encrypte(input) {
  const signature = Utilities.computeHmacSha256Signature(input, HMAC_KEY);
  return String(signature);
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
  }
  Logger.log(response);
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

//└─────────────────────────────────────────┘

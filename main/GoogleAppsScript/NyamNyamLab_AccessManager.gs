/*
Wonjin Yi. 2021. < NyamNyamLab 조직 내부의 냠냠거리 공유 서비스 >
NyamNyamLab_AccessManager_Movein : 버전 7

이 코드는 '입주'옵션으로 생성된 '내 연구소'의 CRUD작업을 모두 담당합니다. 구체적으로 아래와 같은 일을 합니다.
1. '내 연구소'의 모든 데이터 읽기, 쓰기, 수정하기, 삭제하기
2. 쓰기, 수정하기, 삭제하기를 위한 captainPassword 검증

이 코드는 '냠냠랩 프론트엔드 서비스'에서 직접 호출되어 동작합니다.

[참고사항] 
'건설'옵션으로 생성된 '내 연구소'는 이 코드를 사용하지 않습니다. 
생성된 '내 연구소'에 묶여 별도로 Google Apps Script - Web app으로 배포된 스크립트를 사용합니다.
*/

//┌── Global Constants ────────────────────────────┐

const KEYS = ['id', 'name', 'lat', 'lng', 'type', 'open', 'close', 'description', 'menu', 'comment'];
const KEYS_NO_ID = ['name', 'lat', 'lng', 'type', 'open', 'close', 'description', 'menu', 'comment'];
const KEYS_INDEX_NUM = { id: 0, name: 1, lat: 2, lng: 3, type: 4, open: 5, close: 6, description: 7, menu: 8, comment: 9 }

const SETTING_KEYS = ['name', 'lat', 'lng', 'icon', 'customIcon', 'defaultPermission'];
const SETTING_KEYS_INDEX_NUM = { name: 0, lat: 1, lng: 2, zoom: 3, customIcon: 4, defaultPermission: 5 };

const STATUS = { success: "success", error: "error" };

//└─────────────────────────────────────────



//┌── Receive Request ─────────────────────────────┐

function doGet(e) {
  try {
    const { labId } = e.parameter;

    const spreadSheet = SpreadsheetApp.openById(labId);
    SpreadsheetApp.setActiveSpreadsheet(spreadSheet);

    const nyamListSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[0]);
    const nyamListArr = nyamListSheet.getDataRange().getValues();
    const nyamListObj = arrToObj(nyamListArr);

    const settingSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[1]);
    const settingArr = settingSheet.getDataRange().getValues();
    const settingObj = arrToObj(settingArr);

    const valid = validateHeader(nyamListArr[0], KEYS); // 이 스프레드시트가 냠냠랩 콘텐츠로서의 성질을 지니는지?
    if (valid) {
      return buildResponse({
        status: STATUS.success,
        data: {
          nyamList: nyamListObj,
          setting: settingObj
        }
      });
    } else {
      return buildResponse({
        status: STATUS.error,
        data: "냠냠랩 콘텐츠가 아닙니다. (제공된 DocID의 문서가 템플릿 KEY에 대한 헤더 유효성 검증을 통과하지 못했습니다.)",
      });
    }
  } catch (err) {
    return buildResponse({
      status: STATUS.error,
      data: String(err),
    });
  }
}

function doPost(e) {
  try {
    // re-assign reqeust data
    const { taskTarget, taskType } = e.parameter;

    const postData = JSON.parse(e.postData.contents);
    const { labId, nyam, captainPw } = postData;

    // select active spreadsheet & sheet
    const spreadSheet = SpreadsheetApp.openById(labId);
    SpreadsheetApp.setActiveSpreadsheet(spreadSheet);
    const nyamListSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[0]);
    const nyamListSheetValue = nyamListSheet.getDataRange().getValues();

    if (taskTarget == "nyam") {
      if (taskType == "create") {
        var sheetHeight = nyamListSheetValue.length;
        var reqDataArray = objToArr(nyam, taskType);
        var newId = parseInt(nyamListSheetValue[sheetHeight - 1][KEYS_INDEX_NUM.id]) + 1;
        reqDataArray.unshift(newId);

        nyamListSheet.appendRow(reqDataArray);
        stringifyRow(nyamListSheet, sheetHeight + 1);
        timeFormatter(nyamListSheet, sheetHeight + 1);

      } else if (taskType == "edit") {
        var reqDataArray = objToArr(nyam, taskType);
        var targetId = nyam.id;
        var targetRow = findRowById(nyamListSheetValue, targetId);

        var rowRange = nyamListSheet.getRange(`A${targetRow}:J${targetRow}`);
        rowRange.setValues([reqDataArray]);
        rowRange.setNumberFormat("@");
        timeFormatter(nyamListSheet, targetRow);

      } else if (taskType == "delete") {
        var targetId = parseInt(nyam.id);
        var targetRow = findRowById(nyamListSheetValue, targetId);

        nyamListSheet.deleteRow(targetRow);
      }
    } else if (taskTarget == "comment") {
      if (taskType == "edit") {
        var comment = nyam.comment;

        var targetId = parseInt(nyam.id);
        var targetRow = findRowById(nyamListSheetValue, targetId);

        var rowRange = nyamListSheet.getRange(`J${targetRow}`);
        rowRange.setValue(comment);
      }
    }

    return buildResponse({
      status: STATUS.success,
      data: postData,
    });
  } catch (err) {
    return ContentService.createTextOutput(err);
  }

}

//└─────────────────────────────────────────┘



//┌── Main Processing ─────────────────────────────┐

//└─────────────────────────────────────────┘



//┌── Utilities ─────────────────────────────────┐

function arrToObj(arr) {
  const keys = arr.shift();
  const result = [];

  for (var i = 0; i < arr.length; i++) {
    const member = {}
    for (var j = 0; j < keys.length; j++) {
      member[keys[j]] = arr[i][j];
    }
    result.push(member);
  }

  arr.unshift(keys);

  return result;
}

function objToArr(obj, taskType) {
  if (taskType == "create") { return KEYS_NO_ID.map(key => obj[key]); }
  else if (taskType == "edit") { return KEYS.map(key => obj[key]); }

  return;
}

function stringifyRow(sheet, rowIndex) {
  sheet.getRange(`A${rowIndex}:J${rowIndex}`).setNumberFormat("@");
  Logger.log(sheet.getRange(`A${rowIndex}:J${rowIndex}`).getValues());
  Logger.log(`A${rowIndex}:J${rowIndex}`);
}

function timeFormatter(sheet, targetRow) {
  var cell = null;

  cell = sheet.getRange(`F${targetRow}`);
  if (((cell.getValue()).split(':'))[0].length == 1) {
    cell.setValue(`0${cell.getValue()}`);
  }

  cell = sheet.getRange(`G${targetRow}`);
  if (((cell.getValue()).split(':'))[0].length == 1) {
    cell.setValue(`0${cell.getValue()}`);
  }
}

function findRowById(sheetRows, targetId) {
  var targetRow = null;

  for (var i = 0; i < sheetRows.length; i++) {
    var currentRowId = parseInt(sheetRows[i][KEYS_INDEX_NUM.id]);
    if (currentRowId == targetId) {
      targetRow = i;
      break;
    }
  }

  return targetRow + 1;
}

function validateHeader(header, keys) {
  try {
    for (var i = 0; i < keys.length; i++) {
      if (header[i] != keys[i]) {
        return false;
      }
    }
  } catch (e) {
    return false;
  }

  return true;
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

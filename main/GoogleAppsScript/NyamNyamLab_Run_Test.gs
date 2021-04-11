const SHEET_INDEX = { nyam: 0, setting: 1 };

const KEYS = ['id', 'name', 'lat', 'lng', 'type', 'open', 'close', 'description', 'menu', 'comment'];
const KEYS_NO_ID = ['name', 'lat', 'lng', 'type', 'open', 'close', 'description', 'menu', 'comment'];
const HEADER_INDEX = { id: 0, name: 1, lat: 2, lng: 3, type: 4, open: 5, close: 6, description: 7, menu: 8, comment: 9 }

const SETTING_KEYS = ['name', 'lat', 'lng', 'icon', 'custum_icon'];
const SETTING_HEADER_INDEX = { name: 0, lat: 1, lng: 2, zoom: 3, custum_icon: 4 };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function doGet(e) {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

  const nyamListSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[0]);
  const nyamListArr = nyamListSheet.getDataRange().getValues();
  const nyamListObj = arrToObj(nyamListArr);

  const settingSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[1]);
  const settingArr = settingSheet.getDataRange().getValues();
  const settingObj = arrToObj(settingArr);

  const respond = {};
  respond.nyamList = nyamListObj;
  respond.setting = settingObj;
  
  return ContentService.createTextOutput(JSON.stringify(respond)).setMimeType(ContentService.MimeType.JSON);
  //return HtmlService.createHtmlOutput( JSON.stringify(respond) );
}

function test() {
  // test
}

function experiment() {
//  var folders = DriveApp.getFoldersByName("nyamnyamlab_test");
//  // while(folders.hasNext()){
//  //   const folder = folders.next();
//  //   Logger.log(folder);
//  // }
//  var myfolder = folders.next();
//  Logger.log(myfolder);
//  var myfiles = myfolder.getFiles();
//  while(myfiles.hasNext()){
//    const file = myfiles.next();
//    Logger.log(file);
//    Logger.log(file.getMimeType());
//    //Logger.log(file.getUrl());
//  }
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

  // const nyamListSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[0]);
  // const nyamListArr = nyamListSheet.getDataRange().getValues();
  // const nyamListObj = arrToObj(nyamListArr);

  const settingSheet = SpreadsheetApp.setActiveSheet(spreadSheet.getSheets()[1]);
  const settingArr = settingSheet.getDataRange().getValues();
  const settingObj = arrToObj(settingArr);

  const respond = {};
  respond.setting = settingObj;
  
  Logger.log(respond);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var rawSheetData = sheet.getDataRange().getValues();

  var { taskTarget, taskType } = e.parameter;
  var rawReqData = e.postData.getDataAsString();
  var reqData = JSON.parse(rawReqData)

  if (taskTarget == "nyam") {
    if (taskType == "create") {
      var sheetHeight = rawSheetData.length;
      var reqDataArray = objToArr(reqData, taskType);
      var newId = parseInt(rawSheetData[sheetHeight - 1][HEADER_INDEX.id]) + 1;
      reqDataArray.unshift(newId);

      sheet.appendRow(reqDataArray);
      stringifyRow(sheet, sheetHeight + 1);
      timeFormatter(sheet, sheetHeight + 1);

    } else if (taskType == "edit") {
      var reqDataArray = objToArr(reqData, taskType);
      var targetId = reqData.id;
      var targetRow = findRowById(rawSheetData, targetId);

      var rowRange = sheet.getRange(`A${targetRow}:J${targetRow}`);
      rowRange.setValues([reqDataArray]);
      rowRange.setNumberFormat("@");
      timeFormatter(sheet, targetRow);

    } else if (taskType == "delete") {
      var targetId = parseInt(reqData.id);
      var targetRow = findRowById(rawSheetData, targetId);

      sheet.deleteRow(targetRow);
    }
  } else if (taskTarget == "comment") {
    if (taskType == "edit") {
      var comment = reqData.comment;

      var targetId = parseInt(reqData.id);
      var targetRow = findRowById(rawSheetData, targetId);

      var rowRange = sheet.getRange(`J${targetRow}`);
      rowRange.setValue(comment);
      //rowRange.setNumberFormat("@");
      //timeFormatter(sheet, targetRow);
    }
  }

  return ContentService.createTextOutput(JSON.stringify(reqData)).setMimeType(ContentService.MimeType.JSON);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    var currentRowId = parseInt(sheetRows[i][HEADER_INDEX.id]);
    if (currentRowId == targetId) {
      targetRow = i;
      break;
    }
  }

  return targetRow + 1;
}
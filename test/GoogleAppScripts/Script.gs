function doGet(e) {
  var params = e.parameter
  var sheetType = params.type;

  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  // 구글시트로 요청을 나누어 보내는 것이 비용이 너무 크다고 판단, 비활성화하였음.
  // if (sheetType == "detail") {
  //   SpreadsheetApp.setActiveSheet(sheet.getSheets()[1]);
  // } else if (sheetType == "comment") {
  //   SpreadsheetApp.setActiveSheet(sheet.getSheets()[2]);
  // } else { // nyam
  //   SpreadsheetApp.setActiveSheet(sheet.getSheets()[0]);
  // }

  var rawData = sheet.getDataRange().getValues();
  Logger.log(rawData);

  var respond = arrToObj(rawData);
  Logger.log(respond)

  return ContentService.createTextOutput( JSON.stringify(respond) ).setMimeType(ContentService.MimeType.JSON);
  //return HtmlService.createHtmlOutput( JSON.stringify(respond) );
}

function arrToObj (arr) {
  const keys = arr[0];
  const result = [];
  
  for ( var i=1; i<arr.length; i++ ) {
    const member = {}
    for ( var j=0; j<keys.length; j++ ) {
      member[keys[j]] = arr[i][j];
    }
    result.push(member); 
  }

  return result;
}
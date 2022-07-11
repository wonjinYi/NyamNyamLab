/*
Wonjin Yi. 2022. < NyamNyamLab 조직 내부의 냠냠거리 공유 서비스 >
NyamNyamLab_SendCheckMail : 버전 1

이 코드는 전송받은 이메일로 확인메일을 단순발송하는 역할을 합니다.
이 코드는 냠냠랩 프론트엔드 서비스로부터 직접 호출됩니다.
*/

//┌── Global Constants ────────────────────────────┐

const STATUS = { success: "success", error: "error" };

//└─────────────────────────────────────────

//┌── Receive Request ─────────────────────────────┐

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const { captainEmail } = postData;

    // 대장 email로 완료안내메일 전송
    var mailBody = HtmlService.createHtmlOutputFromFile("mailBody").getContent();

    MailApp.sendEmail({
      to: captainEmail,
      subject: "[냠냠랩] 대장님의 이메일이 잘 확인됐어요!",
      htmlBody: mailBody,
    });

    // 프로그램 종료
    return buildResponse({
      status: STATUS.success,
      data: "정상적으로 잘 확인되었습니다.",
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

const KEYS = ['id', 'name', 'lat', 'lng', 'type', 'open', 'close', 'description', 'menu', 'comment'];
const TEMPLATE_SS_ID = "1jRWWpbjiBG3jGSpgcrPDz7Z-ngzBx-EtF7ai30vStSc";

function doGet(e) {
  const { title } = e.parameter;
  createAndSendDocument(title)
}

function createAndSendDocument(title) {
  const template = SpreadsheetApp.openById(TEMPLATE_SS_ID);

  const newSpreadSheet = template.copy(`냠연구소 for ${title}`);
  const ssName = newSpreadSheet.getName();
  const ssUrl = newSpreadSheet.getUrl();

  const email = Session.getActiveUser().getEmail();
  const subject = `[냠냠랩] "${title}"에 대한 새로운 연구소가 생성되었습니다!`;
  const body = '안녕하세요, 새로운 "냠냠 대장"님! 냠냠랩에 입주해주셔서 감사합니다!\n'
                + '저는 연구지원 책임자 "Jin"이구요, 냠냠랩의 새로운 대장님들을 맞이하는 역할을 맡고 있어요\n\n'
                + '이 이메일을 받아보신 대장님을 위해서 몇 가지 안내사항을 보내드릴게요!\n'
                + '함께하시는 "냠냠 개척자"분들께도 전해주시면 원활한 연구에 도움이 될 거에요!\n'
                + '\n\n\n\n'
                + '--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--'
                + '\n\n\n\n'

                + '1. \n'
                + '첫 번째! 방금 냠냠 대장님의 동의를 얻어 실행한 프로그램이 어떤 일을 했는지 알려드릴게요.\n\n'
                + '이 이메일을 받으셨다면 "냠냠랩"홈페이지에서 요청하신 "새로운 연구소 만들기"가 성공적으로 완료된 것이에요.\n'
                + '이 세계의 어딘가에 떠도는 "연구소 설계도"를 바탕으로, '
                + '대장님의 Google Drive에 새로운 Google Spread Sheet(이하 구글시트)를 만들어 넣어두었습니다.\n'
                + '그런 다음 대장님께 지금 보고계신 이메일을 보내드렸어요!\n\n' 
                + '이게 전부랍니다. 대장님의 개인정보를 함부로 펼쳐보는 일은 절대 하지 않았어요.\n'
                + '\n\n\n'

                + '2. \n'
                + '두 번째! 만들어진 구글시트에 대해서 알려드릴게요\n\n'
                + `구글시트의 이름은 "${ssName}"입니다. 가장 아래에 링크를 걸어두었어요.\n`
                + '앞으로 "냠냠랩"을 통해서 연구하시는 모든 내용은 이 구글시트에 저장될 거에요. 그 저장된 내용을 "냠냠랩"이 받아와서 연구시설을 제공한답니다.\n'
                + '즉! 저희 "냠냠랩"에서는 대장님의 연구내용을 전혀 알지 못해요. 그저 대장님이 필요하실 때만 내용을 읽어서 보여드릴 뿐이에요.\n'
                + '\n'
                + '그 말인 즉슨, 이 구글시트가 사라지거나 실수에 의해 망가지면 정상적으로 연구활동을 하실 수 없다는 이야기에요.\n'
                + '구글시트를 직접 열어보신다면, 정말 조심하셔야 한답니다. 문제가 생기면 대부분의 경우에 구글시트가 제공하는 자체 복원기능으로 복구할 수 있을거에요.\n'
                + '\n'
                + '혹시나 복구에 어려움을 겪으신다면 "냠냠랩" 우측하단의 "상담하기"를 눌러 저에게 도움을 요청해주세요. 성의껏 도와드릴게요.\n'
                + '\n\n\n'

                + '3. \n'
                + '세 번째! "냠냠랩"을 이용하여 연구활동을 하시는 방법을 알려드릴게요.\n\n'
                + '아래에 여러가지 버전의 가이드를 준비해 두었으니, 필요하신 내용을 원하는 형태로 열람해보세요!\n'
                + '추가예정\n'

                + '\n\n\n\n'
                + '--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--'
                + '\n\n\n\n'

                + '이렇게 제가 꼭 알려드리고 싶었던 세 가지를 말씀드렸어요!\n\n'
                + '앞으로 "냠냠대장"님과 "냠냠개척자"분들의 연구활동에 저희 "냠냠랩"이 많은 도움이 되었으면 좋겠어요.\n'
                + '힘닿는데까지 열심히 연구시설을 개선하고, 보수하고 있겠습니다.\n'
                + '\n'
                + '끝으로, 저희 냠냠랩에 대장님이 입주해주셔서 정말 감사합니다.\n'
                + '불편한 점이 있으시면 "냠냠랩"홈페이지 우측하단의 "상담하기"를 눌러 언제나 말씀해주세요.\n'
                + '항상 대장님과 개척자분들의 연락을 기다리고 있을게요.\n'
                + '\n'
                + '--- 냠냠랩 연구지원 책임자 "Jin" 드림 ---\n'

                + '\n\n\n\n'
                + '--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--o--'
                + '\n\n\n\n'

                + 'P.S. 새로 만들어진 연구소의 "구글시트" 링크를 같이 보내드립니다 ☆'
                + '\n'
                + ssUrl;
  GmailApp.sendEmail(email, subject, body);
}

function test() {
  var sheet = SpreadsheetApp.create(`냠연구소 for TEST`);
  sheet.appendRow(KEYS);

  // Get the URL, name of the document.
  var url = sheet.getUrl();
  var subject = sheet.getName();

  // log
  Logger.log(getSpreadSheetId(url));
}

function test2() {
  const temp = SpreadsheetApp.openById(TEMPLATE_SS_ID);
  Logger.log(temp.getName());
  console.log(temp.getDataRange().getValues());

  const copied = temp.copy("이히히 사본이다");
  Logger.log(copied.getName());

  var email = Session.getActiveUser().getEmail();
  var body = '새로운 남 연구소가 만들어졌습니다! 아래 Url을 눌러 데이터를 직접 열람하실 수 있습니다.\n' + copied.getUrl();
  GmailApp.sendEmail(email, temp.getName(), body);
}

function testTrigger() {
  console.log("hihi");
}
function getSpreadSheetId(url){
  Logger.log(typeof url);
  const temp = url.split('/');
  const id = temp[temp.length-2];
  
  return id;
}
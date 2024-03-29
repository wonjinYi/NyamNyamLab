#### 2022년 7월 11일 월요일

- '입주'옵션으로 연구소를 정상적으로 생성할 수 있도록 프로그램을 수정했습니다.
  - 이제 이메일 확인 시점, 연구소 입주 완료시점에 대장의 이메일주소로 안내메일을 발송합니다.
  - 이제 필수입력값이 비어있으면 연구소 입주절차를 진행하지 않고, 내용을 보충할 것을 사용자에게 요청합니다.
  - 연구소 출입 비밀번호를 필수적으로 요구하는 버그를 수정했습니다. 연구소 관리 비밀번호와 기본권한 필드를 삭제했습니다.
- 새로고침시 404 NOT FOUND가 출력되는 현상을 수정했습니다.
  - 새로고침하려고 하면 경고창을 표시하고, 새로고침되면 메인페이지로 이동합니다.

#### 2021년 4월 11일 일요일

- 의견, 냠을 삭제할 때 확인을 한 번 더 거칩니다.
- 지도 초기설정 내용을 구글앱스로 옮겼고, 시트로부터 정보를 받아와 화면을 표시합니다.
- 의견 작성에 대한 시스템 피드백을 추가하였습니다.
- 메뉴 카테고리를 추가했습니다 : 분식, 아시안, 베이커리, 술집

#### 2021년 4월 3일 토요일

- 의견 입력창에서 이모지를 입력할 수 있도록 했습니다.

#### 2021년 3월 29일 월요일

- 냠 에디터의 위경도 좌표 수정 업데이트 이후 발생한 아래 버그를 해결하였습니다.
  - 페이지 로드 후 곧바로 '새로운 냠' 생성 대화창을 열었을 때, 위경도 좌표가 null값으로 나타나는 문제
  - 다른 냠의 수정창을 연 뒤, 혹은 새로운 냠을 생성한 뒤에 '새로운 냠'을 생성 대화창을 열었을 때 기본값이 빈값이 아닌 문제
- 냠 에디터의 위경도 좌표 필드에 대한 레이아웃을 정의했습니다
- 데이터 요청뿐 아니라 지도상에 뿌리는 과정에 대해서도 예외처리를 정의했습니다.
- 이제 새로운 냠 등록시 '메뉴'들도 검증과정을 거칩니다. 빈 값을 넣을 수 없습니다.

#### 2021년 3월 28일 일요일

- 이미 등록된 냠의 위경도 좌표를 수정할 수 있도록 했고, 이에 따른 대공사를 어느정도 진행했습니다.

#### 2021년 3월 27일 토요일

- 업데이트 노트를 열람할 수 있도록 했습니다.
- 냠 수정창에서 내용을 수정한뒤 저장하지않고 창을 닫았다 열었을 때, 수정하기 전의 본래 내용이 표시되도록 수정하였습니다.
- 냠 생성/수정/삭제에 따른 사용자 피드백메시지를 상단에 표시합니다.

#### 2021년 3월 26일 금요일

- 정보표시창의 메뉴부분을 기존 외부 디자인에서 Table로 대체하였습니다.

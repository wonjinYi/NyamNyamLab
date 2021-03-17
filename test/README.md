# 냠냠랩 Test
냠냠랩 1차 프로젝트로 진행되는 Test 웹 어플리케이션

### 프로그램 구조
4계층의 컴포넌트로 구성되어있으며, ```원자 - 따름이 - 이끌이 - 대장``` 의 계층으로 구성됩니다.
* (A : Atom) 원자 : **냠냠랩**에서 가장 작은 단위의 컴포넌트입니다. **냠냠랩**을 구성한다고 보기는 어렵고, 독립적으로 아주 작은 동작만을 담당합니다.
* (F : Follwer) 따름이 : 원자를 포함하여 작성된 컴포넌트입니다.
* (L : Leader) 이끌이 : 대장 아래 위치하는 다소 구체적이지 못한 계층의 컴포넌트입니다. **따름이**들을 열심히 굴리고, 거기서 나온 결과물을 **대장**에게 갖다 바칩니다.
* (B : Boss) 대장 : **냠냠랩**안에서 큼직한 자리를 꿰차고 있습니다. 오직 **Header, Maps, Footer**만이 존재합니다. Map은 다른 나머지 둘에 비해 굉장히 비대한 **대장**입니다. 각자의 이름에 해당하는 역할을 수행하기 위한 초기화는 **대장**에서 진행합니다. 그 외에 사용자의 조작에 의하여 일어나는 동작은 모두 **이끌이**를 하위에 두어 역할을 떠넘깁니다.
* NyamNyamLab Web Frontend Service : 냠냠랩 프론트엔드 서비스 그 자체로, 오직 **App** 컴포넌트 하나만 존재합니다.

이외 리액트 컴포넌트의 형태로 빼기 어려운 것들은 ES6 모듈로 분리했으며, **도우미(S : Supporter)**로 부릅니다.
```
index.js
└── App (NyamNyamLab Web Frontend Service)
    └─ DataStorage.js (S) : 테스트 용도의 사용자설정 보관소
    └─ Header (B)
        └─ Tools (F)
    └─ Maps (B)
        └─ Loading (A)
        └─ naverMapsInit.js (S)
        └─ naverMapsSetNyams.js (S)
        │
        └─ NyamEditor (F)
        └─ MapsModal (L)
            └─ MapsModalInfo (F)
            │   └─ NyamEditor (F)
            └─ MapsModalComment (F)
                └─ Comment (A) 
    ㄴFooter (B)
```

### src 디렉토리 구조
* 폴더는 **[ nyamnyam ]** 과 같이 대괄호로 감싸 표현했습니다
* React Component는 확장자없는 단순 문자열로 표현했습니다

src root에는 index.js, App.js 이 있습니다. 그 하위에 components 디렉토리가 있습니다.
```
[ src ]
    └─ index : public/index.html의 <div id="root"> App.js 컴포넌트를 연결
    └─ App
    └─ [ components ]
```
components하위에는 아래와 같은 구조를 적용하였습니다. 
* **atoms, supporters** 디렉토리가 있으며 이 안에는 각각 **원자** 컴포넌트와 **도우미** 스크립트가 **대장** 구분없이 섞여 들어갑니다.
* 각 **대장**들은 본인 컴포넌트 및 className와 같은 이름의 디렉토리를 갖습니다. 각 디렉토리의 root에는 대장 컴포넌트만이 홀로 위치합니다. root아래에는 해당 **대장**이 사용하는 **이끌이**와 **따름이**를 각각의 디렉토리에 구분하여 넣어둡니다. 특별한 일이 없으면 **원자**와 **도우미**는 여기에 존재하지 않아야합니다.
```
[ components ]
    └─ [ atoms ]
    └─ [ supporters ]
    │
    └─ [ Boss_1 ]
        └─ Boss_1
        └─ [ leaders ]
            └─ leader_1
                ...
            └─ leader_N
        └─ [ followers ]
            └─ follower_1
                ...
            └─ follower_N
    └─ [ Boss_N ]
```

### 냠냠랩 기초재료
노드 패키지
* react
* antd
* axios
* gh-pages
* moment : 현재 사실상 개발중단된 패키지임. antd Timepicker에서 해당 패키지를 프롭으로 받길래 일단 넣었음
* react-script-tag
* prop-types

외부 서비스
* Google Sheets & Google Apps Script
* **Naver Web Dynamic Maps v3** [NCP](https://www.ncloud.com/product/applicationService/maps)
* Github Pages
* CloudFlare

### 감사히 가져온 것들

아이콘(Icons)
* **한식(korean)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/rice-bowl_3800515)
* **일식(japan)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/sushi_786954)
* **중식(China)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/noodles_2518412)
* **편의점(cvs)** icon made by [Nikita Golubev](https://www.flaticon.com/authors/nikita-golubev) from [www.flaticon.com](https://www.flaticon.com/free-icon/shop_290957)
* **카페(cafe)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/coffee-cup_284815?related_id=284815&origin=pack)
* **패스트푸드(fastfood)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/hamburger_3635562)
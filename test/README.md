# 냠냠랩 Test
냠냠랩 1차 프로젝트로 진행되는 Test 웹 어플리케이션

### 구조
모두 컴포넌트로 구성되어있으며, ```원자 - 따름이 - 이끌이 - 대장``` 의 계층으로 구성됩니다.
* (A : Atom) 원자 : **냠냠랩**에서 가장 작은 단위의 컴포넌트입니다. **냠냠랩**을 구성한다고 보기는 어렵고, 독립적으로 아주 작은 동작만을 담당합니다.
* (F : Follwer) 따름이 : 원자를 포함하여 작성된 컴포넌트입니다. 재사용성이 있게 작성합니다.
* (L : Leader) 이끌이 : **냠냠랩**안에서 큼직한 자리를 꿰차고 있습니다. 재사용성을 갖고있다고 보기 어렵습니다.
* (B : Boss) 대장 : 가장 큰 단위의 컴포넌트로 **냠냠랩**의 프론트엔드 서비스 그 자체입니다. 바로 아래 자식으로는 이끌이만 가질 수 있습니다.
```
index
ㄴApp (B)
    ㄴHeader (L)
        ㄴ 뭔가 생길예정
    ㄴMaps (L)
        ㄴ Loading (A)
        ㄴ 뭔가
        ㄴ 생길 예정
    ㄴFooter (L)
```

### 감사히 가져온 것들 (Resources Used)
프로그램(External Scripts)
* **Naver Web Dynamic Maps v3** [NCP](https://www.ncloud.com/product/applicationService/maps)


아이콘(Icons)
* **편의점(cvs)** icon made by [Nikita Golubev](https://www.flaticon.com/authors/nikita-golubev) from [www.flaticon.com](https://www.flaticon.com/free-icon/shop_290957)
* **카페(cafe)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/coffee-cup_284815?related_id=284815&origin=pack)
* **밥(meal)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/rice-bowl_3800515)
* **패스트푸드(fastfood)** icon made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/free-icon/hamburger_3635562)
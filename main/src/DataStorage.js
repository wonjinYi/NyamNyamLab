// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
export default function DataStorage (key) {
    const data = {
        NYAM_TYPES : {
            korea : "한식",
            china : "중식",
            japan : "일식",
            asian : "아시안",
            schoolfood : "분식",
            fastfood : "패스트푸드",
            cafe : "카페",
            bakery : "베이커리",
            pub : "술집",
            cvs : "편의점",
        }, 
        NYAM_TYPES_KEY : ["korea", "china", "japan", "fastfood", "cvs", "cafe", "asian", "schoolfood", "bakery", "pub"],
        ACCESS_MANAGER : "https://script.google.com/macros/s/AKfycbzNp4klrdkk_uv3TX6gP3ZO73mGGDzxGkUXw9iOCjidmYVJlhlPzqAYDOH9GuWVrXIh9w/exec",
        MAP_SOURCE: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
    }

    return data[key];
}
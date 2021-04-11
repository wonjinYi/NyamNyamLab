// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
export default function DataStorage (key) {
    const data = {
        NYAM_TYPES : {
            korea : "한식",
            china : "중식",
            japan : "일식",
            fastfood : "패스트푸드",
            cvs : "편의점",
            cafe : "카페",
        }, 
        NYAM_TYPES_KEY : ["korea", "china", "japan", "fastfood", "cvs", "cafe"],
        CONTENT_SOURCE : "https://script.google.com/macros/s/AKfycbwpvR56TiSzf5Rejfz9eqEm_QbvKTnu8b2m40grhbCWbNhycWsij8j3WtNY_P47-0mz/exec",
        MAP_SOURCE: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
    }

    return data[key];
}
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
        CREATE_NEWLAB_MOVEIN : "https://script.google.com/macros/s/AKfycbxOcOe80qpz4OEBtZQAUvglvTHhidWRtvWJocxnRnCQf7L-qhKJe4iGrU3gFsUIO-zhAQ/exec",
        CREATE_NEWLAB_CONSTRUCT : "",
        ACCESS_MANAGER : "https://script.google.com/macros/s/AKfycbw6AGu6_jOF9XXuI5F4z-Qh4JH3xgtopAioBhlHuyKKHCJ4balXR1UqRWd6fRtyicc44w/exec",
        ROUTE_MANAGER : "https://script.google.com/macros/s/AKfycbyOHtCkG4cwHLFZ6YdwyVBgsc0ZU10qBQGw1KST0aFUFUbQDFdRBEljknpH_qq4j0f00A/exec",
        MAP_SOURCE: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
        
        SEND_CHECK_MAIL : "https://script.google.com/macros/s/AKfycbwpRm7JuOINlnTgI3vVibl51cJAdhGX49vRN_m34CMDyVudu8cjHRsgBY97vsM7-63N7Q/exec",
    }
    
    return data[key];
}
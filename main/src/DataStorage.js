// prettier-ignore
export default function DataStorage (key) {
    const data = {
        ROUTE : {
            HOME : "home",
            APP : "app",
        },
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
        CREATE_NEWLAB_MOVEIN : "https://script.google.com/macros/s/AKfycbzU-VM4HCXt5wh2Co4oaHBhbFijVOFoHRQZRrp11QWsZLVln9Dbf6f6TBEuN14DTi3PoA/exec",
        CREATE_NEWLAB_CONSTRUCT : "",
        ACCESS_MANAGER : "https://script.google.com/macros/s/AKfycbw6AGu6_jOF9XXuI5F4z-Qh4JH3xgtopAioBhlHuyKKHCJ4balXR1UqRWd6fRtyicc44w/exec",
        ROUTE_MANAGER : "https://script.google.com/macros/s/AKfycbz5iYlaH55WjYJSzvlEnM1ADaP5iwRD8gAbYhHgMtQDQLjHgEmlBi1XZRITl5u1AzZCLA/exec",
        MAP_SOURCE: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
        
        SEND_CHECK_MAIL : "https://script.google.com/macros/s/AKfycbzOVLMzHMqGIAKzUZuUKDVtZsW11Kg_FmPJqffeLhXUw-PAOKychlChqSyQFxHwPebshQ/exec",
    }
    
    return data[key];
}

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
        CREATE_NEWLAB_MOVEIN : "https://script.google.com/macros/s/AKfycbzJHyjnmotq2YZlZY0FMaCrJ9DhvEQH3Ypmym2-KYhRqsX432tIWb_Ekdh9Di_il5Eruw/exec",
        CREATE_NEWLAB_CONSTRUCT : "",
        ACCESS_MANAGER : "https://script.google.com/macros/s/AKfycbxG61CxkA0gpkVjDabJy0ppZf8qg7k_uBw5JMlfbbW_QsOTOOQxqaytMUHk-er70MLzhg/exec",
        ROUTE_MANAGER : "https://script.google.com/macros/s/AKfycbwSwo8RKpf2juoN2phctY4O63M1duFbVOBPlQ5KFQJqsXyAzZVNy-JKASD3ilx5kBJ1TQ/exec",
        MAP_SOURCE: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ont9t74d67",
        
        SEND_CHECK_MAIL : "https://script.google.com/macros/s/AKfycbwYqPWz7um1k9atzWcMTmiQdSkX4dHzZ-oKJ93BH0VWNVcrAUfw-_z9eGOCWRHhOWo_hg/exec",
    }
    
    return data[key];
}

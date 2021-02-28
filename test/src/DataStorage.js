// [경고] 임시적인 사용자설정 보관소 - 나중에 다른 방법으로 대체필요
export default function DataStorage (key) {
    const data = {
        NYAM_TYPES : {
            meal : "밥",
            fastfood : "패스트푸드",
            cvs : "편의점",
            cafe : "카페",
        }, 
        NYAM_TYPES_KEY : ["meal", "fastfood", "cvs", "cafe"],
        NYAM_LIST_SOURCE : "https://script.google.com/macros/s/AKfycbyuACrtmBSgcaehSnfbDVhSAMeScTP455Z44h4jtjxRGxJ5UNeVdOEh/exec",
    }

    return data[key];
}
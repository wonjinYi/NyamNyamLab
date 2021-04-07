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
        NYAM_LIST_SOURCE : "https://script.google.com/macros/s/AKfycbx8v0CH5a_ne_pf90Y1D28O6zA-YOaJgY9G6O_lb-iXqmL0HDF1p6kPDfkuxaz3xLxo/exec",
    }

    return data[key];
}
import axios from "axios";
import { message } from "antd";

export default async function readContents(src) {
    try {
        const { data } = await axios.get(src);
        console.log(data);
        return { 
            rawNyamList : data.nyamList,
            setting : data.setting[0],
        };
    } catch (e) {
        message.error("문제가 생겨 데이터를 받아오지 못했습니다. 새로고침을 시도해주세요", 0);
        return;
    }
}
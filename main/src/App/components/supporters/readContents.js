import axios from "axios";
import { message } from "antd";

export default async function readContents(labAccessInfo) {
    try {
        const {accessManagerUrl, labId} = labAccessInfo;

        const { data : {data, status} } = await axios.get(`${accessManagerUrl}?labId=${labId}`);

        if(status!=='error'){
            return { 
                rawNyamList : data.nyamList,
                setting : data.setting[0],
            };
        } else {
            throw new Error(`응답 status가 ${status}입니다.`);
        }
        
    } catch (err) {
        message.error({
            content : '문제가 생겨 데이터를 받아오지 못했습니다.',
            duration : 0,
            key : 'readContents_01',
            onClick : (e)=>{message.destroy('readContents_01');},
        });
        console.error(err);
        return null;
    }
}
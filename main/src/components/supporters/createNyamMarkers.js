import { message } from "antd";

export default function createNyamMarkers (map, nyamTypes, nyamList, setMarkers, setNyams, setMapsModalVisible, setSelectedNyam) {
    // initialize temp variable for states
    const tempNyams = initWithNyamtype(nyamTypes);
    const tempMarkers = initWithNyamtype(nyamTypes);
    
    // create markers
    try {
        nyamList.forEach( item => { 
            const marker = new window.naver.maps.Marker({
                position : new window.naver.maps.LatLng(item.lat, item.lng),
                map : map,
                icon : {
                    content: [
                        '<div>',
                            '<div style="background-color:rgba(255,255,255,0.8); padding:5px; border-radius:16px; border:1px solid #d9d9d9;">',
                                `<span style="white-space:nowrap;">${item.name}</span>`,
                            '</div>',
                            `<img src="img/icons/svg/${item.type}.svg">`,
                        '</div>'
                    ].join(''),
    
                    anchor: new window.naver.maps.Point(16, 48),
                }
            });
    
            marker.addListener("click", (e) => {
                const targetid = e.overlay["_nmarker_id"];
                const types = nyamTypes;
    
                for( let i = 0; i<types.length; i++){
                    const type = types[i];
                    let chk = false;
                    for( let j=0; j<tempMarkers[type].length; j++ ){
                        if ( targetid === tempMarkers[type][j]["_nmarker_id"] ){
                            setSelectedNyam(tempNyams[type][j]);
                            setMapsModalVisible(true);
                            chk = true;
                            break;
                        }
                    }
                    if (chk) { break; }
                }
            });
    
            tempNyams[item.type].push(item);
            tempMarkers[item.type].push(marker);
        });

        setNyams(tempNyams);
        setMarkers(tempMarkers);
    } catch(err) {
        console.error(err);
        console.error(nyamList);
        message.error("데이터를 표시하는 과정에 문제가 생겼습니다. 새로고침을 시도해주세요", 0);
    }
}


function initWithNyamtype (types) {
    let obj = {};
    types.forEach( category => {
        obj[category] = [];
    });

    return obj;
}
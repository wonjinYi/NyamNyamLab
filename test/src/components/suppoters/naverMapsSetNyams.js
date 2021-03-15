import axios from "axios";

export default async function naverMapsSetNyams (map, mapValues, setMarkers, setNyams, setMapsModalVisible, setSelectedNyam) {
    // initialize temp variable for states
    const tempNyams = initWithNyamtype(mapValues.nyamTypes);
    const tempMarkers = initWithNyamtype(mapValues.nyamTypes);

    // read nyamList
    const nyamList = await readNyamList(mapValues.nyamListSource);

    // set markers
        // organization item
    const org = nyamList.shift(); 
    const org_marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(org.lat, org.lng),
        map: map,
        icon: {
          url : `img/icons/${org.type}.png`,
          size: new window.naver.maps.Size(48, 48),
          origin: new window.naver.maps.Point(0, 0),
        }
    });

        // nyam items
    let cnt = 0;
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
                        `<img src="img/icons/${item.type}.png">`,
                    '</div>'
                ].join(''),
                anchor: new window.naver.maps.Point(16, 48),
            }
        });

        marker.addListener("click", (e) => {
            const targetid = e.overlay["_nmarker_id"];
            const types = mapValues.nyamTypes;

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

        cnt++;
    });
    
    org_marker.setZIndex(cnt); // 회사 마커가 가장 위로 올라오도록

    setNyams(tempNyams);
    setMarkers(tempMarkers);
}

async function readNyamList (src) {
        const { data } = await axios.get(src);
        //console.log("readNyams", data);

        return data;
}

function initWithNyamtype (types) {
    let obj = {};
    types.forEach( category => {
        obj[category] = [];
    });

    return obj;
}
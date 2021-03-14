import axios from "axios";

export default async function naverMapsSetNyams (map, mapValues, markers, setMarkers, nyams, setNyams, setMapsModalVisible, setSelectedNyam) {
    console.log('setnyam', map);
    // initialize temp variable for states
    // setMarkers( initWithNyamtype(mapValues.nyamTypes) );
    // setNyams( initWithNyamtype(mapValues.nyamTypes) );
    const tempNyams = initWithNyamtype(mapValues.nyamTypes);
    const tempMarkers = initWithNyamtype(mapValues.nyamTypes);

    // read nyamList
    const nyamList = await readNyamList(mapValues.nyamListSource);

    // set markers
        // organization item
    const org = nyamList.shift(); 
    /*const org_marker = */ new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(org.lat, org.lng),
        map: map,
        icon: {
          url : `img/icons/${org.type}.png`,
          size: new window.naver.maps.Size(48, 48),
          origin: new window.naver.maps.Point(0, 0),
        }
    });

        // nyam items
    nyamList.forEach( item => { 
        const marker = new window.naver.maps.Marker({
            position : new window.naver.maps.LatLng(item.lat, item.lng),
            map : map,
            icon : {
                content: [
                    '<div>',
                        '<div style="background-color:rgba(255,255,255,0.8); padding:5px; border-radius:16px; border:1px solid #d9d9d9;">',
                            `<span>${item.name}</span>`,
                        '</div>',
                        `<img src="img/icons/${item.type}.png">`,
                    '</div>'
                ].join(''),
                anchor: new window.naver.maps.Point(16, 48),
            }
        });

        marker.addListener("click", (e) => {
            console.log(tempNyams, tempMarkers)
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
    });
    
    setNyams(tempNyams);
    setMarkers(tempMarkers);

    // add Click eventlistener to markers.
    // const types = mapValues.nyamTypes;
    // types.forEach( type => { // loop : each type
    //     tempMarkers[type].forEach ( marker => { // loop : each marker
    //         addListener("click", (e) => {
    //             const targetId = e.overlay["_nmarker_id"];


    //         });
    //     });
    // });

    //////////////////////
    // tempMarkers.addListener("click", (e) => {
    //     console.log(nyams, markers)
    //     const targetid = e.overlay["_nmarker_id"];
        
        
    //     for( let i = 0; i<types.length; i++){
    //         const type = types[i];
    //         let chk = false;
    //         for( let j=0; j<markers[type].length; j++ ){
    //             if ( targetid === markers[type][j]["_nmarker_id"] ){
    //                 setSelectedNyam(nyams[type][j]);
    //                 setMapsModalVisible(true);
    //                 chk = true;
    //                 break;
    //             }
    //         }
    //         if (chk) { break; }
    //     }
    // });
}

async function readNyamList (src) {
        const { data } = await axios.get(src);
        console.log("readNyams", data);

        return data;
}

function initWithNyamtype (types) {
    let obj = {};
    types.forEach( category => {
        obj[category] = [];
    });

    return obj;
}

// function handleClick (e) {
//     const targetid = e.overlay["_nmarker_id"];
        
//     for( let i = 0; i<types.length; i++){
//         const type = types[i];
//         let chk = false;
//         for( let j=0; j<markers[type].length; j++ ){
//             if ( targetid === markers[type][j]["_nmarker_id"] ){
//                 setSelectedNyam(nyams[type][j]);
//                 setMapsModalVisible(true);
//                 chk = true;
//                 break;
//             }
//         }
//         if (chk) { break; }
//     }
// }
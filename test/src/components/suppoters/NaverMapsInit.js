export function init (setIsLoading, setMapsModalVisible, setSelectedNyam, setIsPickmode, setPickCoord, setNyamEditorModalVisible) {
    setIsLoading(true);

    // set naver.maps.Map
    const { center, zoom } = mapValues;

    const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
    };
    map = new window.naver.maps.Map("map", mapOptions);   

    // read nyamList
    const nyamList = await reqNyamList.read();

    // set markers
    const org = nyamList.shift(); // organization
    /*const org_marker = */ new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(org.lat, org.lng),
        map: map,
        icon: {
          url : `img/icons/${org.type}.png`,
          size: new window.naver.maps.Size(48, 48),
          origin: new window.naver.maps.Point(0, 0),
        }
    });

    nyamList.forEach( item => { // nyam items
        const temp = new window.naver.maps.Marker({
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

        temp.addListener("click", (e) => {
            const targetid = e.overlay["_nmarker_id"];
            const types = mapValues.nyamTypes;
            console.log(e.coord);
            for( let i = 0; i<types.length; i++){
                const type = types[i];
                let chk = false;

                for( let j=0; j<markers[type].length; j++ ){
                    if ( targetid === markers[type][j]["_nmarker_id"] ){
                        setSelectedNyam(nyams[type][j]);
                        setMapsModalVisible(true);
                        chk = true;
                        break;
                    }
                }

                if (chk) { break; }
            }
        });

        nyams[item.type].push(item);
        markers[item.type].push(temp);
    });

    setIsLoading(false);
}
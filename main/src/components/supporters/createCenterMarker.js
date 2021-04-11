export default function createCenterMarker(map, setting) {
    const { lat, lng } = setting;

    const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map: map,
        icon: {
          url : `img/icons/svg/center.svg`,
          size: new window.naver.maps.Size(48, 48),
          origin: new window.naver.maps.Point(0, 0),
        }
    });

    return 0;
}
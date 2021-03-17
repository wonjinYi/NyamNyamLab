export default function naverMapsinit (mapValues) {
    // set naver.maps.Map
    const { center, zoom } = mapValues;

    const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
    };
    const map = new window.naver.maps.Map("map", mapOptions);

    return map;
}
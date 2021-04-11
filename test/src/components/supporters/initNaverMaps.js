export default function naverMapsinit(setting) {
    const { lat, lng, zoom } = setting;
    
    const mapOptions = {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: zoom,
    };
    const map = new window.naver.maps.Map("map", mapOptions);

    return map;
}
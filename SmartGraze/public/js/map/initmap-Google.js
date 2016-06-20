var oLat = 22.502;
var oLng = 113.932;
var oZoom = 4;

function initGoogleMap(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: oZoom,
            center: latlng,
            navigationControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.minZoom = 2;
        /* 实时交通,路况信息
        var trafficLayer = new google.maps.TrafficLayer();  
        trafficLayer.setMap(map); 
        */
    } catch (e) {
        //initGoogleMap(lat, lng, zoom);
  
    }
}

var map = null;

function initmap() {
    initGoogleMap(0, 0, 0);
}

function addMarker(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var stopIcon = "icons/startstr.png";
    var marker = new google.maps.Marker({
        position: latlng, 
        icon: stopIcon,
        map: map
    });

    map.setCenter(latlng);
    map.setZoom(17);
}
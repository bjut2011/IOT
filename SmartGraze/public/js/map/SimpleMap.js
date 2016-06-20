window.onload = function () {
    initmap();

    var latLng = document.getElementById("hidLatLng").value;
    if (latLng != "") {
        var latLngArr = latLng.split(',');
        addMarker(latLngArr[0], latLngArr[1]);
    }
}
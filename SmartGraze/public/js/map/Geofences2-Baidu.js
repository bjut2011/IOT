var map = null;
var isShowPoly = false;
var isClkMarker = false;
function initmap() {
    initBaiduMap(0, 0, 0);

    map.addEventListener("click", function (e) {
        var latLng = new BMap.Point(e.point.lng, e.point.lat);
        addMarker(latLng);
    });
}
function clearMap() {
    if (map) {
        //map.clearOverlays();
        for (var i = 0; i < markers.length; i++) {
            map.removeOverlay(markers[i]);
        }
        map.removeOverlay(polygon);
        
    }
}

var markers = [];
var points = [];
function addMarker(point) {
    if (isShowPoly && !isClkMarker) {
        points.push(point);
        pointsStr.push(point.lat + "," + point.lng);
        var squIcon = "images/square.png";
        var sIcon = new BMap.Icon(squIcon, new BMap.Size(11, 11));
        var squMarker = new BMap.Marker(point, { icon: sIcon });
        squMarker.setOffset(new BMap.Size(0, 0))
        map.addOverlay(squMarker);
        markers.push(squMarker); 
        addBaiduClkListener(squMarker);
        drawPoly();
    }
    isClkMarker = false;
}

function addBaiduClkListener(marker, d) {
    try {
        marker.addEventListener("click", function () {
            isClkMarker = true;
            var n = 0;
            for (n = 0; n < markers.length; n++) {
                if (markers[n] == marker) {
                    map.removeOverlay(marker);
                    break;
                }
            }
            markers.splice(n, 1);
            points.splice(n, 1);
            pointsStr.splice(n, 1);
            drawPoly();
        });
    } catch (ex) { }

}
var polygon = null;
function drawPoly() {
    if (polygon) {
        map.removeOverlay(polygon);
    }
    polygon = new BMap.Polygon(points, { strokeColor: "#0000ff", strokeWeight: 2, strokeOpacity: 0.8, fillColor: "#00CCFF", fillOpacity: 0.35 });
    map.addOverlay(polygon);

}


function showPolygonInMap(arr) {
    for (var i = 0; i < arr.length; i++) {
        var latLng = new BMap.Point(arr[i].lng, arr[i].lat);
        addMarker(latLng);
        if (i == 0) {
            map.centerAndZoom(latLng, 13); 
        }
    }
}

function setMapCenterByLatlng(lat, lng) {
    var latLng = new BMap.Point(lng, lat);
    map.centerAndZoom(latLng, 18); 
}

function addCarMarker(json) {
    var checkBoxs = [];
    for (var i = 0; i < json.devices.length; i++) {
        var isChecked = false;
        if (json.devices[i].status == "LoggedOff") {

        } else {
            var latlng = new BMap.Point(json.devices[i].baiduLng, json.devices[i].baiduLat);
            var icon = GetIcon(json.devices[i].icon, json.devices[i].status, json.devices[i].course);
            var marker = new PopupMarker({ position: latlng, map: map, icon: icon, text: json.devices[i].name, showpop: true });
            if (json.devices[i].id == DeviceID) {
                isChecked = true;
                map.centerAndZoom(latlng, 15);
            }
        }
        //循环添加checkbox
        if (isChecked) {
            checkBoxs.push('<input type="checkbox" name="checkbox" checked="true" value="' + json.devices[i].id + '" onclick="moveMap(this,\'' + json.devices[i].status + '\',' + json.devices[i].baiduLat + ',' + json.devices[i].baiduLng + ')" />' + json.devices[i].name + "&nbsp;&nbsp;");
        } else {
            checkBoxs.push('<input type="checkbox" name="checkbox" value="' + json.devices[i].id + '" onclick="moveMap(this,\'' + json.devices[i].status + '\',' + json.devices[i].baiduLat + ',' + json.devices[i].baiduLng + ')" />' + json.devices[i].name + "&nbsp;&nbsp;");
        }
    }
    $("#divCheckDevices").html(checkBoxs.join(''));
}

function moveMap(t, s, lat, lng) {
    if (t.checked && s != "LoggedOff") {
        var latlng = new BMap.Point(lng, lat);
        map.centerAndZoom(latlng, 15);
    }
}
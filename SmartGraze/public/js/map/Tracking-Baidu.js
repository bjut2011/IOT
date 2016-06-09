var map = null;
var isSetZoom = true;
var popupmarkerWidth = 200;
var popupmarkerHeight = 70;
function initmap() {
    initBaiduMap(0, 0, 0);
}

var lastMarker = null;
var lastLocation = null;
function showMarker(lk) {
    if (lk) {
        var latlng = new BMap.Point(lk.baiduLng, lk.baiduLat);
        if (isSetZoom) {
            map.centerAndZoom(latlng, 12);
            isSetZoom = false;
        } else {
            var LatLngBounds = map.getBounds();
            var isMap = LatLngBounds.containsPoint(latlng);
            if (!isMap) {
                //panTo
                map.setCenter(latlng); 
            }
        }
        var icon = GetIcon(iconType, lk.status, lk.course); 
        if (!lastMarker) {
            //首次
            var html = GetMarkerInfo(lk);
            //var icon = "icons/green_north_21.gif";
            lastMarker = new PopupMarker({ position: latlng, map: map, icon: icon, text: html, showpop: true });  
        } else {
            //取出来的是新数据.
            if (lk.serverUtcDate != lastLocation.serverUtcDate) {
                var html = GetMarkerInfo(lk);
                var obj = { "position": latlng, "icon": icon, "text": html };
                lastMarker.update(obj);
                //描线
                var lastLatlng = new BMap.Point(lastLocation.baiduLng, lastLocation.baiduLat);
                var ArrayPolyPoints = new Array();
                ArrayPolyPoints.push(lastLatlng);
                ArrayPolyPoints.push(latlng);
                var mypoly = new BMap.Polyline(ArrayPolyPoints, { strokeColor: "#00FF33", strokeWeight: 7, strokeOpacity: 0.7 });
                map.addOverlay(mypoly);
            }
        }
        lastLocation = lk;
    }
    GetAddressByMap(lk.baiduLat, lk.baiduLng);
    if (!isFortime) {
        forTimeMethod();
        isFortime = true;
    }
}


function GetMarkerInfo(lk) {

    return GetPopupHtml(lk, lk.baiduLat, lk.baiduLng);
}

//谷米接口解析
function GetAddressByMap(lat, lng) {
    GetAddressByGoome(lat, lng);
}
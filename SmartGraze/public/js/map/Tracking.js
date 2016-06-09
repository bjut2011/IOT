var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var forTimer = 10000;
var forTimeSecond = null;
var language = "zh-cn";
var iconType = "1";
var displayPano = false;
var nowLat = 0;
var nowLng = 0;

$(document).ready(function () {

    var title = "Tracking:";
    language = $("#hidLanguage").val();
    DeviceName = $("#hidDeviceName").val();
    iconType = parseInt($("#hidIcon").val());
    document.title = title + DeviceName;
    syncSize();
    initmap();

    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();

    ajaxGetTracking();
});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 0;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    if (displayPano) {
        $("#map_canvas").css("width", (w / 2) + "px");
        $("#divIframe").css("width", (w / 2) + "px");
        $("#divIframe").css("height", h + "px");
        $("#divIframe").css("marginLeft", (w / 2) + "px");
        $("#divPanoImg").css("marginLeft", (w / 2 - 100) + "px");
    } else {
        $("#map_canvas").css("width", w + "px");
        $("#divPanoImg").css("marginLeft", (w - 100) + "px");
    }    
}

var isFortime = false;
function forTimeMethod() {

    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        ajaxGetTracking();
        secondIndex = 0;
    }

}


function ajaxGetTracking() {
    $.ajax({
        type: "GET",
        url: "gettracking",
        contentType: "application/json",
        data: "{DeviceID:" + DeviceID + ",TimeZone:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            if (true) {
                var json = eval("(" + "{locationID:1,deviceUtcDate:\"2016-05-30 09:40:59\",serverUtcDate:\"2016-05-30 10:18:04\",latitude:\"31.97629\",longitude:\"118.79877\",baiduLat:\"31.98264\",baiduLng:\"118.80518\",oLat:\"31.97833\",oLng:\"118.79358\",speed:\"0.00\",course:221,isStop:1,dataType:1,dataContext:\"\",distance:\"16627.1479\",status:\"Stop\"}" + ")");
                nowLat = json.latitude;
                nowLng = json.longitude;
                showMarker(json);
            }
        }
    });
}

//轨迹总里程(米),上一个轨迹点的经纬度
var allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
function GetPopupHtml(lk, lat, lng) {

    var html = [];
    html.push("<b>" + DeviceName + "</b><br />");
    html.push(lk.deviceUtcDate + "<br />");
    var disStr = allPage.m;
    var showDistance = 0;
    if (lastDistanceLat) {
        var distance = parseFloat(GetDistance(lastDistanceLat, lastDistanceLng, lat, lng)); //单位米
        allDistance += distance;
        if (allDistance < 1000) {
            disStr = allPage.m;
            showDistance = allDistance;
        } else {
            showDistance = (allDistance / 1000);
            disStr = allPage.km;
        }
        showDistance = showDistance.toFixed(2);
    }
    html.push(allPage.distance2 + ":" + showDistance + disStr + "<br />");
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    var courseName = GetCoureName(lk.course);
    html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + lk.speed + allPage.speedKM);
    html.push('<br />&nbsp;&nbsp;');
    lastDistanceLat = lat;
    lastDistanceLng = lng;
    return html.join('');
}

function showHidePano() {
    var display = $("#divIframe").css("display");
    if (display == "none") {
        displayPano = true;
        $("#divIframe").show();
        var url = "TencentPano.aspx?lat=" + nowLat + "&lng=" + nowLng;
        $("#divIframe").attr("src", url);
    } else {
        displayPano = false;
        $("#divIframe").hide();
    }
    syncSize();
}

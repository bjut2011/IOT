var DeviceID = 0;
var TimeZone = "";
var DeviceName = "";
var isShowLBS = 0; //是否显示LBS数据,0只显示GPS,1显示GPS+LBS
var speedLimit = 0;
var isShowEvent = true;
var lastStartOverspeedTime = null, lastEndOverspeedTime = null;  //上一条超速开始时间,最后超速时间
var reportIndex = 1;
var mapType = "";
var geocoder = null;
var model = 0;
$(document).ready(function () {

    var title = "Playback:";
    DeviceName = $("#hidDeviceName").val();
    document.title = title + DeviceName;
    speedLimit = parseFloat($("#hidSpeedLimit").val());
    initLanguage();
    syncSize();
    initSlider();
    initmap();
    if (isShowEvent) {
        showEventListDiv(1);
    }
    DeviceID = $("#hidDeviceID").val();
    model = $("#hidModel").val(); 
    TimeZone = $("#hidTimeZone").val();
    mapType = $("#hidMapType").val();
    if (mapType == "Google") {
        geocoder = new google.maps.Geocoder();
    }
    $("#divEventListInfo").html(GetEventTable());
    $("#divGPSReport").html(GetGPSTable());
});

function GetGPSTable() {
    var eventListHtml = [];
    eventListHtml.push('<table id="tblGPSReport" width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
    eventListHtml.push('<thead>');
    eventListHtml.push('<tr height="25" style="background:#F5F5F5;">');
    eventListHtml.push('<th width="35">' + allPage.num + '</th>');
    eventListHtml.push('<th width="180">' + allPage.positionTime + '</th>');
    eventListHtml.push('<th width="80">' + allPage.lat + '</th>');
    eventListHtml.push('<th width="80">' + allPage.lng + '</th>');
    eventListHtml.push('<th width="80">' + allPage.speed + '</th>');
    eventListHtml.push('<th width="80">' + allPage.drection + '</th>');
    if (model == 132) {
        eventListHtml.push('<th width="80">' + yiwen201407.elec + '</th>');
    }
    eventListHtml.push('<th>' + allPage.address + '</th>');
    eventListHtml.push('</tr></thead>');
    eventListHtml.push('</table>');
    return eventListHtml.join('');
}

function appendGPSTable(d, lat, lng) {
    var html = [];
    html.push('<tr height="25">');
    html.push('<td align="center">' + reportIndex + '</td>');
    html.push('<td align="center">' + d.deviceUtcDate + '</td>');
    html.push('<td align="center">' + lat + '</td>');
    html.push('<td align="center">' + lng + '</td>');
    html.push('<td align="center">' + d.speed + '</td>');
    var courseName = GetCoureName(d.course);
    html.push('<td align="center">' + courseName + '</td>');
    if (model == 132) {
        var carState = d.ct;
        var eleStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-'); 
            if (carStateArr.length >= 5) {
                if (carStateArr[4] != "") {
                    eleStr = carStateArr[4] + "%"; 
                }
            }
        }
        html.push('<th width="80">' + eleStr + '</th>');
    }
    var address = '<a href="javascript:void(0);" onclick="GetAddress(this,' + lat + ',' + lng + ')">' + allPage.resolve + '</a>';

    html.push('<td align="center">' + address + '</td>');
    html.push('</tr></thead>');
    $("#tblGPSReport").append(html.join(''));

    reportIndex++;
}


function showHideGPSReport() {
    var display = $("#divGPSReport").css("display");
    if (display == "none") {
        $("#divGPSReport").css("display", "block");
    } else {
        $("#divGPSReport").css("display", "none");
    }
}

function GetEventTable() {
    var eventListHtml = [];
    eventListHtml.push('<table id="tblEvent" width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
    eventListHtml.push('<thead>');
    eventListHtml.push('<tr height="25" style="background:#F5F5F5;">');
    eventListHtml.push('<th width="40"></th>');
    eventListHtml.push('<th>' + allPage.startTime + '</th>');
    eventListHtml.push('<th>' + allPage.endTime + '</th>');
    eventListHtml.push('<th>' + overSpeedPage.continueTime + '</th>');
    eventListHtml.push('</tr></thead>');
    eventListHtml.push('</table>');
    return eventListHtml.join('');
}

function initLanguage() {
    $("#btnPlay").val(playbackPage.play);
    $("#btnPause").val(playbackPage.next);
    $("#btnNext").val(playbackPage.pause);
}

function checkShowLBS(c) {
    if (c) {
        isShowLBS = 1;
    } else {
        isShowLBS = 0;
    }
    $("#hidIsShowLBS").val(isShowLBS);
}

function initSlider() {
    $("#PlaySpeed").slider({
        min: 30,
        max: 1000,
        value: 30,
        step: 10,
        animate: true,
        change: function (event, ui) {
            forTimer = ui.value;
            var isPlay = document.getElementById("btnNext").disabled;
            //var isPlay = $("#btnNext").attr("disabled");  //这里获取的是字符串,""或underfind
            if (!isPlay) {
                if (forTime) {
                    clearInterval(forTime);
                    showHistoryMap();
                    forTime = setInterval(showHistoryMap, forTimer);
                }
            }
        }

    });
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 30;
    var w = $(this).width() - 0;
    $("#map_canvas").css("height", h + "px");
    $("#map_canvas").css("width", w + "px");

    var w2 = w - 375;
    $("#divEventList").css("left", w2 + "px");
    var h3 = $(this).height() - 30;
    $("#divEventList").css("top", h3 + "px");
}

function showEventListDiv(t) {
    if (t == 0) {
        $("#divEventListInfo").css("display", "none");
        $("#divEventList").css("height", "25px");
        var h = $(this).height() - 30;
        $("#divEventList").animate({ top: h + "px" }, 300);
    } else {
        $("#divEventListInfo").css("display", "block");
        $("#divEventList").css("height", "450px");
        var h = $(this).height() - 450;
        $("#divEventList").animate({ top: (h) + "px"}, 300);


    }
}

var forTimer = 30;
var queryStartDate = null;
var queryEndDate = null;
var isSerachFirst = true;
var index = 0;
var forTime = null;
var isSetZoom = true;
var isFirstShowHistory = true;
var lastMarker = null;
var allLocation = [];
var lastAllLocationLength = -1;
var lastLocationID = -1;
var allMarker = [];
var allPolyline = [];

function serchLocation() {

    var startDate = $("#txtStartDate").val();
    var endDate = $("#txtEndDate").val();

    var diff = DateDiff(startDate, endDate);
    if (diff <= 0) {
        alert(playbackPage.timeMsg);
        return false;
    } else {
        if (DeviceID > 0) {
            deleteOverLays(allPolyline);
            deleteOverLays(allMarker);
            lastLocationID = -1;
            queryStartDate = startDate;
            queryEndDate = endDate;
            isSerachFirst = true;
            //isSetZoom = true;
            isFirstShowHistory = true;
            lastMarker = null;
            index = 0;
            if (forTime) {
                clearInterval(forTime);
            }
            forTime = null;
            lastStartOverspeedTime = null;
            lastEndOverspeedTime = null;
            allLocation = [];
            lastAllLocationLength = -1;
            allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
            $("#divEventListInfo").html(GetEventTable());
            reportIndex = 1;
            $("#divGPSReport").html(GetGPSTable());

            WebGetHistory();
        }
    }
}

function WebGetHistory() {
    var lastDevice = null;
    if (allLocation.length > 0) {
        lastDevice = allLocation[allLocation.length - 1];
    }
    allLocation.length = 0;
    index = 0;
    document.getElementById("btnPause").disabled = true;
    document.getElementById("btnNext").disabled = true;
    //上一次搜索,最后一条记录,用于添加停止点
    if (lastDevice) {
        allLocation.push(lastDevice);
        index = 1;
    }
    document.getElementById("spanMsg").innerHTML = playbackPage.nowLoading;
    //CollectGarbage();
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAjax.asmx/GetDevicesHistory",
        contentType: "application/json",
        data: "{DeviceID:" + DeviceID + ",Start:'" + queryStartDate + "',End:'" + queryEndDate + "',TimeZone:'" + TimeZone + "',ShowLBS:" + isShowLBS + "}",
        dataType: "json",
        error: function (res) {
            alert(res.responseText);
        },
        success: function (result) {
            if (result.d != "") {
                WebGetHistoryCallBack(result.d);
            }
        }
    });
}


function WebGetHistoryCallBack(res) {
    document.getElementById("spanMsg").innerHTML = "";
    if (res != "") {
        var json = eval("(" + res + ")");
        queryStartDate = json.lastDeviceUtcDate;
        var LocationID = parseInt(json.lastLocationID);
        if (LocationID == lastLocationID) {
            clearInterval(forTime);
            document.getElementById("btnPause").disabled = true;
            document.getElementById("btnNext").disabled = true;
            alert(playbackPage.playOver);
            return;
        }
        lastLocationID = LocationID;

        allLocation = json.devices;

    }

    if (allLocation.length == 0) {
        if (isSerachFirst) {
            alert(playbackPage.searchNull);
        } else {
            clearInterval(forTime);
            alert(playbackPage.playOver);
        }
    }
    isSerachFirst = false;
    if (allLocation.length > 0) {
        document.getElementById("btnPause").disabled = true;
        document.getElementById("btnNext").disabled = false;
        lastAllLocationLength = allLocation.length;
        showHistoryAllMap();
    }
}

function changePlay(t) {
    if (t == 0) {
        //继续
        showHistoryMap();
        forTime = setInterval(showHistoryMap, forTimer);
        document.getElementById("btnPause").disabled = true;
        document.getElementById("btnNext").disabled = false;
    } else if (t == 1) {
        //暂停
        clearInterval(forTime);
        document.getElementById("btnPause").disabled = false;
        document.getElementById("btnNext").disabled = true;

    } else if (t == 2) {

    }
}

function DateDiff(start, end)  //返回分钟
{
    try {
        start = start.replace(/-/g, '/');
        end = end.replace(/-/g, '/');
        var a = new Date(start);
        a = a.getTime();
        var b = new Date(end);
        b = b.getTime();
        var ticksspan = b - a;
        return ticksspan / 60 / 1000;
    } catch (e) {
        
    }
}


//分钟转换到天小时分钟格式
function minuteToStr(minute) {

    var time = "";

    var day = parseInt(minute / 60 / 24);
    var hour = parseInt((minute / 60) - (day * 24));
    var minu = parseInt((minute) - (day * 24 * 60) - (hour * 60));
    if (day > 0) {
        time = day + allPage.day;
        time += hour + allPage.hour;
        time += minu + allPage.minute;
    } else if (hour > 0) {
        time = hour + allPage.hour;
        time += minu + allPage.minute;
    } else {
        time = minu + allPage.minute;
    }

    return time;

}

//轨迹总里程(米),上一个轨迹点的经纬度
var allDistance = 0, lastDistanceLat = null, lastDistanceLng = null;
function GetPopupHtml(d, lat, lng, isStop, stopMinite) {

    var html = [];
    html.push("<b>" + DeviceName + "</b><br />");
    html.push(d.deviceUtcDate + "<br />");
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
    if (model == 132) {
        var carState = d.ct;
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 5) {
                if (carStateArr[4] != "") {
                    html.push(yiwen201407.elec + ":" + carStateArr[4] + "%<br />");
                }
            }
        }
    }
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    var courseName = GetCoureName(d.course);
    if (isStop == 1) {
        var stopTime = minuteToStr(stopMinite);
        html.push(allPage.stopTime + ":" + stopTime + "<br />");
    } else {
        html.push(allPage.drection + ":" + courseName + ",");
        html.push(allPage.speed + ":" + d.speed + "" + allPage.speedKM + "<br />");
    }
    html.push('&nbsp;&nbsp;');
    lastDistanceLat = lat;
    lastDistanceLng = lng;
    return html.join('');
}

function GetClkInfo(d, lat, lng, isStop, stopMinite, nowDeviceUtcDate) {

    var html = [];
    html.push("<b>" + DeviceName + "</b><br />");
    html.push(d.deviceUtcDate + "<br />");
    html.push(allPage.lat + ":" + lat + ",");
    html.push(allPage.lng + ":" + lng + "<br />");
    if (isStop == 1) {
        var stopTime = minuteToStr(stopMinite);
        html.push(allPage.startStopTime + ":" + d.deviceUtcDate + "<br />");
        html.push(allPage.endStopTime + ":" + nowDeviceUtcDate + "<br />");
        html.push(allPage.stopTime + ":" + stopTime);

    } else {
        var courseName = GetCoureName(d.course);
        html.push(allPage.drection + ":" + courseName + "," + allPage.speed + ":" + d.speed + allPage.speedKM);

    }
    return html.join('');

}

function appendStopEvent(d) {
    var eventName = reportPage.stopCount;
    var stopTime = minuteToStr(d.stopTimeMinute);
    var html = [];
    html.push("<tr>");
    html.push('<td align="center">' + eventName + '</td>');
    html.push('<td align="center">' + d.deviceUtcDate + '</td>');
    html.push('<td align="center">' + d.serverUtcTime + '</td>');
    html.push('<td align="center">' + stopTime + '</td>');
    html.push("</tr>");
    $("#tblEvent").prepend(html.join(''));
}


function appendOverspeedEvent(d) {
    var isLastOverspeed = false;
    //当前点设备时间距离上一个点时间1分钟内,算一条数据
    if (lastStartOverspeedTime) {
        var overspeedDateDiff = DateDiff(lastEndOverspeedTime, d.deviceUtcDate);
        if (overspeedDateDiff < 1) {
            isLastOverspeed = true;
        }
    }
    if (isLastOverspeed) {
        $("#tblEvent tr:eq(1)").find('td').each(function (i) {
            if (i == 2) {
                $(this).html(d.deviceUtcDate);
            } else if (i == 3) {
                var overspeedTime = minuteToStr(parseInt(DateDiff(lastStartOverspeedTime, d.deviceUtcDate)));
                $(this).html(overspeedTime);
            }
        });
    } else {
        lastStartOverspeedTime = d.deviceUtcDate;
        var eventName = allPage.overspeed;
        var overspeedTime = minuteToStr(parseInt(DateDiff(lastStartOverspeedTime, d.deviceUtcDate)));
        var html = [];
        html.push("<tr>");
        html.push('<td align="center">' + eventName + '</td>');
        html.push('<td align="center">' + d.deviceUtcDate + '</td>');
        html.push('<td align="center">' + d.deviceUtcDate + '</td>');
        html.push('<td align="center">' + overspeedTime + '</td>');
        html.push("</tr>");
        $("#tblEvent").prepend(html.join(''));
    }
    lastEndOverspeedTime = d.deviceUtcDate;
}



function GetAddress(t, lat, lng) {
    if (mapType == "Baidu") {
        GetAddressByAPIBaidu(t, lat, lng);
    } else if (mapType == "Google") {
        GetAddressByGoogle(t, lat, lng);
    }
}

//获取地址信息
function GetAddressByGoogle(t, lat, lng) {
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }
    if (lat != 0) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $(t).parent().html(results[1].formatted_address);
                } else {

                }
            } else {

            }
        });
    }
}

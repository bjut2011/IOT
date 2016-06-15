var map = null;
var UserId = null;
var isShowDeviceName = true;
var forTimer = 10000;
var forTimeSecond = null;
var isFortime = false;
var language = "zh-cn";
var showPopupmarker = null; //信息弹出框
var showPopupmarkerID = 0;
var timeZone = "";
var loginType = 0;
var loginDeviceID = 0;
var pointsStr = [];

$(document).ready(function () {
    language = $("#hidLanguage").val();
    timeZone = $("#hidTimeZone").val();
    addSelMap();
    UserId = $("#hidUserID").val();
    loginType = parseInt($("#hidLoginType").val());
    loginDeviceID = $("#hidDeviceID").val();

    syncSize();
    initmap();
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    //加载全部车辆
    parent.getGroup();

});

function init() {
    document.onmousemove = mouseMove;
}


var mouseleft = 0;
var mousetop = 0;

function mouseMove(e) {
    if (!document.all) {

        mouseleft = e.pageX;
        mousetop = e.pageY;
    } else {
        mouseleft = document.body.scrollLeft + event.clientX;
        mousetop = document.body.scrollTop + event.clientY;
    }

}


function addSelMap() {
    var language = $("#hidLanguage").val();
    var optGoogle = '<option value="Google">' + iframeMapPage.googleMap + '</option>';
    $('#selMap').append(optGoogle);
    if (language == "zh-cn") {
        var optBaidu = '<option value="Baidu">' + iframeMapPage.baiduMap + '</option>';
        var optGaode = '<option value="Gaode">' + '高德地图' + '</option>';
        var optSOSO = '<option value="soso">' + '腾讯地图' + '</option>';
        $('#selMap').append(optBaidu);
        $('#selMap').append(optGaode);
        $('#selMap').append(optSOSO);
    } else if (language == "en-us") {

    } else if (language == "zh-hk") {
        var optBaidu = '<option value="Baidu">' + iframeMapPage.baiduMap + '</option>';
        $('#selMap').append(optBaidu);
    }
    var optOSM = '<option value="OSM">' + 'OpenStreetMap' + '</option>';
    $('#selMap').append(optOSM);
    var defaultMap = $("#hidSelMap").val();
    $("#selMap option[value='" + defaultMap + "']").attr("selected", "selected");
}

function changeMap() {
    var m = $('#selMap').val();
    var n = $("#hidLoginName").val();
    n = encodeURIComponent(n);
    parent.removeShowMoreDivDevice();
    if (loginType == 1) {
        var p = IDEncryption(UserId);
        location.href = "IframeMap.aspx?id=" + UserId + "&n=" + n + "&m=" + m + "&deviceID=" + loginDeviceID + "&p=" + p;
    } else {
        var p = IDEncryption(loginDeviceID);
        location.href = "IframeMap.aspx?id=" + UserId + "&n=" + n + "&m=" + m + "&deviceID=" + loginDeviceID + "&p=" + p;
    }
}

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8 - 15; 
    $("#map_canvas").css("height", h + "px");
}

function forTimeMethod(count) {
    if (count > 100 && count < 200) {
        forTimer = 20000;
    } else if (count >= 200 && count < 500) {
        forTimer = 30000;
    } else if (count >= 500) {
        forTimer = 60000;
    }else {
        forTimer = 10000;
    }
    $("#spanSecond").html(forTimer / 1000);
    forTimeSecond = setInterval(second, 1000);
}

function checkShowDeviceName(v) {
    if (isShowDeviceName != v) {
        if (v) {
            ShowDeviceName();
        } else {
            HideDeviceName();
        }
        isShowDeviceName = v;
    }
}

var secondIndex = 1;
function second() {

    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        parent.ajaxGetDevices();
        secondIndex = 0;
    }

}

function clearSecond() {
    secondIndex = 1;
    if (forTimeSecond) {
        clearInterval(forTimeSecond);
        clearAllMap();
        isFortime = false;
    }
}


function GetInfoWContx(data) {
    return GetPopupHtml(data);
}

function GetPopupHtml(data) {
    var html = [];
    var imghtml = "<a style='top: 1px; right: 1px; position: absolute;' href='javascript:void(0);'><img style='float:right' onclick='HideDeviceInfo(\"" + data.id + "\")' height='10' border='0' src='/img/map/iw_close.gif'/></a>";
    html.push("<b>" + data.name + "</b>" + imghtml + "<br />");
    html.push("<b>" + allPage.imeiNo + ":</b>" + data.sn + "<br />");
    var status = getDeviceStatus(data.status);
    html.push("<b>" + allPage.state + ":</b>" + status + "<br />");
    if (data.model == 25 || data.model == 80 || data.model == 51 || data.model == 26 || data.model == 50 || data.model == 30 || data.model == 90 || data.model == 54) {
        //GT06 宏远
        var accStr = GetAccStr(data.dataContext);
        html.push("<b>" + allPage.accStr + ":</b>" + accStr + "<br />");
    } else if (data.model == 71 || data.model == 85 || data.model == 86 || data.model == 87 || data.model == 72 || data.model == 73) {
        //天琴协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 3) {
                if (carStateArr[0] != "") {
                    carStateStr = carStateArr[0] == "1" ? yiwen201312.accOn : yiwen201312.accOff;
                }
                if (carStateArr[1] != "") {
                    carStateStr += "," + (carStateArr[1] == "1" ? yiwen201312.fortify : yiwen201312.dismiss);
                }
                if (carStateArr[2] != "") {
                    carStateStr += "," + (carStateArr[2] == "1" ? yiwen201312.carOpen : yiwen201312.carClose);
                }
                if (carStateArr[3] != "") {
                    carStateStr += "," + (carStateArr[3] == "1" ? yiwen201312.zdlj : yiwen201312.zddk);
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 140) {
        //BSJ电量协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            carStateStr = yiwen201407.elec + ":" + carState + "%";
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 160) {
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split(',');
            if (carStateArr.length == 3) {
                if (carStateArr[1] != "") {
                    carStateStr += yiwen201407.elec + ":" + carStateArr[1] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 132) {
        //天琴电量协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 5) {
                if (carStateArr[4] != "") {
                    carStateStr = yiwen201407.elec + ":" + carStateArr[4] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 500) {
        //D18
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 2) {
                if (carStateArr[0] != "") {
                    carStateStr = carStateArr[0] == "1" ? "开锁" : "关锁";
                }
                if (carStateArr[1] != "") {
                    carStateStr += ",电量" + carStateArr[1] + "%";
                }
                if (carStateArr.length >= 3) {
                    if (carStateArr[2] != "") {
                        carStateStr += ",信号" + carStateArr[2] + "%";
                    }
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 102) {
        //天琴协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 2) {
                if (carStateArr[0] != "") {
                    carStateStr +=  (carStateArr[0] == "1" ? yiwen201312.fortify : yiwen201312.dismiss);
                }
                if (carStateArr[1] != "") {
                    carStateStr += "," + yiwen201407.elec + ":" + carStateArr[1] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 150 || data.model == 159 || data.model == 170) {
        //3G协议
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split('-');
            if (carStateArr.length >= 2) {
                if (carStateArr[0] != "") {

                }
                if (carStateArr[1] != "") {
                    carStateStr += yiwen201407.elec + ":" + carStateArr[1] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 12 || data.model == 18 || data.model == 13 || data.model == 14 || data.model == 21 || data.model == 15 || data.model == 23 || data.model == 27 || data.model == 41 || data.model == 43 || data.model == 63 || data.model == 28 || data.model == 29 || data.model == 68 || data.model == 66) {
        var carState = data.dataContext;
        var carStateStr = "";
        if (carState != "") {
            var carStateArr = carState.split(',');
            if (carStateArr.length == 3) {
                if (carStateArr[0] != "") {
                    var accStr = GetAccStr(carStateArr[0]);
                    carStateStr = allPage.accStr + ":" + accStr + ",";
                }
                if (carStateArr[1] != "") {
                    carStateStr += yiwen201407.elec + ":" + carStateArr[1] + "%";
                }
                if (carStateArr[2] != "") {
                    if (carStateArr[2] == "0") {
                        carStateStr += "," + yiwen201407.gsm0;
                    } else if (carStateArr[2] == "1") {
                        carStateStr += "," + yiwen201407.gsm1;
                    } else if (carStateArr[2] == "2") {
                        carStateStr += "," + yiwen201407.gsm2;
                    } else if (carStateArr[2] == "3") {
                        carStateStr += "," + yiwen201407.gsm3;
                    } else if (carStateArr[2] == "4") {
                        carStateStr += "," + yiwen201407.gsm4;
                    }
                }
            }
        } 
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } else if (data.model == 36) {
        var carState = data.dataContext;
        if (carState != "") {
            var stateArr = carState.split("-");
            if (stateArr.length == 6) {

                if (stateArr[0] != "") {
                    var dianya = "";
                    if (stateArr[5] != "") {
                        dianya = "(" + stateArr[5] + ")";
                    }
                    html.push("<b>电量:</b>" + stateArr[0] + "%" + dianya + "<br />");
                }
                if (stateArr[4] != "") {
                    var aroundText = stateArr[4] == "0" ? "空旷开放环境" : "";
                    aroundText = stateArr[4] == "1" ? "半空旷环境" : aroundText;
                    aroundText = stateArr[4] == "2" ? "新进入封闭环境" : aroundText;
                    aroundText = stateArr[4] == "3" ? "长期处于全封闭环境" : aroundText;
                    html.push("<b>环境状态:</b>" + aroundText + "<br />");
                }
                if (stateArr[3] != "") {
                    html.push("<b>版本信息:</b>" + stateArr[3].replace("|", ":") + "<br />");
                }
                if (stateArr[1] != "") {
                    html.push("<b>电话卡ICCID:</b>" + stateArr[1] + "<br />");
                }
                if (stateArr[2] != "") {
                    var aroundStatus = stateArr[2].split("|");
                    html.push("<b>设置信息:</b>" + "上传频率:" + aroundStatus[0] + "秒/1次," + "定位模式:" + (aroundStatus[1] == "1" ? "GPS+基站" : "基站") + "<br />" + "采集频率:" + aroundStatus[2] + "," + "退出时间:" + aroundStatus[3] + "," + "定点时间:" + aroundStatus[4] + ":" + aroundStatus[5] + "<br />");
                }
            }
        }

    } else if (data.model == 162) {
        var carState = data.dataContext;
        var carStateStr = ""; 
        if (carState != "") {
            var carStateArr = carState.split(',');
            if (carStateArr.length >= 2) {
                if (carStateArr[0] != "") {
                    if (carStateArr[0] == "0") {
                        carStateStr = "正常工作模式,";
                    } else if (carStateArr[0] == "1") {
                        carStateStr = "一般休眠模式,";
                    } else if (carStateArr[0] == "2") {
                        carStateStr = "深度休眠模式,";
                    } else if (carStateArr[0] == "3") {
                        carStateStr = "定时开关机模式,";
                    }
                } 
                if (carStateArr[1] != "") {
                    if (carStateArr[1] == "0") {
                        carStateStr += "正常";
                    } else if (carStateArr[1] == "1") {
                        carStateStr += "休眠";
                    }
                }
                if (carStateArr[2] != "") {
                    carStateStr += "," + yiwen201407.elec + ":" + carStateArr[2] + "%";
                }
            }
        }
        if (carStateStr != "") {
            html.push("<b>" + '' + "</b>" + carStateStr + "<br />");
        }
    } 
    html.push("<b>" + allPage.positionTime + ":</b>" + data.deviceUtcDate + "<br />");
    var timeStr = minuteToStr(data.stopTimeMinute);
    if (data.isStop == 1) {
        html.push("<b>" + allPage.stopTime + ":</b>" + timeStr + "<br />");
    } else {
        var courseName = GetCoureName(data.course);
        html.push("<b>" + allPage.drection + ":</b>" + courseName + "<br />");
        html.push("<b>" + allPage.speed + ":</b>" + data.speed + allPage.speedKM + "<br />");
    }
    var gpslbs = data.dataType == "2" ? "LBS" : "GPS";
    gpslbs = data.dataType == "3" ? "WIFI" : gpslbs;
    html.push("<b>" + allPage.positionType + ":</b>" + gpslbs + "<br />");
    html.push('<span>');
    html.push('<a href="javascript:void(0);" onclick="openPage(\'Tracking.aspx\',' + UserId + ',\'' + data.id + '\')" >' + allPage.tracking + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);"  onclick="openPage(\'Playback.aspx\',' + UserId + ',\'' + data.id + '\')">' + allPage.playback + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);"  onclick="openPage(\'Geofences.aspx\',' + UserId + ',\'' + data.id + '\')">' + geofencesPage.geofence + '</a>&nbsp;');
    html.push('<a href="javascript:void(0);"  onclick="clkShowMoreMenu(\'' + data.id + '\',' + data.model + ',\'' + data.name + '\',\'' + data.sn + '\');">' + allPage.more + '▼</a>');
    html.push('</span>');
    html.push("<br />&nbsp;&nbsp;");
    return html.join('');
}

function openPage(url, userid, deviceid) {

    var p = IDEncryption(deviceid);
    if (loginType == 1) {
        var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;
    } else {
        var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&loginType=1&p=" + p;
    }
    window.open(openUrl);
}

var intervalDeviceMore = null;
function clkShowMoreMenu(deviceid, model, name, sn) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'ProductUpdate.aspx\',\'' + deviceid + '\');">' + mapPage.divicesInfo + '</a></div>');


    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:parent.showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a style="text-decoration:none;" href="javascript:void(0);" onclick="parent.showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');


    html.push('<div style="height:6px;"></div>');
    html.push("</div>");
    $("#divLeftMenuContext").html(html.join(''));
    var menuHeight = $("#divLeftMenu").height();
    var top = $(this).height() - mousetop;
    var marginTop = 5;
    if (top > menuHeight) {
        marginTop = 5;
    } else {
        marginTop = menuHeight;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    $(".showdivs").mouseover(function () {
        $(".showitems").eq($(".showdivs").index(this)).show();
    }).mouseleave(function () {
        $(".showitems").eq($(".showdivs").index(this)).hide();
    });
}

function hideMoreItems() {//隐藏更多功能选项

    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    intervalDeviceMore = setInterval(function () {
        document.getElementById("divLeftMenu").style.display = "none";
        clearInterval(intervalDeviceMore);
    }, 1000)

}

function getDeviceStatus(s) {
    var status = "";
    if (s == "LoggedOff") {
        status = allPage.status1;
    } else if (s == "Move") {
        status = allPage.moving;
    } else if (s == "Stop") {
        status = allPage.stopCar;

    } else if (s == "Offline") {
        status = allPage.offline;
    } else if (s == "Arrears") {
        status = allPage.arrears;
    }
    return status;
}


//显示POI
var poiJson = null;
function showPOIMap(uid) {
    poiJson = null;
    var m = $('#selMap').val();
    if (m == "Baidu") {
        $.ajax({
            type: "post",
            url: "Ajax/GeofenceAjax.asmx/GetPOI",
            contentType: "application/json",
            data: "{UserID:" + uid + ",TimeZone:'" + timeZone + "'}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result.d != "" && result.d != "{}") {
                    var json = eval("(" + result.d + ")");
                    poiJson = json;
                    showPOIInMap();
                }
            }
        });
    }
}


//分钟转换到天小时分钟格式
function minuteToStr(minute) {

    var time = "";

    var day = parseInt(minute / 60 / 24);
    var hour = parseInt((minute / 60) - (day * 24));
    var minu = (minute) - (day * 24 * 60) - (hour * 60);
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

function minuteToStrByMenu(minute) {

    var time = "";

    var day = parseInt(minute / 60 / 24);
    var hour = parseInt((minute / 60) - (day * 24));
    var minu = (minute) - (day * 24 * 60) - (hour * 60);
    if (day > 0) {
        time = day + allPage.day;
    } else if (hour > 0) {
        time = hour + allPage.hour;
    } else {
        time = minu + allPage.minute;
    }

    return time;

}

function GetAddress(id) {
    GetAddressByMap(id);
}

//判断长度,一个中文为2
function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
            sum = sum + 1;
        else
            sum = sum + 2;
    }
    return sum;
}


function initPolygon() {
    clearGeoMap();
    pointsGeo.length = 0;
    pointsStr.length = 0;
    markersGeo.length = 0;
    isShowPoly = true;
    isClkMarker = false;
    $("#divGeofenceDevice").show();

}

function closePolygon() {
    clearGeoMap();
    pointsGeo.length = 0;
    pointsStr.length = 0;
    markersGeo.length = 0;
    isShowPoly = false;
    $('#divGeofenceDevice').hide();
}

function searchGeofenceDevice() {
    var startTime = $("#txtStartDate").val();
    var endTime = $("#txtEndDate").val();
    var diff = DateDiff(startTime, endTime);
    if (diff <= 0) {
        alert("开始时间大于结束时间!");
        return;
    } else if (diff > 240) {
        alert("区域查车搜索范围不能大于4小时!");
        return;
    }

    if (pointsStr.length > 2) {
        var latLngs = pointsStr.join('|');
        $.ajax({
            type: "post",
            url: "Ajax/GeofenceAjax.asmx/GetDeviceByZone",
            contentType: "application/json",
            data: "{UserID:" + UserId + ",LatLngs:'" + latLngs + "',StartTime:'" + startTime + "',EndTime:'" + endTime + "',TimeZone:'" + timeZone + "'}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result.d != "" && result.d != "{}") {
                    var json = eval("(" + result.d + ")");
                    var html = [];

                    html.push('<table  width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
                    html.push('<thead>');
                    html.push('<tr height="25" style="background:#F5F5F5;">');
                    html.push('<th>' + "设备名称" + '</th>');
                    html.push('<th>' + "进入时间" + '</th>');
                    html.push('<th>' + "离开时间" + '</th>');
                    html.push('<th>' + "" + '</th>');
                    html.push('</tr></thead>');
                
                    for (var i = 0; i < json.arr.length; i++) {
                        html.push('<tr height="25">');
                        html.push('<td align="center">' + json.arr[i].name + '</td>');
                        html.push('<td align="center">' + json.arr[i].inTime + '</td>');
                        html.push('<td align="center">' + json.arr[i].outTime + '</td>');

                        var str = '<a href="javascript:void(0);" onclick="openPage(\'Playback.aspx\',' + UserId + ',' + json.arr[i].id + ')">' + "历史轨迹" + '</a>';

                        html.push('<td align="center">' + str + '</td>');
                        html.push('</tr>');
                    }
                    html.push('</table>');
                    $("#divGeofenceTable").html(html.join(''));
                }
            }
        });
    } else {
        alert("请绘制搜索区域!");
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

var pageCount = 10;
var isShowDeviceList = false;
var UserId = 0;  //当前点击的用户ID,非登陆用户ID
var language = "zh-cn";
var loginName = "";
var loginType = 0;
var loginDeviceID = 0;
var selShowDeviceIDs = [];

$(document).ready(function () {
    setInitLanguage();
    UserId = $("#hidUserID").val();
    language = $("#hidLanguage").val();
    loginName = $("#hidLoginName").val();
    loginType = parseInt($("#hidLoginType").val());
    loginDeviceID = $("#hidDeviceID").val();
    if (loginType == 1) {
        $("#spanUserName").html($("#hidUserName").val());
    } else {
        $("#spanUserName").html($("#hidDeviceName").val());
    }
    $("#divDevicesList").easydrag();
    $("#divDevicesList").setHandler("divDevicesListHead");
    $("#divIframe").easydrag();
    $("#divIframe").setHandler("divIframeTitle");
    if (isShowDeviceList) {
        showDevicesListDiv(1);
    }
    init();
    $("#divLeftMenu").bind("mouseleave", hideMoreItems);
    //$("#divLeftMenuGroup").bind("mouseleave", hideGroupItems);
    var src = $("#hidIframeSrc").val();
    $("#ifmMap").attr("src", src);

    syncSize();

    if (loginType == 1) {
        ajaxLoadingTree();
    }

});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 8;
    var w = $(this).width() - 20;
    $("#divLeft").css("height", h + "px");
    $("#ifmMap").css("height", h + "px");
    var mapWidth = w - 255;
    $("#ifmMap").css("width", mapWidth + "px");
    var w2 = $(this).width();
    $("#divInputPass").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSOSPhone").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divInterval").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divInitDistance").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divCellPhone").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSendTxt").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divSetSqPhone").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divCommandList").css("marginLeft", (w2 - 800) / 2 + "px");
    $("#divSetDevice2SMS").css("marginLeft", (w2 - 310) / 2 + "px");
    $("#divDeviceSet").css("marginLeft", (w2 - 510) / 2 + "px");
    $("#divUserTree").css("marginLeft", (w2 - 260) + "px");
    $("#divUserTreeMenu").css("marginLeft", (w2 - 30) + "px");
    var h2 = $(this).height() - 60 - 40;
    $("#divDevicesTable").css("height", h2 + "px");

    var h3 = $(this).height() - 40;
    $("#divDevicesList").css("top", h3 + "px");
}

function showDevicesListDiv(t) {
    if (t == 0) {
        $("#divDevicesListInfo").css("display", "none");
        $("#divDevicesList").css("height", "25px");
        var h = $(this).height() - 40;
        $("#divDevicesList").animate({ left: 0 + "px", top: h + "px", width: 260 + "px" }, 300);
    } else {
        $("#divDevicesListInfo").css("display", "block");
        //$("#divDevicesListInfo").css("width", "1200px");
        $("#divDevicesList").css("height", "250px");
        var h = $(this).height() - 150;
        var w = $(this).width() - 1000;
        $("#divDevicesList").animate({ left: (w / 2) + "px", top: (h) + "px", width: 1000 + "px" }, 300);


    }
}

function setInitLanguage() {
    $("#btnSearch").val(allPage.search);
    $("#sendBtn").html(" " + allPage.confirm + " ");
    $("#closeBtn").html(" " + allPage.cancel + " ");
    $("#btnAddGroup").val(allPage.confirm);

    $("#txtSearchInput").val(mapPage.searchInput);
    $("#lbldivCommandListTitle").html(mapPage.checkCommandTitle);

    $("#btnSendSOSPhone").html(" " + allPage.confirm + " ");
    $("#btnCloseSOSPhone").html(" " + allPage.cancel + " ");

    $("#btnCellPhone").html(" " + allPage.confirm + " ");
    $("#btnCloseCellPhone").html(" " + allPage.cancel + " ");

    $("#btnInterval").html(" " + allPage.confirm + " ");
    $("#btnCloseInterval").html(" " + allPage.cancel + " ");

    $("#btnSendTxt").html(" " + allPage.confirm + " ");
    $("#btnCloseSendTxt").html(" " + allPage.cancel + " ");

    $("#btnSendSq").html(" " + allPage.confirm + " ");
    $("#btnCloseSendSq").html(" " + allPage.cancel + " ");

    $("#btnSendD2SMS").html(" " + allPage.confirm + " ");
    $("#btnCloseSendD2SMS").html(" " + allPage.cancel + " ");

    $("#btnSendDistance").html(" " + allPage.confirm + " ");
    $("#btnCloseSendDistance").html(" " + allPage.cancel + " ");

    $("#btnDeviceSet").html(" " + allPage.confirm + " ");
    $("#btnCloseDeviceSet").html(" " + allPage.cancel + " ");

}


function ajaxLoadingTree() {
    var uid = $("#hidUserID").val();

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        async: {
            enable: true,
            url: "ajax/UserTreeAjax.aspx",
            autoParam: ["id"],
            otherParam: { "staticID": uid }
        },
        callback: {
            onClick: onClick,
            onAsyncSuccess: onAsyncSuccess1
        }

    };

    $.fn.zTree.init($("#uiTreeView"), setting);
}

function onAsyncSuccess1(event, treeId, treeNode, msg) {
    $("#divLoading").hide();
}


function showDeviceList(a) {

    $("#divLeftMenu").hide();
    changeDevicesList(a);

}

var clkTabDeviceTab = "all";
function changeDevicesList(s) {

    //aAll
    //aOnline
    //aOffline
    var type = "all";
    if (s == "aAll") {

    } else if (s == "aOnline") {
        type = "online";
    } else {
        type = "offline";
    }
    ifmMap.window.HideShowPopumarker();
    showDevicesTable(type);
    clkTabDeviceTab = type;
}



var isFirst = true;
var allDevices = null;
var allGroups = [];
var allGroupsDivIDs = [];
var isSetMapCenter = true;

function onClick(event, treeId, treeNode, clickFlag) {

    $("#divLeftMenu").hide();
    initUserDevices();
    openDeviceDivID = null;
    UserId = treeNode.id;
    ifmMap.window.clearSecond();
    ifmMap.window.HidePopumarker();
    getGroup();
}

function initUserDevices() {
    allDevices = null;
    allGroups.length = 0;
    allGroupsDivIDs.length = 0;
    $("#divDevicesTable").html("");
    $("#divLeftMenuGroup").html("");
}
var initIsSelDevice = true;
function initGetDevices() {
    isFirst = true;
    initIsSelDevice = true;
    isSetMapCenter = true;
    selShowDeviceIDs.length = 0;
    ajaxGetDevices();
    if (loginType == 1) {
        //获取POI
        ifmMap.window.showPOIMap(UserId);
    }
}

function ajaxGetDevices() {
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "devices/getDevices",
        contentType: "application/json",
        data: "",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            //alert(result.d + "  " );
            if (true) {
                //alert(result.d);
                var json = result.d;
                //var json = eval("(" + "{devices:[{id:119742,name:\"GX02A-78546\",sn:\"868120129078546\",model:\"11\",modelName:\"GX02A\",state:-1,speedLimit:\"0.00\",icon:\"1\",carNum:\"\",locationID:\"1\",groupID:-1,serverUtcDate:\"2016-05-27 09:54:14\",deviceUtcDate:\"2016-05-27 09:54:14\",baiduLat:\"31.99004\",baiduLng:\"118.79200\",ofl:\"0\",speed:\"0.00\",course:\"66\",dataType:\"1\",dataContext:\"\",distance:\"16047.5050\",isStop:1,stopTimeMinute:2026,carStatus:\"\",status:\"Stop\"}]}" + ")");
                if (allDevices) {
                    for (var i = 0; i < json.devices.length; i++) {
                        var isCz = false;
                        for (var j = 0; j < allDevices.devices.length; j++) {
                            if (json.devices[i].id == allDevices.devices[j].id) {
                                allDevices.devices[j].locationID = json.devices[i].locationID;
                                allDevices.devices[j].groupID = json.devices[i].groupID;
                                allDevices.devices[j].serverUtcDate = json.devices[i].serverUtcDate;
                                allDevices.devices[j].deviceUtcDate = json.devices[i].deviceUtcDate;
                                allDevices.devices[j].stopTimeMinute = json.devices[i].stopTimeMinute;
                                allDevices.devices[j].latitude = json.devices[i].latitude;
                                allDevices.devices[j].longitude = json.devices[i].longitude;
                                allDevices.devices[j].baiduLat = json.devices[i].baiduLat;
                                allDevices.devices[j].baiduLng = json.devices[i].baiduLng;
                                allDevices.devices[j].oLat = json.devices[i].oLat;
                                allDevices.devices[j].oLng = json.devices[i].oLng;
                                allDevices.devices[j].speed = json.devices[i].speed;
                                allDevices.devices[j].course = json.devices[i].course;
                                allDevices.devices[j].dataType = json.devices[i].dataType;
                                allDevices.devices[j].dataContext = json.devices[i].dataContext;
                                //allDevices.devices[j].SOSTime = json.devices[i].SOSTime;
                                //allDevices.devices[j].exceptionTime = json.devices[i].exceptionTime;
                                allDevices.devices[j].distance = json.devices[i].distance;
                                allDevices.devices[j].isStop = json.devices[i].isStop;
                                allDevices.devices[j].status = json.devices[i].status;
                                allDevices.devices[j].ofl = json.devices[i].ofl;
                                allDevices.devices[j].carStatus = json.devices[i].carStatus;
                                isCz = true;
                                break;
                            }

                        }

                    }
                } else {
                    allDevices = json;
                }
                isFirst = false;

                showDevicesTable(clkTabDeviceTab);
            }
        }
    });
}

var showMoreDivDeviceArr = [];
var openDeviceDivID = null;
var lastChangeTabState = null;
var firstDeviceID = 0;
var showMarkerIndex = 0;
function showDevicesTable(s) {
    firstDeviceID = 0;
    showMarkerIndex = 0;
    if (!ifmMap.window.isFortime) {
        ifmMap.window.forTimeMethod(allDevices.devices.length);
        ifmMap.window.isFortime = true;
    }
    if (lastChangeTabState) {
        if (lastChangeTabState != s) {
            ifmMap.window.clearMap();
        }
    }
    var deviceListScrollTop = document.getElementById("divDevicesTable").scrollTop;
    var deviceDevicesListInfoScrollTop = document.getElementById("divDevicesListInfo").scrollTop;
    lastChangeTabState = s;
    clearGroupDivTxt();
    //$("#divDevicesListInfo").html("");
    var online = 0;
    var devicesListHtml = [];

    devicesListHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="2" class="tab">');
    devicesListHtml.push('<thead>');
    devicesListHtml.push('<tr height="25" style="background:#F5F5F5;">');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.deviceName + '</th>');
    //devicesListHtml.push('<th style="text-align:center;">' + allPage.imeiNo + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.modelName + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.lat + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.lng + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.speed + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.drection + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.allDistance + "(" + allPage.km + ')</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.state + '</th>');
    devicesListHtml.push('<th style="text-align:center;">' + allPage.positionTime + '</th>');
    devicesListHtml.push('</tr></thead>');

    showMoreDivDeviceArr = [];
    var loginUserID = $("#hidUserID").val();
    var isExistPopumarker = false;
    for (var i = 0; i < allDevices.devices.length; i++) {
        var html = [];
        var carStatus = "";
        var color = "#B7B7B7";
        var speed = "";
        var isShow = false;
        var isShowMore = true;
        if (s == "all") {
            isShow = true;
        }
        if (allDevices.devices[i].status == "LoggedOff") {
            carStatus = allPage.status1;
            if (s == "offline") {
                isShow = true;
            }
            isShowMore = false;
        } else if (allDevices.devices[i].status == "Move") {
            carStatus = allPage.moving;
            color = "#00CC33";
            speed = allDevices.devices[i].speed + '&nbsp;&nbsp;';
            if (s == "online") {
                isShow = true;
            }
        } else if (allDevices.devices[i].status == "Stop") {
            carStatus = allPage.stopCar;
            color = "#00CC33";
            if (s == "online") {
                isShow = true;
            }

        } else if (allDevices.devices[i].status == "Offline") {
            carStatus = allPage.offline;
            var offlineMinute = parseInt(allDevices.devices[i].ofl);
            if (offlineMinute > 86400) {
                carStatus += ">60" + moneyPage.day;
            } else {
                carStatus += ifmMap.window.minuteToStrByMenu(offlineMinute);
            }
            if (s == "offline") {
                isShow = true;
            }
        } else if (allDevices.devices[i].status == "Arrears") {
            carStatus = allPage.arrears;
            if (s == "offline") {
                isShow = true;
            }
            isShowMore = false;
        }

        var iconImg = 'u_online.gif';
        if (allDevices.devices[i].status == "LoggedOff" || allDevices.devices[i].status == "Offline" || allDevices.devices[i].status == "Arrears") {
            iconImg = 'u_offline.gif';
        } else {
            online++;
        }
        if (allDevices.devices[i] == null || allDevices.devices[i] == undefined) {
            isShow = false;
        }
        if (isShow) {
            if (ifmMap.window.showPopupmarkerID == allDevices.devices[i].id) {
                isExistPopumarker = true;
            }
            if (allDevices.devices[i].status != "LoggedOff" && allDevices.devices[i].status != "Arrears") {
                if (showMarkerIndex < 50) {
                    ifmMap.window.addMarker(allDevices.devices[i]);
                    showMarkerIndex++;
                } else {
                    for (var m = 0; m < selShowDeviceIDs.length; m++) {
                        if (selShowDeviceIDs[m] == allDevices.devices[i].id) {
                            ifmMap.window.addMarker(allDevices.devices[i]);
                            showMarkerIndex++;
                        }
                    }
                }
            }
            var idTab = "divTabDevice" + allDevices.devices[i].id;
            var deviceListTRID = "tabTRDevice" + allDevices.devices[i].id;
            var display = "none";
            var divClass = "";
            if (allDevices.devices[i].id == openDeviceDivID) {
                display = "block";
                divClass = "divDeviceTab";
                //color = "#000000";
            }

            html.push('<div id="' + idTab + '" class="' + divClass + '" style="clear:left;width:243px; margin-left:10px; cursor:pointer;  color:' + color + ';line-height:135%;" ');
            if (isShowMore) {
                html.push('onclick="showMoreDivDevice(\'' + allDevices.devices[i].id + '\',\'' + carStatus + '\')">');
                devicesListHtml.push('<tr id="' + deviceListTRID + '" class="' + divClass + '" onclick="showMoreDivDevice(\'' + allDevices.devices[i].id + '\',\'' + carStatus + '\')" style="cursor:pointer;">');
            } else {
                html.push('>');
                devicesListHtml.push('<tr id="' + deviceListTRID + '">');
            }
            //html.push('<img src="icons/' + iconImg + '" width="16" height="16" style="float:left;" />');

            var deviceName = allDevices.devices[i].name;
            /*
            var nameLength = fucCheckLength(allDevices.devices[i].name);
            if (nameLength > 8) {
            var endShowName = "";
            var nameSize = getHtmlSize(deviceName);
            if (nameSize.width > 105) {
            for (var sindex = 0; sindex < deviceName.length; sindex++) {
            var names = deviceName.substring(0, sindex + 1);
            var nameSize2 = getHtmlSize(names);
            if (nameSize2.width > 100) {
            endShowName = names;
            break;
            }
            }
            deviceName = endShowName + "...";
            }
            }*/

            html.push('<div style="width:120px; height:20px; float:left;">' + deviceName + '</div>');
            html.push('<div style="float:left;">' + speed + carStatus + '</div>');
            var id = "divTabDeviceMore" + allDevices.devices[i].id;
            showMoreDivDeviceArr.push(allDevices.devices[i].id);
            if (isShowMore) {
                html.push('<div id="' + id + '" style="clear:left;color:' + color + '; margin-left:80px; display:' + display + ';">' + '<a href="javascript:void(0);" onclick="openPage(\'Tracking\',' + loginUserID + ',\'' + allDevices.devices[i].id + '\')" >' + allPage.tracking + '</a>  <a href="javascript:void(0);"  onclick="openPage(\'Playback\',' + loginUserID + ',\'' + allDevices.devices[i].id + '\')">' + allPage.playback + '</a>  <a href="javascript:void(0);" onclick="clkShowMoreMenu(' + loginUserID + ',\'' + allDevices.devices[i].id + '\',' + allDevices.devices[i].model + ',\'' + allDevices.devices[i].name + '\',\'' + allDevices.devices[i].sn + '\');">' + allPage.more + '▼</a>' + '</div>');
            }
            html.push('</div>');

            var groupDivID = "divGroup-0";
            var spanGroupID = "spanGroup-0";
            if (allDevices.devices[i].groupID > 0 && loginType == 1) {
                groupDivID = "divGroup-" + allDevices.devices[i].groupID;
                spanGroupID = "spanGroup-" + allDevices.devices[i].groupID;
            }
            $("#" + groupDivID).append(html.join(''));
            //数量

            var count = parseInt($("#" + spanGroupID).html());
            count++;
            $("#" + spanGroupID).html(count);

            devicesListHtml.push('<td class="tc">&nbsp;' + allDevices.devices[i].name + '</td>');
            //devicesListHtml.push('<td class="tc">' + allDevices.devices[i].sn + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].modelName + '</td>');
            var oLat = allDevices.devices[i].latitude;
            var oLng = allDevices.devices[i].longitude;
            if (oLat == "" || oLat == undefined) {
                oLat = allDevices.devices[i].oLat;
                oLng = allDevices.devices[i].oLng;
            }
            if (oLat == "" || oLat == undefined) {
                oLat = allDevices.devices[i].baiduLat;
                oLng = allDevices.devices[i].baiduLng;
            }
            devicesListHtml.push('<td class="tc">' + oLat + '</td>');
            devicesListHtml.push('<td class="tc">' + oLng + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].speed + '</td>');
            var courseName = GetCoureName(allDevices.devices[i].course);
            devicesListHtml.push('<td class="tc">' + courseName + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].distance + '</td>');
            var statusStr = "";
            if (allDevices.devices[i].model == 25 || allDevices.devices[i].model == 80 || allDevices.devices[i].model == 51 || allDevices.devices[i].model == 26 || allDevices.devices[i].model == 50 || allDevices.devices[i].model == 30 || allDevices.devices[i].model == 90) {
                //GT06,GT06C,AW02
                var accStr = GetAccStr(allDevices.devices[i].dataContext);
                statusStr = allPage.accStr + ":" + accStr;
            } else if (allDevices.devices[i].model == 71 || allDevices.devices[i].model == 85 || allDevices.devices[i].model == 86 || allDevices.devices[i].model == 87 || allDevices.devices[i].model == 72) {
                //天琴 1-0-0  ACC开1/关0-设防1/撤防0-车门开1/关0
                var carState = allDevices.devices[i].dataContext;
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
                statusStr = carStateStr;
            } else if (allDevices.devices[i].model == 132) {
                //天琴电量协议
                var carState = allDevices.devices[i].dataContext;
                var carStateStr = "";
                if (carState != "") {
                    var carStateArr = carState.split('-');
                    if (carStateArr.length >= 5) {
                        if (carStateArr[4] != "") {
                            carStateStr = yiwen201407.elec + ":" + carStateArr[4] + "%";
                        }
                    }
                }
                statusStr = carStateStr;
            } else if (allDevices.devices[i].model == 500) {
                //D18
                var carState = allDevices.devices[i].dataContext;
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
                    }
                }
                statusStr = carStateStr;
            } else if (allDevices.devices[i].model == 102) {
                //天琴协议
                var carState = allDevices.devices[i].dataContext;
                var carStateStr = "";
                if (carState != "") {
                    var carStateArr = carState.split('-');
                    if (carStateArr.length >= 2) {
                        if (carStateArr[0] != "") {
                            carStateStr += (carStateArr[0] == "1" ? yiwen201312.fortify : yiwen201312.dismiss);
                        }
                        if (carStateArr[1] != "") {
                            carStateStr += "," + yiwen201407.elec + ":" + carStateArr[1] + "%";
                        }
                    }
                }
                statusStr = carStateStr;
            } else if (allDevices.devices[i].model == 12 || allDevices.devices[i].model == 18 || allDevices.devices[i].model == 13 || allDevices.devices[i].model == 14 || allDevices.devices[i].model == 21 || allDevices.devices[i].model == 15 || allDevices.devices[i].model == 23 || allDevices.devices[i].model == 27 || allDevices.devices[i].model == 41 || allDevices.devices[i].model == 43 || allDevices.devices[i].model == 63 || allDevices.devices[i].model == 28 || allDevices.devices[i].model == 29 || allDevices.devices[i].model == 68 || allDevices.devices[i].model == 66 || allDevices.devices[i].model == 69) {
                var carState = allDevices.devices[i].dataContext;
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
                statusStr = carStateStr;
            } else if (allDevices.devices[i].model == 160) {
                var carState = allDevices.devices[i].dataContext;
                var carStateStr = "";
                if (carState != "") {
                    var carStateArr = carState.split(',');
                    if (carStateArr.length == 3) {
                        if (carStateArr[1] != "") {
                            carStateStr += yiwen201407.elec + ":" + carStateArr[1] + "%";
                        }
                    }
                }
                statusStr = carStateStr;
            }
            devicesListHtml.push('<td class="tc">&nbsp;' + statusStr + '</td>');
            devicesListHtml.push('<td class="tc">' + allDevices.devices[i].deviceUtcDate + '</td');
            devicesListHtml.push('</tr>');
        }
    }

    //切换时,显示分组
    if (ifmMap.window.showPopupmarkerID > 0) {
        ifmMap.window.ShowDeviceInfo(ifmMap.window.showPopupmarkerID);
    }
    document.getElementById("divDevicesTable").scrollTop = deviceListScrollTop;
    //$("#divDevicesTable").html(html.join(''));
    devicesListHtml.push('</table>');
    $("#divDevicesListInfo").html(devicesListHtml.join(''));
    document.getElementById("divDevicesListInfo").scrollTop = deviceDevicesListInfoScrollTop;
    $("#spanDevicesAll").html(allDevices.devices.length);
    $("#spanDevicesOnline").html(online);
    $("#spanDevicesOffline").html((allDevices.devices.length - online));

    if (firstDeviceID > 0) {
        var manyDevice = allDevices.devices.length > 1 ? "true" : "false"; 
        showMoreDivDevice(firstDeviceID, manyDevice);
    } else {
        if (initIsSelDevice) {
            ifmMap.document.getElementById("divMarkerAddress").innerHTML = "";
        }
        if (openDeviceDivID) {
            ifmMap.window.GetAddress(openDeviceDivID);
        }
    }
}

function getHtmlSize(html) {
    var size = {};
    var span = document.getElementById("spanMapPopupContentSize");
    span.innerHTML = html;
    span.style.display = '';
    size.width = span.offsetWidth;
    size.height = span.offsetHeight;
    span.style.display = 'none';
    var ret, lines = html.split(/\n/i), totalSize = eval("(" + "{width:1,height: 1}" + ")");

    for (var i = 0; i < lines.length; i++) {
        totalSize.width += size.width;
        totalSize.height += size.height;
    }
    return totalSize;
};



function showMoreDivDevice(id, s) {
    if (openDeviceDivID != id) {
        $("#divLeftMenu").hide();
        
        if (ifmMap.window.MrkArr[id] == undefined) {
            for (var j = 0; j < allDevices.devices.length; j++) {
                if (allDevices.devices[j].id == id) {
                    ifmMap.window.addMarker(allDevices.devices[j]);
                    selShowDeviceIDs.push(id);
                    break;
                }
            }
        }

        var lastidMore = "divTabDeviceMore" + openDeviceDivID;
        var lastidTab = "divTabDevice" + openDeviceDivID;
        $("#" + lastidMore).hide();
        $("#" + lastidTab).removeClass("divDeviceTab");
        var lastDeviceListTRID = "tabTRDevice" + openDeviceDivID;
        $("#" + lastDeviceListTRID).removeClass("divDeviceTab");
        if (s == "true") {

        } else {
            ifmMap.window.setMapCenter(id);
        } 
        var idMore = "divTabDeviceMore" + id;
        var idTab = "divTabDevice" + id;
        var deviceListTRID = "tabTRDevice" + id;
        $("#" + idMore).show();
        $("#" + idTab).addClass("divDeviceTab");
        $("#" + deviceListTRID).addClass("divDeviceTab");
        ifmMap.window.ShowDeviceInfo(id); //显示信息框
        ifmMap.window.GetAddress(id);
    } else {
        ifmMap.window.setMapCenter(id);
        ifmMap.window.GetAddress(id);
    }
    openDeviceDivID = id;
}
//iframemap页面切换地图后,左边栏取消选中设备
function removeShowMoreDivDevice() {
    openDeviceDivID = null;
    $("#divLeftMenu").hide();

    var lastidMore = "divTabDeviceMore" + openDeviceDivID;
    var lastidTab = "divTabDevice" + openDeviceDivID;
    var deviceListTRID = "tabTRDevice" + openDeviceDivID;
    $("#" + lastidMore).hide();
    $("#" + lastidTab).removeClass("divDeviceTab");
    $("#" + deviceListTRID).removeClass("divDeviceTab");
}


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



var intervalDeviceMore = null;
var clkGroupItemDeviceID = 0; //用于设备分组
function clkShowMoreMenu(userid, deviceid, model, name, sn) {
    if (intervalDeviceMore) clearInterval(intervalDeviceMore);
    clkGroupItemDeviceID = deviceid;
    var html = [];
    html.push('<div style="margin-top:5px;">');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'ProductUpdate.aspx\',\'' + deviceid + '\');">' + mapPage.divicesInfo + '</a></div>');

    html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="openPage(\'Geofences\',' + UserId + ',\'' + deviceid + '\')" target="_blank">' + mapPage.geofence + '</a></div>');

    //html.push('<div style="padding-top:2px;" class="showdivs" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);">' + mapPage.moveToGroup + '</a>');
    html.push('<div id="divLeftMenuGroup" class="showitems"></div>');
    html.push('</div>');

    model = loginName == "888" ? 1000 : model;
    //GT06,AW02,GT07,GT06N 断油电,恢复油电,checklocation
    if (model == 12 || model == 18 || model == 15 || model == 17 || model == 26 || model == 89 || model == 41 || model == 43 || model == 13 || model == 14 || model == 21 || model == 62 || model == 63 || model == 64 || model == 65 || model == 66 || model == 67 || model == 28 || model == 29 || model == 68 || model == 69) {
        if (model != 13 && model != 14 && model != 67 && model != 29) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'DYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'HFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        }
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CheckLocation\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'KKSSTATUS\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + yiwen201407.deviceStatus + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'KKSRESET\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + yiwen201407.restart + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDivIframe(\'CarCommand.aspx\',' + deviceid + ');">' + yiwen201407.moreCommand + '</a></div>');

    } else if (model == 25) {
        //GT06C
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001ON\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'C001OFF\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Q001\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
    } else if (model == 50 || model == 83) {
        //宏远
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV010\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'AV011\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
    } else if (model == 51 || model == 52) {
        //TK103
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41141\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41140\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41201\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceFortify + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'41200\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceDismiss + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSQPassword(' + deviceid + ',\'4103\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "授权号码" + '</a></div>');
    } else if (model == 60 || model == 61 || model == 100) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSOSPassword(' + deviceid + ',\'BP11\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "SOS号码" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCellPhone(' + deviceid + ',\'BP05\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "亲情号码" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'BP07\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "上传间隔" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendTxt(' + deviceid + ',\'BP13\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "下发文字" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP020\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程设防" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP021\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程撤防" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP030\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程断油" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP040\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程恢复油" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP120\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听开启" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP121\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "监听关闭" + '</a></div>');
    } else if (model == 80) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP030\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程断油" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'BP040\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程恢复油" + '</a></div>');
    } else if (model == 71 || model == 85 || model == 86 || model == 87 || model == 72 || model == 102 || model == 73) {
        if (model != 102) {
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S201\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
            html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S200\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        } 
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'SCF0\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceFortify + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'SCF1\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.deviceDismiss + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'D1\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + yiwen201312.uploadInterval + '</a></div>');
    } else if (model == 43 || model == 44 || model == 45 || model == 46 || model == 47) {
        //明达
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDDYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'MDHFYD\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
    } else if (model == 30) {
        //博实杰
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'39\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'38\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
    } else if (model == 36) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceSet(' + deviceid + ',\'37\',\'' + name + '\',\'' + sn + '\',' + model + ')" >设备远程设置</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showSendTxt(' + deviceid + ',\'36\',\'' + name + '\',\'' + sn + '\',' + model + ')" >发送文本信息</a></div>');
    } else if (model == 90) {
        //部标
        var loginUserID = $("#hidUserID").val();
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'PHOTO\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "设备拍照" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Lock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门加锁" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'Unlock\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "车门解锁" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="openPage(\'DeviceImgs.aspx\',' + loginUserID + ',' + deviceid + ')" >' + "查看照片" + '</a></div>');
    } else if (model == 53) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S12\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程设防" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S13\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "远程撤防" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S150\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'S151\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
    } else if (model == 34) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CWT70\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "状态查询" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CWT71\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "版本查询" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CWT1000\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.cutOffPetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CWT1001\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.restorePetrol + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showPassword(' + deviceid + ',\'CWT2\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + mapPage.checkLocation + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceInterval(' + deviceid + ',\'CWT5\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "上传间隔" + '</a></div>');
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDeviceDistance(' + deviceid + ',\'CWT103\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + "设置里程" + '</a></div>');
    } else if (model == 130 || model == 120 || model == 500 || model == 159 || model == 162 || model == 140 || model == 160 || model == 170 || model == 163) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showDivIframe(\'CarCommand.aspx\',' + deviceid + ');">' + yiwen201407.moreCommand + '</a></div>');
    }

    if ((model >= 10 && model <= 22) || model == 88 || model == 89 || model == 40 || model == 41 || model == 42 || model == 43 || (model >= 62 && model <= 68) || model == 27 || model == 28 || model == 29) {
        //康凯斯协议设备
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showD2SMS(' + deviceid + ',\'D2SMS\',\'' + name + '\',\'' + sn + '\',' + model + ')" >' + '设备发送短信' + '</a></div>');
    }
    //html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:showCommandList(' + deviceid + ',\'' + sn + '\',1);" >' + mapPage.checkCommand + '</a></div>');
    //html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="showDivIframe(\'DownloadLocation.aspx\',' + deviceid + ');">' + mapPage.downloadLocation + '</a></div>');
    if (language == "zh-cn" && loginType == 1) {
        html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="Geofences?id=' + UserId + '&deviceid=' + deviceid + '" target="_blank">电子栅栏(多边形)</a></div>');
        //html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="RoutePlanning.aspx?id=' + UserId + '" target="_blank">路线偏离设置</a></div>');
        //html.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="POI.aspx?id=' + UserId + '" target="_blank">用户POI管理</a></div>');
    }

    html.push('<div style="height:6px;"></div>');
    html.push("</div>");
    $("#divLeftMenuContext").html(html.join(''));
    var menuHeight = $("#divLeftMenu").height();
    var top = $(this).height() - mousetop;
    var marginTop = 5;
    if (top > menuHeight) {
        marginTop = 5;
    } else {
        marginTop = menuHeight - 10;
    }
    $("#divLeftMenu").css({ "top": mousetop - marginTop, "left": mouseleft - 10 }).show();
    showGroupMenuItems();
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
    }, 1000);

}

var intervalGroupItem = null;
function hideGroupItems() {//隐藏设备分组

    if (intervalGroupItem) clearInterval(intervalGroupItem);
    intervalGroupItem = setInterval(function () {
        document.getElementById("divLeftMenuGroup").style.display = "none";
        clearInterval(intervalGroupItem);
    }, 1000)

}

var commandType = null; //命令类型
var commandDeviceID = 0; //选中下发命令设备
var commandDeviceSN = null; //选中下发命令的设备IMEI号
var commandModel = 0;
var commandPort = 0; //明达设备下发端口
function showPassword(id, t, name, sn, model) {
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    if (t == "DYD" || t == "C001ON" || t == "MDDYD" || t == "41141" || t == "BP030" || t == "S201" || t == "39" || t == "S150" || t == "CWT1000") {
        $("#lblInputPassTitle").html(mapPage.cutOffPetrol);
    } else if (t == "HFYD" || t == "C001OFF" || t == "MDHFYD" || t == "41140" || t == "BP040" || t == "S200" || t == "38" || t == "S151" || t == "CWT1001") {
        $("#lblInputPassTitle").html(mapPage.restorePetrol);
    } else if (t == "BP020" || t == "41201" || t == "SCF0" || t == "S12") {
        $("#lblInputPassTitle").html(mapPage.deviceFortify);
    } else if (t == "BP021" || t == "41200" || t == "SCF1" || t == "S13") {
        $("#lblInputPassTitle").html(mapPage.deviceDismiss);
    } else if (t == "BP120") {
        $("#lblInputPassTitle").html("远程开启监听");
    } else if (t == "BP121") {
        $("#lblInputPassTitle").html("远程关闭监听");
    } else if (t == "Lock") {
        $("#lblInputPassTitle").html("车门加锁");
    } else if (t == "Unlock") {
        $("#lblInputPassTitle").html("车门解锁");
    } else if (t == "PHOTO") {
        $("#lblInputPassTitle").html("设备拍照");
    } else if (t == "CheckLocation" || t == "Q001" || t == "CWT2") {
        $("#lblInputPassTitle").html(mapPage.checkLocatoin);
    } else if (t == "4103") {
        $("#lblInputPassTitle").html("授权号码");
    } else if (t == "CWT70" || t == "KKSSTATUS") {
        $("#lblInputPassTitle").html("状态查询");
    } else if (t == "CWT71") {
        $("#lblInputPassTitle").html("版本查询");
    } else if (t == "KKSRESET") {
        $("#lblInputPassTitle").html("远程重启");
    }

    if (t == "CheckLocation" || t == "Q001" || t == "PHOTO" || t == "CWT2") {
        $("#txtInputpassword").val("000000");
        document.getElementById("txtInputpassword").disabled = true;
    } else {
        $("#txtInputpassword").val("");
        document.getElementById("txtInputpassword").disabled = false;
    }
    $("#spanPassDeviceName").html(name);
    showDiv('divInputPass');
}

function showSOSPassword(id, t, name, sn, model) {
    $("#txtSOSPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSOSDeviceName").html(name);
    showDiv('divSOSPhone');
    getPhones(id, 0);
}

function showSQPassword(id, t, name, sn, model) {
    $("#txtSQPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSQDeviceName").html(name);
    showDiv('divSetSqPhone');
}

function showD2SMS(id, t, name, sn, model) {
    $("#txtDevice2SMSUserPhone").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanD2SMSDeviceName").html(name);
    showDiv('divSetDevice2SMS');
}

function showCellPhone(id, t, name, sn, model) {
    $("#txtCellPhone1").val("");
    $("#txtCellPhone2").val("");
    $("#txtCellPhone3").val("");
    $("#txtCellPhone4").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanCellPhoneDeviceName").html(name);
    showDiv('divCellPhone');
    getPhones(id, 1);
}

function showDeviceInterval(id, t, name, sn, model) {
    $("#txtSetInterval").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanIntervalDeviceName").html(name);
    showDiv('divInterval');
}

function showDeviceDistance(id, t, name, sn, model) {
    $("#txtInitDistance").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanDistanceDeviceName").html(name);
    showDiv('divInitDistance');
}

function showSendTxt(id, t, name, sn, model) {
    $("#txtSendTxtContent").val("");
    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#spanSendTxtDeviceName").html(name);
    showDiv('divSendTxt');
}

function showDeviceSet(id, t, name, sn, model) {

    commandDeviceID = id;
    commandType = t;
    commandDeviceSN = sn;
    commandModel = model;

    $("#buttonDeviceSet").val("确认");
    $("#spanDeviceSetName").html(name);
    showDiv('divDeviceSet');
}

function getPhones(deviceid, t) {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAdditionalAjax.asmx/GetPhoneByDeviceID",
        contentType: "application/json",
        data: "{DeviceID:" + deviceid + ",TypeID:" + t + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            if (t == 0) {
                $("#txtSOSPhone").val(result.d);
            } else if (t == 1) {
                var arr = result.d.split(',');
                $("#txtCellPhone1").val(arr[0]);
                $("#txtCellPhone2").val(arr[1]);
                $("#txtCellPhone3").val(arr[2]);
                $("#txtCellPhone4").val(arr[3]);
            }

        }
    });
}


//验证密码
function sendCmdInfo() {
    //不用验证密码
    var loginUserID = $("#hidUserID").val();
    if (commandType == "CheckLocation" || commandType == "Q001" || commandType == "PHOTO" || commandType == "CWT2") {
        $("#spanSendMsg").html(mapPage.sendMsg1);
        sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
    } else {
        var pass = $("#txtInputpassword").val();
        if (commandModel == 36 && commandType == 37) {
            pass = $("#txtInputpassword1").val();
        }
        if (pass == "") {
            alert(mapPage.passNull);
        } else {
            $("#spanSendMsg").html(mapPage.sendMsg1);
            $.ajax({
                type: "post",
                url: "Ajax/UsersAjax.asmx/ValidPassword",
                contentType: "application/json",
                data: "{UserID:" + loginUserID + ",DeviceID:" + loginDeviceID + ",Pass:'" + pass + "',LoginType:" + loginType + "}",
                dataType: "json",
                error: function (res) {
                    //alert(res.responseText);
                },
                success: function (result) {
                    var res = parseInt(result.d);
                    if (res == 1) {
                        var isMDDevices = '';
                        //判断是否明达设备
                        isMDDevices = commandType.substr(0, 2); 
                        if (isMDDevices == "MD") {
                            commandPort = $("#selPort").val();
                            sendCommandMD(commandDeviceSN, commandDeviceID, commandType, 0, commandModel, commandPort);
                        }
                        else {
                            sendCommand(commandDeviceSN, commandDeviceID, commandType, 0, commandModel);
                        }
                    } else {
                        alert(mapPage.passError);
                        $("#spanSendMsg").html("");
                    }
                }
            });
        }
    }
}

function sendCommand(sn, deviceId, command, trueOrFalse, model) {
    //型号83是宏远协议
    if (model == 83) {
        model = 50;
    }
    if (model == 36 && commandType == 37) {
        var isC1 = $("#txtIsC1").prop('checked') ? "1" : "0";
        var C1 = $("#txtC1").val();
        if (!checknumber(C1) || C1 == "") {
            $("#txtC1").val(0);
            alert("请输入整数");
            return;
        }
        else if (parseInt(C1) < 0 || parseInt(C1) > 86400) {
            alert("数值应在0~86400之间");
            return;
        }
        var isC2 = $("#txtIsC2").prop('checked') ? "1" : "0";
        var C2 = $("#txtC2").val();
        if (!checknumber(C2) || C2 == "") {
            $("#txtC2").val(0);
            alert("请输入整数");
            return;
        }

        var isC3 = $("#txtIsC3").prop('checked') ? "1" : "0";
        var C3 = $("#txtC3").val();
        if (!checknumber(C3) || C3 == "") {
            $("#txtC3").val(0);
            alert("请输入整数");
            return;
        }
        var isC4 = $("#txtIsC4").prop('checked') ? "1" : "0";
        var C4 = $("#txtC4").val();
        if (!checknumber(C4) || C4 == "") {
            $("#txtC4").val(0);
            alert("请输入整数");
            return;
        }

        var isC5 = $("#txtIsC5").prop('checked') ? "1" : "0";
        var C5 = $("#txtC5").val();
        var C6 = $("#txtC6").val();
        if (!checknumber(C5) || C5 == "") {
            $("#txtC5").val(0);
            alert("请输入整数");
            return;
        }
        if (!checknumber(C6) || C6 == "") {
            $("#txtC6").val(0);
            alert("请输入整数");
            return;
        }
        trueOrFalse = isC1 + "|" + C1 + "-" + isC2 + "|" + C2 + "-" + isC3 + "|" + C3 + "-" + isC4 + "|" + C4 + "-" + isC5 + "|" + C5 + "|" + C6;
    }
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommand",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                } else if (res == 4) {
                    msg = mapPage.sendMsg6;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}

function checknumber(String) {
    var Letters = "1234567890";
    var i;
    var c;
    for (i = 0; i < String.length; i++) {
        c = String.charAt(i);
        if (Letters.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

//标准协议用
function sendCmdPhone(t) {
    var phones = "";
    if (t == 0) {
        phones = $("#txtSOSPhone").val();
    } else if (t == 1) {
        phones = $("#txtCellPhone1").val() + "," + $("#txtCellPhone2").val() + "," + $("#txtCellPhone3").val() + "," + $("#txtCellPhone4").val();
    } else if (t == 2) {
        var seconds = $("#txtSetInterval").val();
        if (seconds == "") {
            return;
        } else if (parseInt(seconds) < 10) {
            alert('间隔不能小于10秒!');
            return;
        } else if (parseInt(seconds) > 9999) {
            alert(yiwen201312.msg4);
            return;
        }
        phones = seconds;
    } else if (t == 3) {
        var content = $("#txtSendTxtContent").val();
        if (content == "") {
            return;
        } else {
            phones = content;
        }
    } else if (t == 4) {
        var selNo = $("#selSetPhoneNo").val();
        var sqPhone = $("#txtSQPhone").val();
        phones = selNo + "," + sqPhone;
    } else if (t == 5) {
        var selD2SMSType = $("#selD2SMSType").val();
        var d2smsPhone = $("#txtDevice2SMSUserPhone").val();
        phones = selD2SMSType + "" + d2smsPhone;
    } else if (t == 6) {
        var initDistance = $("#txtInitDistance").val();
        if (initDistance == "") {
            return;
        }
        phones = initDistance;
    }
    sendPhoneCommand(commandDeviceSN, commandDeviceID, commandType, commandModel, phones);
}


function sendPhoneCommand(sn, deviceId, command, model, phones) {

    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandByPhone",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',Model:" + model + ",Phones:'" + phones + "'}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 1);
                } else if (command == "BP05") {
                    GetResponse(result.d, 0, 2);
                    $("#spanSendMsgCellPhone").html(mapPage.sendSuccess);
                } else if (command == "BP07" || command == "D1" || command == "CWT5") {
                    $("#spanSendMsgInterval").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 3);
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 4);
                } else if (command == "4103") {
                    $("#spanSendMsgSQ").html(mapPage.sendSuccess);
                    GetResponse(result.d, 0, 5);
                } else if (command == "D2SMS") {
                    alert("命令已经发送成功!");
                    closeDiv('divSetDevice2SMS');
                } else if (command == "CWT103") {
                    $("#spanSendMsgDistance").html(mapPage.sendSuccess);
                    alert("命令已经发送成功!");
                    closeDiv('divInitDistance');
                    //GetResponse(result.d, 0, 6);
                } 

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                } else if (res == 4) {
                    msg = mapPage.sendMsg6;
                }
                alert(msg);
                if (command == "BP11") {
                    $("#spanSendMsgSOS").html("");
                } else if (command == "BP05") {
                    $("#spanSendMsgCellPhone").html("");
                } else if (command == "BP07" || command == "D1" || command == "CWT5") {
                    $("#spanSendMsgInterval").html("");
                } else if (command == "BP13") {
                    $("#spanSendMsgTxt").html("");
                } else if (command == "4103") {
                    $("#spanSendMsgSQ").html("");
                } else if (command == "D2SMS") {
                    $("#spanSendMsgD2SMS").html("");
                } else if (command == "CWT103") {
                    $("#spanSendMsgDistance").html("");
                }
            }

        }
    });
}

//明达下发
function sendCommandMD(sn, deviceId, command, trueOrFalse, model, port) {
    //命令发送
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/SendCommandMD",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + deviceId + ",CommandType:'" + command + "',TrueOrFalse:'" + trueOrFalse + "',Model:" + model + ",Port:" + port + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = parseInt(result.d);
            if (res > 10) {
                $("#spanSendMsg").html(mapPage.sendSuccess);
                GetResponse(result.d, 0, 0);

            } else {
                var msg = "";
                if (res == -1) {
                    msg = mapPage.sendMsg2;
                } else if (res == 1) {
                    msg = mapPage.sendMsg3;
                } else if (res == 2) {
                    msg = mapPage.sendMsg4;
                } else if (res == 3) {
                    msg = mapPage.sendMsg5;
                }
                alert(msg);
                $("#spanSendMsg").html("");
            }

        }
    });
}


function GetResponse(id, index, t) {
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetResponse",
        contentType: "application/json",
        data: "{CommandID:" + id + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            index++;
            var str = result.d;
            if (str == "" || str == null || str == "null" || str == undefined) {
                if (index == 3) {
                    alert(mapPage.responseNull);
                    if (t == 0) {
                        $("#spanSendMsg").html("");
                        closeDiv('divInputPass');
                    } else if (t == 1) {
                        $("#spanSendMsgSOS").html("");
                        $("#txtSOSPhone").val("");
                        closeDiv('divSOSPhone');
                    } else if (t == 3) {
                        $("#spanSendMsgInterval").html("");
                        $("#txtSetInterval").val("");
                        closeDiv('divInterval');
                    } else if (t == 4) {
                        $("#spanSendMsgTxt").html("");
                        $("#txtSendTxtContent").val("");
                        closeDiv('divSendTxt');
                    } else if (t == 2) {
                        $("#spanSendMsgCellPhone").html("");
                        $("#txtCellPhone1").val("");
                        $("#txtCellPhone2").val("");
                        $("#txtCellPhone3").val("");
                        $("#txtCellPhone4").val("");
                        closeDiv('divCellPhone');
                    } else if (t == 5) {
                        $("#spanSendMsgSQ").html("");
                        $("#txtSQPhone").val("");
                        closeDiv('divSetSqPhone');
                    } else if (t == 6) {
                        $("#spanSendMsgDistance").html("");
                        $("#txtInitDistance").val("");
                        closeDiv('divInitDistance');
                    }
                } else {
                    setTimeout(function () {
                        GetResponse(id, index, t);
                    }, 8000);
                }
            } else {
                var cxaStr = mapPage.responseSuccess + str;
                alert(cxaStr);

                if (t == 0) {
                    $("#spanSendMsg").html("");
                    closeDiv('divInputPass');
                } else if (t == 1) {
                    $("#spanSendMsgSOS").html("");
                    $("#txtSOSPhone").val("");
                    closeDiv('divSOSPhone');
                } else if (t == 2) {
                    $("#spanSendMsgCellPhone").html("");
                    $("#txtCellPhone1").val("");
                    $("#txtCellPhone2").val("");
                    $("#txtCellPhone3").val("");
                    $("#txtCellPhone4").val("");
                    closeDiv('divCellPhone');
                } else if (t == 3) {
                    $("#spanSendMsgInterval").html("");
                    $("#txtSetInterval").val("");
                    closeDiv('divInterval');
                } else if (t == 4) {
                    $("#spanSendMsgTxt").html("");
                    $("#txtSendTxtContent").val("");
                    closeDiv('divSendTxt');
                } else if (t == 5) {
                    $("#spanSendMsgSQ").html("");
                    $("#txtSQPhone").val("");
                    closeDiv('divSetSqPhone');
                }
            }
        }, error: function (e) {
            alert(mapPage.responseNull);

            if (t == 0) {
                $("#spanSendMsg").html("");
                closeDiv('divInputPass');
            } else if (t == 1) {
                $("#spanSendMsgSOS").html("");
                $("#txtSOSPhone").val("");
                closeDiv('divSOSPhone');
            } else if (t == 2) {
                $("#spanSendMsgCellPhone").html("");
                $("#txtCellPhone1").val("");
                $("#txtCellPhone2").val("");
                $("#txtCellPhone3").val("");
                $("#txtCellPhone4").val("");
                closeDiv('divCellPhone');
            } else if (t == 3) {
                $("#spanSendMsgInterval").html("");
                $("#txtSetInterval").val("");
                closeDiv('divInterval');
            } else if (t == 4) {
                $("#spanSendMsgTxt").html("");
                $("#txtSendTxtContent").val("");
                closeDiv('divSendTxt');
            }
        }
    });
}

function showCommandList(id, sn, pageNo) {

    showDiv('divCommandList');
    var TimeZone = $("#hidTimeZone").val();
    $.ajax({
        type: "post",
        url: "Ajax/CommandQueueAjax.asmx/GetCommandList",
        contentType: "application/json",
        data: "{SN:'" + sn + "',DeviceID:" + id + ",PageNo:" + pageNo + ",PageCount:" + pageCount + ",TimeZones:'" + TimeZone + "'}",
        dataType: "json",
        success: function (result) {
            if (result.d != "") {
                writeCommandTable(eval("(" + result.d + ")"));
            }
        }, error: function (res) {
            //alert(res.responseText);
        }
    });
}

function showDivIframe(url, id) {
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "ProductUpdate.aspx") {
        $("#spanIframeTitle").html(mapPage.divicesInfo);
        $("#divIframe").css("height", "368px");
        $("#ifmPage").attr("height", "340");
        if (loginType == 1) {
            $("#ifmPage").attr("src",   "devices/" + id + "?randon=" + randomnumber);
        } else {
            $("#ifmPage").attr("src", "deevices/" + id +"?randon=" + randomnumber);
        }
    } else if (url == "DownloadLocation.aspx") {
        $("#spanIframeTitle").html(mapPage.downloadLocation);
        $("#divIframe").css("height", "390px");
        $("#ifmPage").attr("height", "340");
        if (loginType == 1) {
            $("#ifmPage").attr("src", url + "?id=" + UserId + "&deviceid=" + id + "&randon=" + randomnumber);
        } else {
            $("#ifmPage").attr("src", url + "?id=" + UserId + "&deviceid=" + id + "&loginType=1&randon=" + randomnumber);
        }
    } else if (url == "CarCommand.aspx") {
        $("#spanIframeTitle").html(yiwen201407.moreCommand);
        $("#divIframe").css("height", "410px");
        $("#ifmPage").attr("height", "360");
        $("#ifmPage").attr("src", url + "?loginType=" + loginType + "&deviceid=" + id + "&randon=" + randomnumber);
    }
    showDiv("divIframe");
}

function writeCommandTable(json) {
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="1" cellpadding="0" class="tab">');
    html.push('<tbody>');
    html.push('<tr height="25" style="background:#F5F5F5;font-weight:bold;">');
    html.push('<td align="center" width="25">' + allPage.num + '</td>');
    html.push('<td align="center" height="25" width="80">' + mapPage.cmdType + '</td>'); //指令类型
    html.push('<td align="center" width="90">' + mapPage.cmdState + '</td>'); //状态
    html.push('<td align="center">' + mapPage.responseText + '</td>'); //响应信息
    html.push('<td align="center" width="130">' + mapPage.responseTime + '</td>'); //响应时间
    html.push('<td align="center" width="130">' + mapPage.sendTime + '</td>'); //发送时间
    html.push('</tr>');
    if (json.commandArr.length == 0) {//没有查询到数据
        html.push('<td align="center" height="25" colspan="6" style="color:#ff0000;">' + allPage.noData + '</td>');
    } else {
        var nowPage = parseInt(json.nowPage);
        var start = (nowPage - 1) * pageCount + 1;
        for (var i = 0; i < json.commandArr.length; i++) {

            var commandName = json.commandArr[i].commandName;
            if (commandName == "CheckLocation" || commandName == "Q001" || commandName == "CWT2") {
                commandName = mapPage.checkLocation;
            } else if (commandName == "HFYD" || commandName == "C001OFF" || commandName == "BP040" || commandName == "41140" || commandName == "S200" || commandName == "38" || commandName == "S151" || commandName == "CWT1001") {
                commandName = mapPage.hfyd;
            } else if (commandName == "DYD" || commandName == "C001ON" || commandName == "BP030" || commandName == "41141" || commandName == "S201" || commandName == "39" || commandName == "S150" || commandName == "CWT1000") {
                commandName = mapPage.dyd;
            } else if (commandName == "BP020" || commandName == "41201" || commandName == "SCF0" || commandName == "S12" || commandName == "KKSFortify") {
                commandName = mapPage.deviceFortify;
            } else if (commandName == "BP021" || commandName == "41200" || commandName == "SCF1" || commandName == "S13" || commandName == "KKSDismiss") {
                commandName = mapPage.deviceDismiss;
            } else if (commandName == "BP05" || commandName == "S7102") {
                commandName = "设置亲情号码";
            } else if (commandName == "BP11" || commandName == "KKSSOS") {
                commandName = "设置SOS号码";
            } else if (commandName == "4103") {
                commandName = "授权号码";
            } else if (commandName == "BP120") {
                commandName = "监听开启";
            } else if (commandName == "BP121") {
                commandName = "监听关闭";
            } else if (commandName == "BP07" || commandName == "D1" || commandName == "CWT5" || commandName == "LS800") {
                commandName = "上传间隔";
            } else if (commandName == "BP13") {
                commandName = "下发文字";
            } else if (commandName == "S7101") {
                commandName = "主控号码";
            } else if (commandName == "S7103") {
                commandName = "修改密码";
            } else if (commandName == "S7106111") {
                commandName = "自动设防开启";
            } else if (commandName == "S7106000") {
                commandName = "自动设防关闭";
            } else if (commandName == "S7107111") {
                commandName = "外部电源断电自动设防开启";
            } else if (commandName == "S7107000") {
                commandName = "外部电源断电自动设防关闭";
            } else if (commandName == "S7108") {
                commandName = "震动报警间隔时间设置";
            } else if (commandName == "S7109") {
                commandName = "震动灵敏度";
            } else if (commandName == "S7109SOS") {
                commandName = "SOS报警方式";
            } else if (commandName == "S7110") {
                commandName = "移位报警设置";
            } else if (commandName == "S7111") {
                commandName = "超速设置";
            } else if (commandName == "S7112") {
                commandName = "短信/GPRS模式";
            } else if (commandName == "R8") {
                commandName = "监听";
            } else if (commandName == "R1" || commandName == "KKSRESET") {
                commandName = "远程重启";
            } else if (commandName == "S7113") {
                commandName = "恢复出厂";
            } else if (commandName == "S7114") {
                commandName = "语言设置";
            } else if (commandName == "S7115") {
                commandName = "时区设置";
            } else if (commandName == "S7116") {
                commandName = "休眠设置";
            } else if (commandName == "S71171") {
                commandName = "监听模式";
            } else if (commandName == "S71170") {
                commandName = "定位模式";
            } else if (commandName == "S7118" || commandName == "S7119") {
                commandName = "参数查询";
            } else if (commandName == "S7120") {
                commandName = "自动设防时间";
            } else if (commandName == "S7121") {
                commandName = "自动撤防时间";
            } else if (commandName == "S7122") {
                commandName = "运动上传频率";
            } else if (commandName == "S7123") {
                commandName = "静止上传频率";
            } else if (commandName == "S7124") {
                commandName = "远程启动";
            } else if (commandName == "S7125") {
                commandName = "远程熄火";
            } else if (commandName == "S21") {
                commandName = "电子栅栏";
            } else if (commandName == "D2SMS") {
                commandName = "设备发送短信";
            } else if (commandName == "CWT70" || commandName == "KKSSTATUS") {
                commandName = "状态查询";
            } else if (commandName == "CWT71") {
                commandName = "版本查询";
            } else if (commandName == "CWT103") {
                commandName = "设置里程";
            } else if (commandName == "KKSSModel") {
                commandName = "手动设撤防";
            } else if (commandName == "KKSZModel") {
                commandName = "自动设撤防";
            } else if (commandName == "KKSSENALM") {
                commandName = "震动报警设置";
            } else if (commandName == "KKSPOWERALM") {
                commandName = "拔出报警设置";
            } else if (commandName == "36") {
                commandName = "发送文本信息";
            } else if (commandName == "37") {
                commandName = "终端远程设置";
            } else if (commandName == "YSJCENTER") {
                commandName = "中心号码";
            } else if (commandName == "YSJSLEEP") {
                commandName = "工作模式";
            } else if (commandName == "YSJPOWER") {
                commandName = "设置定时开机";
            } else if (commandName == "YSJPOFF") {
                commandName = "关机时间";
            } else if (commandName == "BSJUPLOAD") {
                commandName = "回传唤醒设置";
            } else if (commandName == "KKSZZ700") {
                commandName = "追踪模式";
            } else if (commandName == "KKSSD700") {
                commandName = "省电模式";
            } else if (commandName == "KKSCANCEL700") {
                commandName = "解除报警";
            }

            var state = "";
            var responseMsg = "";
            var responseDate = "";
            var sendDate = "";
            if (json.commandArr[i].isResponse == 1) {
                state = mapPage.deviceResponse;
                responseMsg = json.commandArr[i].responseText;
                responseDate = json.commandArr[i].responseDate;
                sendDate = json.commandArr[i].sendDate;
            } else if (json.commandArr[i].isSend == 1) {
                state = mapPage.sendSuccess2;
                sendDate = json.commandArr[i].sendDate;
            } else {
                state = mapPage.noSend;
            }

            html.push('<tr height="25" onmouseover=\'this.style.backgroundColor="#FAFAFA";\' onmouseout="this.style.backgroundColor=\'\';">');
            html.push('<td align="center">' + (start + i) + '</td>');
            html.push('<td align="center">' + commandName + '</td>');
            html.push('<td align="center">' + state + '</td>');
            html.push('<td width=\"360\" style=\"word-break:break-all;over-flow:hidden;\" >' + responseMsg + '</td>');
            html.push('<td align="center">' + responseDate + '</td>');
            html.push('<td align="center">' + sendDate + '</td>');
            html.push('</tr>');
        }
        var pageStr = "";
        var size = parseInt(json.resSize);
        var pageSize = size % pageCount == 0 ? size / pageCount : size / pageCount + 1;
        pageStr = showCheckCommand(parseInt(json.deviceID), json.sn, json.nowPage, pageSize);
        html.push('<tr><td colspan="6" bgcolor="#FFFFFF" align="center">' + pageStr + '</td></tr>');
    }
    html.push('</tbody>');
    html.push('</table>');
    $("#divCommandListTable").html(html.join(''));
}

function searchDevices() {
    showSearchDevices("");
}

function showSearchDevices(n) {
    n = $("#txtSearchInput").val();
    if (n != "") {
        if (allDevices) {
            likeSearch(n, allDevices);
        }
    }
}

//模糊搜索,设备名,车牌号
function likeSearch(searchStr, arr) {
    for (var i = 0; i < arr.devices.length; i++) {
        var isShow = false;
        var deviceName = arr.devices[i].name;
        var sn = arr.devices[i].sn;
        if (searchStr != "") {
            if (deviceName.indexOf(searchStr) != -1) {
                isShow = true;
            }
            if (sn.indexOf(searchStr) != -1) {
                isShow = true;
            }
        } else {
            isShow = true;
        }
        if (isShow) {
            var state = arr.devices[i].status;
            searchTableClk(arr.devices[i].id, '' + deviceName + '', '' + state + '');
            break;
        }
    }
}

function searchTableClk(id, name, state) {
    if (state != "LoggedOff") {
        showMoreDivDevice(id, 1);
        $("#divLeftSearchDevices").hide();
        $("#txtSearchInput").val(name)
    } 
}

function showDiv(id) {
    closeOpenShow();
    $("#" + id).show();
}

function closeDiv(id) {
    $("#" + id).hide();
    if (id == "divCommandList") {
        $("#divCommandListTable").html("");
    }
}

function closeOpenShow() {
    $("#divCommandList").hide();
    $("#divInputPass").hide();
    $("#divSOSPhone").hide();
    $("#divCellPhone").hide();
    $("#divInterval").hide();
    $("#divSendTxt").hide();
    $("#divSetSqPhone").hide();
    $("#divSetDevice2SMS").hide();
    $("#divInitDistance").hide();
}



function openPage(url, userid, deviceid) {
    //var maptype = ifmMap.window.document.getElementById("selMap").value;
    var p = IDEncryption(deviceid);
    if (loginType == 1) {
        var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&p=" + p;
    } else {
        var openUrl = url + "?id=" + userid + '&deviceid=' + deviceid + "&loginType=1&p=" + p;
    }
    window.open(openUrl);
}


function clkInputGroup(t) {
    if (t == 0) {
        $("#divAddGroup").hide();
        $("#divInputGroup").show();
    } else if (t == 1) {
        $("#divInputGroup").hide();
        $("#divAddGroup").show();
    }
}

//给点击的用户创建分组
function saveGroup() {
    var inputGroupName = $("#txtGroupName").val();
    if (inputGroupName != "") {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/AddGroup",
            contentType: "application/json",
            data: "{UserID:" + UserId + ",GroupName:'" + inputGroupName + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#txtGroupName").val("");
                    clkInputGroup(1);

                    var html = [];
                    var id = "divGroup-" + res;
                    var spanID = "spanGroup-" + res;
                    var spanNameID = "spanGroupName-" + res;
                    var divEditID = "divEditGroup-" + res;
                    var inputID = "editGroup-" + res;
                    var divMainID = "divMainGroup-" + res;
                    html.push('<div id="' + divMainID + '" style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">');
                    html.push('<div style="float:left;width:140px;">&nbsp;<img src="/img/map/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                    html.push('<span id="' + spanNameID + '">' + inputGroupName + '</span><input id="' + inputID + '" onblur="saveGroupName(' + res + ');" style="width:80px;display:none;" />');
                    html.push('(<span id="' + spanID + '">0</span>)</div>');
                    html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + res + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + res + ',\'' + inputGroupName + '\');">' + allPage.deletes + '</a></div>');
                    html.push('</div>');
                    html.push('<div id="' + id + '" style="clear:left;">');
                    html.push("</div>");

                    allGroupsDivIDs.push(id);
                    $("#divDevicesTable").append(html.join(''));
                    addGroupMouse(divMainID, divEditID);
                    var str = "{id:" + res + ",name:'" + inputGroupName + "'}";
                    allGroups.push(eval("(" + str + ")"));
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//获取用户的设备分组
function getGroup() {
    if (loginType == 1) {
        var html = [], divMainIDs = [], divEditIDs = [];
        html.push('<div style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">&nbsp;<img src="/img/map/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + "divGroup-0" + '\');" />&nbsp;' + mapPage.defaultGroup + '(<span id="spanGroup-0">0</span>)');
        html.push('</div>');
        html.push('<div id="divGroup-0">');
        html.push("</div>");
        allGroupsDivIDs.push("divGroup-0");

        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/GetAllGroupByUserID",
            contentType: "application/json",
            data: "{UserID:" + UserId + "}",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    var json = eval("(" + result.d + ")");
                    allGroups = json.arr;
                    for (var i = 0; i < allGroups.length; i++) {
                        var id = "divGroup-" + allGroups[i].id;
                        var spanID = "spanGroup-" + allGroups[i].id;
                        var spanNameID = "spanGroupName-" + allGroups[i].id;
                        var divEditID = "divEditGroup-" + allGroups[i].id;
                        var inputID = "editGroup-" + allGroups[i].id;
                        var divMainID = "divMainGroup-" + allGroups[i].id;
                        html.push('<div id="' + divMainID + '" style="clear:left; height:20px;padding-top:5px;border-bottom:1px #F2F2F2 solid;">'); //
                        html.push('<div style="float:left;width:140px;">&nbsp;<img src="/img/map/g_o.gif" width="11" height="11" border="0" style="cursor:pointer;" onclick="displyGroupDiv(this,\'' + id + '\');" />&nbsp;');
                        html.push('<span id="' + spanNameID + '">' + allGroups[i].name + '</span><input id="' + inputID + '" onblur="saveGroupName(' + allGroups[i].id + ');" style="width:80px;display:none;" />');
                        html.push('(<span id="' + spanID + '">0</span>)</div>');
                        html.push('<div id="' + divEditID + '" style="float:left;display:none;"><a href="javascript:void(0);" onclick="editGroupName(' + allGroups[i].id + ');">' + allPage.edit2 + '</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="comfirmDelGroup(' + allGroups[i].id + ',\'' + allGroups[i].name + '\');">' + allPage.deletes + '</a></div>');
                        html.push('</div>');
                        html.push('<div id="' + id + '" style="clear:left;">');
                        html.push("</div>");

                        divMainIDs.push(divMainID);
                        divEditIDs.push(divEditID);
                        allGroupsDivIDs.push(id);
                    }
                }
                //showGroupMenuItems();
                $("#divDevicesTable").html(html.join(''));
                for (var i = 0; i < divMainIDs.length; i++) {
                    var divMainID = divMainIDs[i];
                    var divEditID = divEditIDs[i];
                    addGroupMouse(divMainID, divEditID);
                }
                initGetDevices();
            }, error: function (res) {
                //alert(res.responseText);
                $("#divDevicesTable").html(html.join(''));
                //showGroupMenuItems();
                initGetDevices();
            }
        });
    } else {
        var html = [];
        html.push('<div id="divGroup-0">');
        html.push("</div>");
        allGroupsDivIDs.push("divGroup-0");
        $("#divDevicesTable").html(html.join(''));
        initGetDevices();
    }
}

function addGroupMouse(divMainID, divEditID) {
    $("#" + divMainID).mouseover(function () {
        if (!groupInput) {
            $("#" + divEditID).show();
        }
    }).mouseleave(function () {
        if (!groupInput) {
            $("#" + divEditID).hide();
        }
    });

}

function showGroupMenuItems() {
    $("#divLeftMenuGroup").html("");
    var grouphtml = [];
    grouphtml.push('<div style="margin-top:5px;">');
    grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + "-1" + ');">' + mapPage.defaultGroup + '</a></div>');
    for (var i = 0; i < allGroups.length; i++) {
        grouphtml.push('<div style="padding-top:2px;" onmouseover="this.style.backgroundColor=\'#F0F0F0\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';" ><a href="javascript:void(0);" onclick="moveGroup(' + allGroups[i].id + ');">' + allGroups[i].name + '</a></div>');
    }
    grouphtml.push('</div>');
    $("#divLeftMenuGroup").html(grouphtml.join(''));
}

function clearGroupDivTxt() {
    $("#divGroup-0").html("");
    $("#spanGroup-0").html("0");
    for (var i = 0; i < allGroups.length; i++) {
        $("#divGroup-" + allGroups[i].id).html("");
        $("#spanGroup-" + allGroups[i].id).html("0");
    }
}
var groupInput = false;
function editGroupName(id) {
    groupInput = true;
    $("#spanGroupName-" + id).hide();
    $("#editGroup-" + id).val($("#spanGroupName-" + id).html()).show();
    document.getElementById("editGroup-" + id).focus();
    $("#divEditGroup-" + id).hide();
}

function saveGroupName(id) {
    groupInput = false;
    var oldStr = $("#spanGroupName-" + id).html();
    var newStr = $("#editGroup-" + id).val();
    if (oldStr != newStr) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/UpdateGroupName",
            contentType: "application/json",
            data: "{GroupID:" + id + ",GroupName:'" + newStr + "'}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    $("#spanGroupName-" + id).html(newStr);
                    for (var i = 0; i < allGroups.length; i++) {
                        if (allGroups[i].id == id) {
                            allGroups[i].name = newStr;
                            break;
                        }
                    }
                    //重新加载移至分组的列表
                    //showGroupMenuItems();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
    $("#editGroup-" + id).hide();
    $("#spanGroupName-" + id).show();
}

//编辑name状态下,禁用
function showGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).show();
    }
}

function closeGroupDiv(id) {
    if (!groupInput) {
        $("#" + id).hide();
    }
}


function displyGroupDiv(t, id) {
    var display = document.getElementById(id).style.display;
    if (display == "block" || display == "") {
        t.src = "/img/map/g_c.gif";
        document.getElementById(id).style.display = "none";
    } else {
        t.src = "/img/map/g_o.gif";
        document.getElementById(id).style.display = "block";
    }
}
function showMoveGroup(deviceID) {
    //if (intervalGroupItem) clearInterval(intervalGroupItem);
    //$("#divLeftMenuGroup").css({ "marginTop": mousetop - 5, "marginLeft": mouseleft + 20 }).show();
    $("#divLeftMenuGroup").show();
}

function hideMoveGroup() {
    $("#divLeftMenuGroup").hide();
}

function moveGroup(groupID) {
    if (clkGroupItemDeviceID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/DevicesAjax.asmx/UpdateDeviceGroupID",
            contentType: "application/json",
            data: "{DeviceID:" + clkGroupItemDeviceID + ",GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    ajaxGetDevices();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

function comfirmDelGroup(groupID, groupName) {
    var name = groupName;
    for (var i = 0; i < allGroups.length; i++) {
        if (allGroups[i].id == groupID) {
            name = allGroups[i].name;
            break;
        }
    }
    return confirm(cusPage.delUserConfirm + name + mapPage.delGroupConfirm) ? delGroup(groupID) : void (0);
}

function delGroup(groupID) {
    if (groupID > 0) {
        $.ajax({
            type: "post",
            url: "Ajax/GroupsAjax.asmx/DelGroup",
            contentType: "application/json",
            data: "{GroupID:" + groupID + "}",
            dataType: "json",
            success: function (result) {
                var res = parseInt(result.d);
                if (res > 0) {
                    initUserDevices();
                    getGroup();
                }
            }, error: function (res) {
                //alert(res.responseText);
            }
        });
    }
}

//隐藏左边栏
function showHideLeft() {
    var display = $("#divLeft").css("display");
    var leftWidth = 265;
    var mWidth = 260;
    if (display == "block") {
        mWidth = 0;
        $("#divMenuLeftImg").css("left", 0 + "px");
        //$("#imgProductSearch").hide();
        $("#divLeftSearchDevices").hide();
        $("#divLeft").hide();
        $("#divMap").css("marginLeft", "0" + "px");
    } else {
        $("#divMenuLeftImg").css("left", 260 + "px");
        $("#divLeft").show();
        $("#divMap").css("marginLeft", "260" + "px");
    }
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "11px" || p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
    var w = $(this).width() - 12;
    var mapWidth = w - mWidth;
    $("#ifmMap").css("width", mapWidth + "px");
}

function overMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "33px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "44px");
    } else if (p == "22px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "11px");
    }
}

function outMenuLeft() {
    var p = $("#divMenuLeftImg").css("backgroundPositionX");
    if (p == "44px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "33px");
    } else if (p == "11px") {
        $("#divMenuLeftImg").css("backgroundPositionX", "22px");
    }
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


function strIsSChinese(strTemp) {
    var isCn = false;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {

        }
        else {
            isCn = true;
        }
    }
    return isCn;
}

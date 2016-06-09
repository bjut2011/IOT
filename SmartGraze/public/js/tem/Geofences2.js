var DeviceID = 0;
var TimeZone = "";
var UserID = 0;
var pointsStr = []; //显示在地图上的多边形point数组
var editZoneID = 0;

$(document).ready(function () {

    syncSize();
    initmap();

    DeviceID = $("#hidDeviceID").val();
    TimeZone = $("#hidTimeZone").val();
    UserID = $("#hidUserID").val();


    $("#btnSearchLatlng").val(" " + "查询" + " ");
    $("#btnCancelLatlng").val(" " + "取消" + " ");

    ajaxGetDevices();
    ajaxGetPolygon();
});

window.onresize = syncSize;

function syncSize() {
    var w2 = $(this).width() - 255;
    var w = $(this).width() - 255;
    $("#map_canvas").css("width", w2 + "px");
    $("#map_canvas").css("height", ($(this).height()) + "px");
    $("#divOperation").css("left", w + "px");
    $("#divGeofence").css("left", w + "px");
    var h = $(this).height() - 280;
    $("#divGeofenceTable").css("height", h + "px");

    var h2 = $(this).height() - 5;
    var w2 = $(this).width() - 0;
    $("#divSearchLatlng").css("left", (w2 - 220) / 2 + 100 + "px");
    $("#divSearchLatlng").css("top", (h2 - 150) / 2 + 100 + "px");
}

function searchLatlng() {
    $("#divSearchLatlng").show();
}

function closeDiv2(id) {
    $("#" + id).hide();
}
function showMapLatlng() {
    var lat = $("#txtSearchLat").val();
    var lng = $("#txtSearchLng").val();
    if (lat != "" && lng != "") {
        $.ajax({
            type: "post",
            url: "Ajax/POIService.asmx/GetLatLngByOffset",
            contentType: "application/json",
            data: "{oLat:" + lat + ",oLng:" + lng + ",MapType:'" + "Baidu" + "'}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                var latlng = result.d.split(',');
                setMapCenterByLatlng(latlng[0], latlng[1]);
            }
        });
    }
}


function ajaxGetDevices() {
    $.ajax({
        type: "post",
        url: "devices/getDevices",
        data: "pid=" + UserID + "&isFirst=" + true + "&TimeZones=" + TimeZone,
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            //alert(result.d + "  " );
            if (result.code == 0) {
                //alert(result.d);
                //var json = eval("(" + result.d + ")");
                addCarMarker(result.info);
            }
        }
    });
}

function initPolygon(isAdd) {
    clearMap();
    points.length = 0;
    pointsStr.length = 0;
    markers.length = 0;
    editZoneID = 0;
    isShowPoly = true;
    isClkMarker = false;
    if (isAdd) {

    } else {
        $("#txtGeofenceName").val("");
        $('input[type="checkbox"]:checked').each(function () {
            $(this).get(0).checked = false;
        });
    }
}

function ajaxGetPolygon() {
    $("#divGeofenceTable").html("");
    if (UserID !="") {
        $.ajax({
            type: "post",
            url: "/getPolygonList",
            contentType: "application/json",
            data: "{\"UserID\":\"" + UserID + "\",\"TimeZone\":\"" + TimeZone + "\"}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result.d != "") {
                    var json = result.d;
                    showTable(json);
                }
            }
        });
    }
}

function GetPolygon() {
    initPolygon(false);
    ajaxGetPolygon();
}


function showTable(json) {
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="2" class="tab" id="datalist">');
    html.push('<thead>');
    html.push('<tr height="25" style="background:#F5F5F5;">');
    html.push('<th >' + "名称" + '</th>');
    html.push('<th >' + "创建时间" + '</th>');
    html.push('<th width="40">' + "操作" + '</th>');
    html.push('</tr></thead><tbody>');
    if (json != "") {
        if (json.arr.length > 0) {
            for (var i = 0; i < json.arr.length; i++) {
                html.push('<tr class="');
                html.push(i % 2 === 0 ? 'even' : 'odd');
                html.push('" style="">');
                html.push('<td class="tc"><a href="javascript:void(0);" onclick="ajaxGetPolygonDetail(\'' + json.arr[i].id + '\',\'' + json.arr[i].name + '\');" >' + json.arr[i].name + '</a></td>');
                html.push('<td class="tc">' + json.arr[i].createTime + '</td>');
                html.push('<td class="tc">' + "<a href='javascript:void(0);' onclick='confirm(\"确认删除吗?\")?ajaxDeletePolygon(\"" + json.arr[i].id + "\"):void(0);'>删除</a>" + '</td>');
                html.push('</tr>');
            }
        } else {
            html.push('<td align="center" height="25" colspan="3" style="color:#ff0000;">' + "" + '</td>');
        }
    } else {
        html.push('<td align="center" height="25" colspan="3" style="color:#ff0000;">' + "" + '</td>');
    }

    html.push('</tbody>');
    html.push('</table>');
    $("#divGeofenceTable").html(html.join(""));
}


function polySave() {

    var geoName = $("#txtGeofenceName").val();
    if (geoName == "") {
        alert("电子栅栏名称不能为空!");
        return false;
    }
    if (pointsStr.length > 1) {
        var deviceIDs = "";
        $('input[type="checkbox"]:checked').each(function () {
            deviceIDs += $(this).val() + ",";
        });
        var latLngs = pointsStr.join('|');
        if (deviceIDs == "") {
            alert("请选择设备!");
            return;
        }
        $.ajax({
            type: "post",
            url: "geofences",
            contentType: "application/json",
            data: "{\"UserID\":\"" + UserID + "\",\"ZoneID\":\"" + editZoneID + "\",\"Name\":\"" + geoName + "\",\"LatLngs\":\"" + latLngs + "\",\"DeviceIDs\":\"" + deviceIDs + "\"}",
            dataType: "json",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {

                if (result.code == 0) {
                    GetPolygon();
                    alert("保存成功!");
                } else {
                    alert("保存失败!");
                }
            }
        });
    } else {
        alert("请绘制电子栅栏!");
    }

}

function ajaxGetPolygonDetail(id, name) {
    initPolygon(false);
    editZoneID = id;
    $("#txtGeofenceName").val(name);
    $.ajax({
        type: "post",
        url: "getPolygonDetail",
        contentType: "application/json",
        data: "{\"ZoneID\":\"" + editZoneID + "\"}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            if (result.d != "") {
                var json = result.d;
                //地图显示区域
                showPolygonInMap(json.points);
                //选中设备
                for (var i = 0; i < json.deviceIDs.length; i++) {
                    $('input[type="checkbox"]').each(function () {
                        if ($(this).attr("value") == json.deviceIDs[i].deviceID) {
                            $(this).get(0).checked = true;
                        }
                    });
                }
            }
        }
    });
}

function ajaxDeletePolygon(id) {
    if (UserID != "") {
        $.ajax({
            type: "delete",
            url: "geofences/"+id,
            data: "",
            error: function (res) {
                //alert(res.responseText);
            },
            success: function (result) {
                if (result.code == 0) {
                    GetPolygon();
                    alert("删除成功!");
                } else {
                    alert("删除失败!");
                }
            }
        });
    }
}

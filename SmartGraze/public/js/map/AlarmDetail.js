$(document).ready(function () {
    var deviceId = parseInt($("#hidDeviceID").val());
    if (deviceId > 0) {
        $("#divDeviceName").hide();
    } else {
        $("#ddlDevices").prepend("<option value='-1'>" + allPage.pleSel + "</option>");
        $("#ddlDevices").val("-1");
    }
    $("#divIframe").easydrag();
    $("#divIframe").setHandler("divIframeTitle");
    initLanguage();
    syncSize();

});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height();
    var divTableHeight = h - 230;
    //$("#divReportTable").css("height", divTableHeight + "px");

    var w = $(this).width();
    $("#divIframe").css("left", (w - 650) / 2 + "px");
    var hMain = $(this).height() - 10;
    $("#col-main").css("min-height", hMain + "px");

}

function initLanguage() {
    $("#btnSearch").html(" " + allPage.search + " ");
    $("#btnToExcel").val("" + allPage.toExcel + "");
}

function clkGetReport() {
    var deviceId = parseInt($("#hidDeviceID").val());
    if (deviceId > 0) {
        ajaxGetReport(deviceId);
    } else {
        var selDeviceID = $("#ddlDevices").val();
        ajaxGetReport(selDeviceID);
    }
}

function checkSelDevice() {
    var isTo = false;
    var deviceId = parseInt($("#hidDeviceID").val());
    if (deviceId > 0) {
        isTo = true;
    } else {
        var selDeviceID = $("#ddlDevices").val();
        if (selDeviceID != "") {
            selDeviceID = parseInt(selDeviceID);
            if (selDeviceID > 0) {
                isTo = true;
            } else {
                alert(allPage.plsDeviceMsg);
            }
        } else {
            alert(allPage.plsDeviceMsg);
        }
    }
    var selTypeID = $("#selAlarmType").val();
    $("#hidSelTypeID").val(selTypeID);
    return isTo;
}

function ajaxGetReport(deviceID) {
    $("#divReportTable").hide();
    $("#divLoading").show();
    var timeZones = $("#hidTimeZone").val();
    var beginTime = $("#beginTime").val();
    var endTime = $("#endTime").val();
    var selTypeID = $("#selAlarmType").val();

    $.ajax({
        type: "post",
        url: "getAlarmByDeviceID",
        data: "DeviceID=" + deviceID + "&TimeZones=" + timeZones + "&StartDates=" + beginTime + "&EndDates=" + endTime + "&TypeID=" + selTypeID ,
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            if (result.d != "") {
                showTable(result.d);
            }
        }
    });
}

function showTable(strs) {
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="2" class="tab" id="datalist">');
    html.push('<tr height="25" style="background:#F5F5F5;">');
    html.push('<th>' + allPage.num + '</th>');
    html.push('<th>' + alarmDetailPage.alarmType + '</th>');
    html.push('<th>' + alarmDetailPage.alarmTime + '</th>');
    html.push('<th>' + allPage.positionTime + '</th>');
    html.push('<th>' + allPage.lat + ',' + allPage.lng + '</th>');
    html.push('<th>' + allPage.address + '</th>');
    html.push('</tr>');
    if (strs != "") {
        var json = strs;
        if (json.reports.length > 0) {
            for (var i = 0; i < json.reports.length; i++) {
                html.push('<tr class="');
                html.push(i % 2 === 0 ? 'listrow0' : 'listrow1');
                html.push('" >');
                html.push('<td>' + (i + 1) + '</td>');
                var typeID = parseInt(json.reports[i].alarmType);
                var typeStr = getExceptionMessageType(typeID, json.reports[i].note);
                html.push('<td>' + typeStr + '</td>');
                html.push('<td>' + json.reports[i].createTime + '</td>');
                html.push('<td>' + json.reports[i].deviceTime + '</td>');
                html.push('<td><a style="text-decoration:underline;"  href="javascript:void(0);" onclick="showDivIframe(\'SimpleMap\',\'' + json.reports[i].latitude + '\',\'' + json.reports[i].longitude + '\');">' + json.reports[i].latitude + ',' + json.reports[i].longitude + '</a></td>');
                var address = json.reports[i].address;
                if (address == "") {
                    address = '<a href="javascript:void(0);" onclick="GetAddress(this,' + json.reports[i].latitude + ',' + json.reports[i].longitude + ')">' + allPage.resolve + '</a>';
                }
                html.push('<td>' + address + '</td>');
                html.push('</tr>');
            }
        } else {
            html.push('<td align="center" height="25" colspan="6" style="color:#ff0000;">' + allPage.noData + '</td>');
        }
    } else {
        html.push('<td align="center" height="25" colspan="6" style="color:#ff0000;">' + allPage.noData + '</td>');
    }

    html.push('</table>');
    $("#divReportTable").html(html.join(""));
    $("#divLoading").hide();
    $("#divReportTable").show();
}

function showDivIframe(url, lat, lng) {
    //iframe缓存
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "SimpleMap") {
        $("#ifmPage").attr("src", "../" + url + "?lat=" + lat + "&lng=" + lng + "&randon=" + randomnumber);
    }
    $("#divIframe").show();
}

function closeDiv(id) {
    $("#" + id).hide();
}

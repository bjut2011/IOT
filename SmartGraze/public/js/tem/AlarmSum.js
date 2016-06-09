$(document).ready(function () {
    initLanguage();
    syncSize();
    ajaxGetReport();
});

window.onresize = syncSize;

function syncSize() {
    var h = $(this).height();
    var divTableHeight = h - 150;
    //$("#divReportTable").css("height", divTableHeight + "px");
    var hMain = $(this).height() - 10;
    $("#col-main").css("min-height", hMain + "px");
}

function initLanguage() {
    document.title = allPage.tab2;
    $("#btnSearch").html(" " + allPage.search + " "); 
    $("#btnToExcel").val("" + allPage.toExcel + "");
}



function ajaxGetReport() {
    $("#divReportTable").hide();
    $("#divLoading").show();
    var userId = $("#hidUserID").val();
    var timeZones = $("#hidTimeZone").val();
    var beginTime = $("#beginTime").val();
    var endTime = $("#endTime").val();
    var deviceId = $("#hidDeviceID").val();
    $.ajax({
        type: "post",
        url: "../Ajax/ReportAjax.asmx/GetAlarmSumReport",
        contentType: "application/json",
        data: "{UserID:" + userId + ",TimeZones:'" + timeZones + "',StartDates:'" + beginTime + "',EndDates:'" + endTime + "',DeviceID:" + deviceId + "}",
        dataType: "json",
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
    html.push('<th>' + allPage.deviceName + '</th>');
    html.push('<th>' + alarmSumPage.lowCount + '</th>');
    html.push('<th>' + alarmSumPage.cutPowerCount + '</th>');
    html.push('<th>' + alarmSumPage.vibCount + '</th>');
    html.push('<th>' + alarmSumPage.sosCount + '</th>');
    html.push('</tr>');
    if (strs != "") {
        var json = eval("(" + strs + ")");
        if (json.reports.length > 0) {
            for (var i = 0; i < json.reports.length; i++) {
                html.push('<tr class="');
                html.push(i % 2 === 0 ? 'listrow0' : 'listrow1');
                html.push('" >');
                html.push('<td>' + (i + 1) + '</td>');
                html.push('<td>' + json.reports[i].name + '</td>');
                html.push('<td>' + json.reports[i].lowBatteryCount + '</td>');
                html.push('<td>' + json.reports[i].cutPowerCount + '</td>');
                html.push('<td>' + json.reports[i].VIBCount + '</td>');
                html.push('<td>' + json.reports[i].SOSCount + '</td>');
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
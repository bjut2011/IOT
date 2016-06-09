var pageCount = 15;

function changeDiv(a, isSearch) {

    var s = $("#" + a).parent().attr("des");
    for (var i = 0; i < 4; i++) {
        var id = "aDevicesAll";
        if (i == 0) {
            id = "aDevicesAll";
        } else if (i == 1) {
            id = "aDeviceExp7";
        } else if (i == 2) {
            id = "aDeviceExp60";
        } else if (i == 3) {
            id = "aDeviceExp";
        }

        var s2 = $("#" + id).parent().attr("des");
        if (s2 == s) {
            if (s2 == "divDeviceExp") {
                $("#" + id).parent().attr("class", "first on end");
            } else {
                $("#" + id).parent().attr("class", "first on");
            }
        } else {
            if (s2 == "divDeviceExp") {
                $("#" + id).parent().attr("class", "end");
            } else {
                $("#" + id).parent().attr("class", "");
            }
        }
    }

    var nowShowDivTable = "";
    var sdays = 0;
    if (a == "aDevicesAll") {
        nowShowDivTable = "divDeviceAllTable";
        sdays = 0;
        $("#divDeviceExp7Table").hide();
        $("#divaDeviceExp60Table").hide();
        $("#divDeviceExpTable").hide();
        $("#divDeviceAllTable").show();
    } else if (a == "aDeviceExp7") {
        nowShowDivTable = "divDeviceExp7Table";
        sdays = 7;
        $("#divDeviceAllTable").hide();
        $("#divaDeviceExp60Table").hide();
        $("#divDeviceExpTable").hide();
        $("#divDeviceExp7Table").show();
    } else if (a == "aDeviceExp60") {
        nowShowDivTable = "divaDeviceExp60Table";
        sdays = 60;
        $("#divDeviceExp7Table").hide();
        $("#divDeviceAllTable").hide();
        $("#divDeviceExpTable").hide();
        $("#divaDeviceExp60Table").show();
    } else if (a == "aDeviceExp") {
        nowShowDivTable = "divDeviceExpTable";
        sdays = -1;
        $("#divDeviceExp7Table").hide();
        $("#divDeviceAllTable").hide();
        $("#divaDeviceExp60Table").hide();
        $("#divDeviceExpTable").show();
    }
    if (showDivTable != nowShowDivTable || isSearch) {
        showDivTable = nowShowDivTable;
        var html = $("#" + showDivTable).html();
        if (html == "" || isSearch) {
            ajaxGetDevices(nowShowDivTable, UserID, 1, sdays);
        }

    }

}

var UserID = 0;
var TimeZone = "";
var showDivTable = "";

$(document).ready(function () {

    $("#btnSubmitUpdaetime").html(" " + allPage.confirm + " ");
    $("#btnCancelUpdaetime").html(" " + allPage.cancel + " ");

    $("#btnSearchDevice").val(userPage.searchDevice);

    $("#btnOneYeah").val(moneyPage.oneYeah);
    $("#btnOneMonth").val(yiwen201312.oneMonth);
    $("#btnLifelong").val(moneyPage.lifelong);

    UserID = $("#hidUserID").val();
    TimeZone = $("#hidTimeZone").val();
    $("#divIframe").easydrag();
    $("#divIframe").setHandler("divIframeTitle");
    ajaxGetDeviceCount();

    var sdays = parseInt($("#hidSDay").val());
    var id = "divDeviceAll";
    if (sdays == -1) {
        showDivTable = "divDeviceExpTable";
    } else if (sdays == 0) {
        showDivTable = "divDeviceAllTable";
    } else if (sdays == 7) {
        showDivTable = "divDeviceExp7Table";
    } else if (sdays == 60) {
        showDivTable = "divaDeviceExp60Table";
    }
    $("#" + showDivTable).show();
    ajaxGetDevices(showDivTable, UserID, 1, sdays);

    syncSize();
});

window.onresize = syncSize;

function syncSize() {
    var w = $(this).width();
    $("#divIframe").css("left", (w - 552) / 2 + "px");
    $("#divShowUpdateTime").css("left", (w - 380) / 2 + "px");
}

function ajaxGetDeviceCount() {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAjax.asmx/GetDeviceCount",
        contentType: "application/json",
        data: "{UserID:" + UserID + "}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            if (result.d != "") {
                var json = eval("(" + result.d + ")");
                $("#spanDevicesAllCount").html(json.all);
                $("#spanDeviceExp7").html(json.exp7);
                $("#spanDeviceExp60").html(json.exp60);
                $("#spanDeviceExp").html(json.expAll);
            }
        }
    });
}

function searchDevice() {
    changeDiv('aDevicesAll', true);
}

function ajaxGetDevices(id, userID, pageNo, expDays) {
    if (userID == 0) {
        return;
    }
    var sn = $("#SearchText").val();
    $.ajax({
        type: "post",
        url: "/devices/getDevices",
        contentType: "application/json",
        data: "{\"UserID\":\"" + userID + "\",\"PageNo\":\"" + pageNo + "\",\"PageCount\":\"" + pageCount + "\",\"SN\":\"" + sn + "\"}",
        dataType: "json",
        error: function (res) {
            //alert(res.responseText);
        },
        success: function (result) {
            var res = result.info;
            if (res != "") {
                showDevicesTable(res, id, expDays);
            }
        }
    });
}

function showDevicesTable(res, id, expDays) {
    var json = res;
    
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="2" class="tab2" id="datalist">');
    html.push('<thead><tr height="35">');
    html.push('<th>' + allPage.no + '</th>');
    html.push('<th>' + allPage.targetName + '</th>');
    html.push('<th>' + allPage.imeiNo + '</th>');
    html.push('<th>' + allPage.activeTime + '</th>');
    html.push('<th>' + allPage.hireExpireTime + '</th>');
    html.push('<th>' + allPage.operation + '</th>');
    html.push('</tr></thead>');


    if (json.devices.length > 0) {
        for (var i = 0; i < json.devices.length; i++) {

            html.push('<tr class="');
            html.push(i % 2 === 0 ? 'listrow0' : 'listrow1');
            html.push('" >');
            html.push('<td>' + json.devices[i].num + '</td>');
            html.push('<td>' + json.devices[i].name + '</td>');
            html.push('<td>' + json.devices[i].sn + '</td>');
            html.push('<td>' + json.devices[i].activeDate + '</td>');
            if (json.devices[i].hireExpireDate != "") {
                html.push('<td>' + json.devices[i].hireExpireDate + '</td>');
            } else {
                html.push('<td>' + allPage.deviceHireDay + ':' + json.devices[i].hireDay + '</td>');
            }
            var useStr = '<a href="javascript:void(0);" onclick="showDivIframe(\'ProductUpdate.aspx\',' + json.devices[i].id + ');">' + allPage.edit + '</a>';
            useStr += '&nbsp;|&nbsp;<a href="javascript:void(0);" onclick="addSelDeviceToUpdateTime(' + json.devices[i].id + ',\'' + json.devices[i].name + '\',\'' + json.devices[i].sn + '\')"">' + allPage.hireExpireTime + '</a>';
            html.push('<td>' + useStr + '</td>');
            html.push('</tr>');
        }
        var pageStr = "";
        var size = parseInt(json.resSize);
        var pageSize = size % pageCount == 0 ? size / pageCount : size / pageCount + 1;
        var userID = json.userID;
        pageStr = showDeviceListPageNum(id, userID, parseInt(json.nowPage), pageSize, expDays);
        html.push('<tr><td colspan="7" bgcolor="#FFFFFF" align="center">' + pageStr + '</td></tr>');
    } else {
        html.push('<td align="center" height="25" colspan="7" style="color:#ff0000;">' + allPage.noData + '</td>');

    }

    html.push('</table>');

    
    $("#" + id).html(html.join(""));
}

var selUpdatetimeDeviceID = 0;
function addSelDeviceToUpdateTime(id, deviceName, SN) {
    var userName = $("#hidUserName").val();
    selUpdatetimeDeviceID = id;
    var html = [];
    html.push('<table width="100%" border="0">'); 
    html.push('<tr bgcolor="#f5f5f5">');
    html.push('<td>' + allPage.deviceName + '</td>'); 
    html.push('<td>' + allPage.imeiNo + '</td>');
    html.push('<td>' + allPage.belongTo + '</td>'); 
    html.push('</tr>');
    html.push('<tr>');
    html.push('<td>' + deviceName + '</td>');
    html.push('<td>' + SN + '</td>');
    html.push('<td>' + userName + '</td>');
    html.push('</tr>');
    html.push('</table>');
    $("#divUpdatetimeTable").html(html.join(''));
    $('#divShowUpdateTime').show();
}

function updateDevicesDatetime() {
    var selIDs = selUpdatetimeDeviceID;
    if (selIDs > 0) {
        document.getElementById("btnSubmitUpdaetime").disabled = true;
        var hireday = parseInt($("#txtAddHireDays").val());
        if (hireday > 0) {
            $.ajax({
                type: "post",
                url: "Ajax/DevicesAjax.asmx/UpdateHireExpriDateDays",
                contentType: "application/json",
                data: "{UserID:" + UserID + ",DeviceIDs:'" + selIDs + "',AddHireDays:" + hireday + "}",
                dataType: "json",
                error: function (res) {
                    document.getElementById("btnSubmitUpdaetime").disabled = false;
                },
                success: function (result) {
                    var res = parseInt(result.d);
                    if (res == 0) {
                        alert(moneyPage.msg3);
                        $('#divShowUpdateTime').hide();
                    } else if (res == 1) {
                        alert(cusPage.updateError);
                    } else if (res == 2) {
                        alert(yiwen201312.monthCardnod);
                    } else if (res == 3) {
                        alert(yiwen201312.yearCardnod);
                    } else if (res == 4) {
                        alert(yiwen201312.lifelongCardnod);
                    }
                    document.getElementById("btnSubmitUpdaetime").disabled = false;
                }
            });
        } else {
            alert(moneyPage.msg5);
            document.getElementById("btnSubmitUpdaetime").disabled = false;
        }
    } else {
        alert(allPage.plsDeviceMsg);
    }

}


function showDivIframe(url, id) {
    //iframe缓存
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "ProductUpdate.aspx") {
        $("#spanIframeTitle").html(allPage.divicesInfo);
        $("#divIframe").css("height", "368px");
        $("#ifmPage").attr("height", "340");
        $("#ifmPage").attr("src", url + "?deviceid=" + id + "&randon=" + randomnumber);
    } else if (url == "UsersUpdate.aspx") {
        
    }
    $("#divIframe").show();
}

function ifmUpdateClose(id) {
    $("#" + id).hide();
    if (id == "divIframe") {
        $("#ifmPage").attr("src", "");
    }
}

function closeDiv(id) {
    $("#" + id).hide();
}

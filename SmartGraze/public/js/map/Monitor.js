
var id = 0;
var loginName = "";
var loginType = 0;
var loginDeviceID = 0;
var forTimer = 30000;
var forTimeSecond = null;

$(document).ready(function () {
    syncSize();
    loginType = parseInt($("#hidLoginType").val());
    id = $("#hidUserID").val();
    if (loginType == 1) {
    } else if (loginType == 2) {
        loginDeviceID = $("#hidDeviceID").val();
    }
    loginName = $("#hidLoginName").val();
    loginName = encodeURIComponent(loginName);

    $("#divExceptionMessageDiv").easydrag();
    $("#divExceptionMessageDiv").setHandler("divExceptionMessageDivTitle");

    $("#divIframe").easydrag();
    $("#divIframe").setHandler("divIframeTitle");

    $("#divIframeReport").easydrag();
    $("#divIframeReport").setHandler("divIframeReportTitle");

    $("#divPass").easydrag();
    $("#divPass").setHandler("divPassTitle");

    $("#tdMore").bind("mouseleave", function () {
        closeDiv('divMore');
    });
    initLanguage();

    $("#spanSecond").html(forTimer / 1000);
    if (loginType == 1) {
        AjaxGetExceptionMessage();
        forTimeSecond = setInterval(second, 1000); 
    } else {
        AjaxGetExceptionMessageByDeviceID();
        forTimeSecond = setInterval(second, 1000);
    }

});


var secondIndex = 1;
function second() {
    var s = forTimer / 1000 - secondIndex;
    $("#spanSecond").html(s);
    secondIndex++;
    if (s == 1) {
        if (loginType == 1) {
            AjaxGetExceptionMessage();
        } else {
            AjaxGetExceptionMessageByDeviceID();
        }
        secondIndex = 0;
    }
}

function showExceptionMessageDiv2(v) {
    showExceptionMessageDiv(v);

    if (forTimeSecond) {
        clearInterval(forTimeSecond);
    }
    forTimeSecond = setInterval(second, 1000);
}

function initLanguage() {
    $("#sendBtn").html(" " + allPage.save + " ");
    $("#closeBtn").html(" " + allPage.cancel + " ");
}


window.onresize = syncSize;

function syncSize() {
    var h = $(this).height() - 60;
    $("#pageShowFrame_Map").css("height", h + "px");
    $("#pageShowFrame_Report").css("height", h + "px");
    $("#pageShowFrame_Device").css("height", h + "px");
    $("#pageShowFrame_Other").css("height", h + "px");
    $("#pageShowFrame_Money").css("height", h + "px");

    var w = $(this).width() - 118;
    // $("#divMore").css("marginLeft", w + "px");

    var h2 = $(this).height() - 30;
    var w2 = $(this).width() - 410;
    $("#divExceptionMessageDiv").css("left", w2 + "px");
    $("#divExceptionMessageDiv").css("top", h2 + "px");

    var w3 = $(this).width();
    $("#divIframeReport").css("left", (w3 - 950) / 2 + "px");

    var w5 = $(this).width();
    $("#divPass").css("left", (w5 - 310) / 2 + "px");
}


function ifmUpdateClose(id) {
    $("#" + id).hide();
}

function ShowUserInfo(t) {
    var userID = $("#hidUserID").val();
    var w = $(this).width();
    if (loginType == 2) {
        if (t == 0) {
            var randomnumber = Math.floor(Math.random() * 100000); 
            $("#spanIframeTitle").html(allPage.divicesInfo);
            $("#divIframe").css("width", "552px").css("height", "368px");
            $("#ifmPage").attr("height", "340");
            $("#divIframe").css("left", (w - 552) / 2 + "px");
            $("#ifmPage").attr("src", "ProductUpdate.aspx" + "?id=" + userID + "&deviceid=" + loginDeviceID + "&randon=" + randomnumber);
            $("#divIframe").show();
        } else if (t == 1) {
            showDiv("divPass");
        }
        return;
    }

    $("#ifmFxtjPage").hide();
    $("#ifmPage").show();

    var loginName = $("#hidLoginName").val();
    loginName = encodeURIComponent(loginName);
    if (t == 0) {
        $("#divIframe").css("width", "552px").css("height", "418px");
        $("#ifmPage").css("width", "545px").css("height", "378px");
        $("#divIframe").css("left", (w - 552) / 2 + "px");

        $("#spanIframeTitle").html(allPage.userInfo);
    } else if (t == 1) {
        $("#divIframe").css("width", "352px").css("height", "260px");
        $("#ifmPage").css("width", "340px").css("height", "230px");
        $("#divIframe").css("left", (w - 352) / 2 + "px");
        $("#spanIframeTitle").html(allPage.changePassword);
    } else if (t == 2) {
        $("#divIframe").css("width", "452px").css("height", "250px");
        $("#ifmPage").css("width", "440px").css("height", "220px");
        $("#divIframe").css("left", (w - 452) / 2 + "px");
        $("#spanIframeTitle").html(allPage.userType2);
    }
    var p = IDEncryption(userID);
    $("#ifmPage").attr("src", "UserInfo.aspx?id=" + userID + "&n=" + loginName + "&type=" + t + "&p=" + p);
    $("#divIframe").show();
}

function showDivIframe(url) {
    var w = $(this).width();
    var randomnumber = Math.floor(Math.random() * 100000);
    if (url == "WarnSet.aspx") {
        $("#ifmFxtjPage").hide();
        $("#ifmPage").show();

        $("#spanIframeTitle").html("防盗设置");
        $("#divIframe").css("width", "752px").css("height", "450px");
        $("#ifmPage").css("width", "740px").css("height", "420px");
        $("#divIframe").css("left", (w - 752) / 2 + "px");

        var userID = $("#hidUserID").val();
        var loginName = $("#hidLoginName").val();
        loginName = encodeURIComponent(loginName);
        $("#ifmPage").attr("src", url + "?id=" + userID + "&n=" + loginName + "&randon=" + randomnumber);
    } else if (url == "DevicesFxtj") {
        $("#ifmPage").hide();
        $("#ifmFxtjPage").show();
        $("#liReport").css('background-color', "");
        $("#liDevice").css('background-color', "");
        $("#liMonitor").css('background-color', "");
        $("#liFxtj").css('background-color', "#1f8ccc");
        $("#spanIframeTitle").html("分析统计");
        $("#divIframe").css("width", "652px").css("height", "450px");
        $("#divIframe").css("left", (w - 652) / 2 + "px");
        //var page = $("#ifmFxtjPage").attr("src");
        //if (page == "null.html") {
            var userID = $("#hidUserID").val();
            var loginName = $("#hidLoginName").val();
            loginName = encodeURIComponent(loginName);
            $("#ifmFxtjPage").attr("src", url + "?user_id=" + userID + "&n=" + loginName);
        //}
    }
    $("#divIframe").show();
}

function ClkShowPage(t) {

    var url = "";
    if (t == 9) {
        url = "UserInfo.aspx?id=" + id + "&n=" + loginName + "&type=" + 0;
    } else if (t == 10) {
        url = "UserInfo.aspx?id=" + id + "&n=" + loginName + "&type=" + 1;
    } else if (t == 1) {
        url = "devices?id=" + id + "&n=" + loginName + "&sday=" + 0;
    } else if (t == 2) {
        url = "devices?id=" + id + "&n=" + loginName + "&sday=" + 7;
    } else if (t == 3) {
        url = "devices?id=" + id + "&n=" + loginName + "&sday=" + 60;
    } else if (t == 4) {
        url = "devices?id=" + id + "&n=" + loginName + "&sday=" + -1;
    } else if (t == 11) {
        url = "WarnMessage.aspx?id=" + id + "&n=" + loginName;
    } else if (t == 12) {
        url = "MoneyTransaction.aspx?id=" + id + "&n=" + loginName;
    } else if (t == 13) {
        url = "MoneyReport.aspx?id=" + id + "&n=" + loginName;
    }
    $("#MainBox").attr("src", url);
}

function ShowMessage() {
    //$("#MainBox").attr("src", "WarnMessage.aspx?id=" + id + "&n=" + loginName);
}

function showDiv(id) {

    $("#" + id).show();
}
function closeDiv(id) {
    $("#" + id).hide();
}

function redirect(v) {
    for (var i = 0; i < 5; i++) {
        var liid = "";
        var divID = "";
        if (i == 0) {
            liid = "liMonitor";
            divID = "pageShowFrame_Map";
        } else if (i == 1) {
            liid = "liReport";
            divID = "pageShowFrame_Report";
        } else if (i == 2) {
            liid = "liDevice";
            divID = "pageShowFrame_Device";
        } else if (i == 3) {
            liid = "liMoney";
            divID = "pageShowFrame_Money";
        } else {
            divID = "pageShowFrame_Other";
        }
        if (v == liid) {
            if (liid != "") {
                $("#" + liid).css('background-color', "#1f8ccc");
            } else {
                $("#" + divID).attr("src", "null.html");
            }
            $("#" + divID).parent().show();
            var html = $("#" + divID).attr("src");
            if (html == "null.html") {
                if (divID == "pageShowFrame_Map") {
                    var p = IDEncryption(id);
                    $("#" + divID).attr("src", "map.aspx?id=" + id + "&n=" + loginName + "&p=" + p);
                } else if (divID == "pageShowFrame_Report") {
                    if (loginType == 1) {
                        $("#" + divID).attr("src", "/Report?id=" + id + "&deviceid=0");
                    } else {
                        $("#" + divID).attr("src", "/Report?id=" + id + "&deviceid=" + loginDeviceID);
                    }
                } else if (divID == "pageShowFrame_Device") {
                    $("#" + divID).attr("src", "devices?id=" + id + "&n=" + loginName + "&sday=0");
                } else if (divID == "pageShowFrame_Money") {
                    $("#" + divID).attr("src", "MoneyTransaction.aspx?id=" + id + "&n=" + loginName);
                } else {
                    var randomnumber = Math.floor(Math.random() * 100000);
                    //消息页面,每次都刷新
                    if (loginType == 1) {
                        var p = IDEncryption(id);
                        $("#" + divID).attr("src", "WarnMessage.aspx?id=" + id + "&n=" + loginName + "&p=" + p + "&randon=" + randomnumber);
                    } else {
                        var p = IDEncryption(loginDeviceID);
                        $("#" + divID).attr("src", "WarnMessage.aspx?id=" + id + "&n=" + loginName + "&deviceid=" + loginDeviceID + "&p=" + p + "&loginType=1&randon=" + randomnumber);
                    }
                   
                }
            }

        } else {
            if (liid != "") {
                $("#" + liid).css('background-color', "");
            }
            $("#" + divID).parent().hide();
        }
    }
}


function showIframeReport(url) {
    $("#ifmReportPage").show();
    $("#ifmReportPage").attr("src", url);
    $("#divIframeReport").show();
}

function changeDevicePass() {
    var oldPass = $("#txtoldpassword").val();
    var newPass = $("#txtnewpassword").val();
    var newPass2 = $("#txtnewpassword2").val();
    if (oldPass == "" || newPass == "" || newPass2 == "") {
        alert(userInfoPage.passNull);
    } else {
        if (newPass != newPass2) {
            alert(userInfoPage.passError);
        } else {
            ajaxChangeDevicePass(oldPass, newPass);
        }
    }

}

function ajaxChangeDevicePass(oldPass, newPass) {
    $.ajax({
        type: "post",
        url: "Ajax/DevicesAjax.asmx/ChangeDevicePassword",
        contentType: "application/json",
        data: "{DeviceID:" + loginDeviceID + ",OldPass:'" + oldPass + "',NewPass:'" + newPass + "'}",
        dataType: "json",
        success: function (result) {
            var res = parseInt(result.d);
            if (res == 3) {
                alert(userInfoPage.changePassSuccess);
            } else if (res == 1) {
                alert(userInfoPage.oldPassError);
            } else {
                alert(userInfoPage.changePassError);
            }
            closeDiv('divPass');
            $("#txtoldpassword").val("");
            $("#txtnewpassword").val("");
            $("#txtnewpassword2").val("");
        }
    });
}

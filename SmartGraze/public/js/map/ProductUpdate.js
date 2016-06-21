$(document).ready(function () {
    initLanguage();
    var iconID = parseInt($("#hidIcon").val());
    var radios = document.getElementsByName("iconType");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].value == iconID) {
            radios[i].checked = true;
        }
    }

});

function initLanguage() {

    $("#btnSave").val(" " + allPage.save + " ");
}

function checkSubmit() {
    var carNum = $("#txtCarNum").val();
    var device_id = $("#device_id").val();
    var mobile = $("#txtCellPhone").val();
    $.ajax({
        type: "put",
        url: "/devices/"+device_id,
        contentType: "application/json",
        data: "{\"mobile\":\"" + mobile + "\"}",
        dataType: "json",
        success: function (result) {
            //var res = parseInt(result.d);
            alert("保存成功");
        }
    });
    return true;

}

function saveSuccess() {
    alert(productUpdatePage.sccuess);
    parent.ifmUpdateClose("divIframe");
}

function saveFailed() {

    alert(productUpdatePage.faild);
}

function closePage() {
    parent.ifmUpdateClose("divIframe");
}

function existCarNum() {
    alert(productUpdatePage.isExistMsg);
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

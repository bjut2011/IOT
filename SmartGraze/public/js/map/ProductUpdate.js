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
    var val = $('input:radio[name="iconType"]:checked').val();
    $("#hidIcon").val(val);
    var carNum = $("#txtCarNum").val();
    var carNumLength = fucCheckLength(carNum);
    var byDistance = parseFloat($("#txtByDistance").val());
    //避免车牌号,IMEI号重复
    if (carNumLength >= 15) {
        alert(productUpdatePage.carNumMsg1);
        return false;
    } else if (byDistance != 0 && byDistance < 500) {
        alert("保养提示间隔需大于500公里!");
        return false;
    }
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
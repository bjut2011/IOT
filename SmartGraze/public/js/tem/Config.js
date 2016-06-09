var GPSXITONGAPI = "/Ajax/POIService.asmx/GetAddressByLatlng";

function GetAddressByGoome(lat, lng) {
    $.ajax({
        type: "post",
        url: GPSXITONGAPI,
        contentType: "application/json",
        data: "{Lat:" + lat + ",Lng:" + lng + ",MapType:'BAIDU',Language:'ZH-CN'}",
        dataType: "json",
        error: function (res) {
        },
        success: function (result) {
            $('#divMarkerAddress').html(result.d);
        }
    });

}


function GetAddressByGoomeGoogle(t, lat, lng) {
    $.ajax({
        type: "post",
        url: GPSXITONGAPI,
        contentType: "application/json",
        data: "{Lat:" + lat + ",Lng:" + lng + ",MapType:'GOOGLE',Language:'ZH-CN'}",
        dataType: "json",
        error: function (res) {
        },
        success: function (result) {
            $(t).parent().html(result.d);
        }
    });
}

function GetAddressByAPIBaidu(t, lat, lng) {
    $.ajax({
        type: "post",
        url: GPSXITONGAPI,
        contentType: "application/json",
        data: "{Lat:" + lat + ",Lng:" + lng + ",MapType:'BAIDU',Language:'ZH-CN'}",
        dataType: "json",
        error: function (res) {
        },
        success: function (result) {
            $(t).parent().html(result.d);
        }
    });
}


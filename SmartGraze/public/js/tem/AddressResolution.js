function GetAddress(t, lat, lng) {
    var language = $("#hidLanguage").val();
    if (language == "zh-cn") {
        GetAddressByGoomeGoogle(t, lat, lng);
    } else {
        GetAddressByGoogle(t, lat, lng);
    }
}


var geocoder = new google.maps.Geocoder();
//获取地址信息
function GetAddressByGoogle(t, lat, lng) {
    if (!geocoder) {
        geocoder = new google.maps.Geocoder();
    }
    if (lat != 0) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $(t).parent().html(results[1].formatted_address);
                } else {

                }
            } else {

            }
        });
    }
}

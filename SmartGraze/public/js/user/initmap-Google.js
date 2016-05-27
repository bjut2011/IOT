var oLat = 22.502;
var oLng = 113.932;
var oZoom = 4;

function initGoogleMap(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }
        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: oZoom,
            center: latlng,
            navigationControl: true,
            scaleControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,  //MapType 控件以下拉列表形式展现  
                position: google.maps.ControlPosition.TOP_RIGHT  //MapType 控件显示在底部  
            },
            streetViewControl: true,   //小人
            streetViewControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT
            },
            panControl: false, //平移控件
            PanControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT  //显示在顶部右侧 
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.TOP_LEFT//显示在顶部右侧 
            },
            scaleControl: true,
            scaleControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT//显示在顶部左侧  
            }
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.minZoom = 2;
        /* 实时交通,路况信息
        var trafficLayer = new google.maps.TrafficLayer();  
        trafficLayer.setMap(map); 
        */
    } catch (e) {
        //initGoogleMap(lat, lng, zoom);

    }
}

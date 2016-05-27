var oLat = 29.502;
var oLng = 118.932;
var oZoom = 6;

function initBaiduMap(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }

        map = new BMap.Map("map_canvas");            // 创建Map实例
        var point = new BMap.Point(lng, lat);    // 创建点坐标
        map.centerAndZoom(point, zoom);                     // 初始化地图,设置中心点坐标和地图级别。


        map.addControl(new BMap.NavigationControl({ offset: new BMap.Size(10, 30) }));                 // 添加平移缩放控件
        map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
        map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
        map.enableScrollWheelZoom(); //激活滚轮
        map.enableContinuousZoom(); //连续平滑
        map.enableInertialDragging();   //开启惯性拖拽效果
        map.setMinZoom(5);
        //map.addControl(new BMap.MapTypeControl()); //地图,卫星,三维
        map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }));

        var ctrl = new BMapLib.TrafficControl({
            showPanel: false 
        });
        map.addControl(ctrl);
        //ctrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
        ctrl.setOffset(new BMap.Size(120, 40));  
    } catch (e) {
        //initBaiduMap(lat, lng, zoom);
    }
}


function initBaiduMap2(lat, lng, zoom) {
    try {
        //初始化地图
        if (lat == "" || lat == 0) {
            lat = oLat;
            lng = oLng;
        }
        if (zoom == 0) {
            zoom = oZoom;
        }

        map = new BMap.Map("map_canvas");            // 创建Map实例

        myDis = new BMapLib.DistanceTool(map);
        map.addEventListener("load", function () {
            //myDis.open();  //开启鼠标测距
            //myDis.close();  //关闭鼠标测距大
        });

        var point = new BMap.Point(lng, lat);    // 创建点坐标
        map.centerAndZoom(point, zoom);                     // 初始化地图,设置中心点坐标和地图级别。


        map.addControl(new BMap.NavigationControl({ offset: new BMap.Size(10, 30) }));                 // 添加平移缩放控件
        map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
        map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
        map.enableScrollWheelZoom(); //激活滚轮
        map.enableContinuousZoom(); //连续平滑
        map.enableInertialDragging();   //开启惯性拖拽效果
        map.setMinZoom(5);
        //map.addControl(new BMap.MapTypeControl()); //地图,卫星,三维
        map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }));

        var ctrl = new BMapLib.TrafficControl({
            showPanel: false
        });
        map.addControl(ctrl);
        //ctrl.setAnchor(BMAP_ANCHOR_TOP_LEFT);
        ctrl.setOffset(new BMap.Size(120, 40));  
    } catch (e) {
        //initBaiduMap(lat, lng, zoom);
    }
}

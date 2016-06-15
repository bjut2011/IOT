var icoNum = 0;
var reConnectOptions = [1,3,5,10,15,20,30];
var periodOptions = [1,3,5,10,15,20,30,60];
var sensorSignMax = 4;//小数位最多有效位
var sensorTypeOptions = ["数值型","开关型","定位型","状态型"];
var reConnectDefault = 3;
var periodDefault = 60;
var reConnectInputHtml = '<input class="form-control" name="deviceDelay" value="3" />',
	reConnectSelectHtml = '<select class="form-control" name="deviceDelay">';
var i;
$(function(){
	
	for(i = 0;i < reConnectOptions.length;i++){
		reConnectSelectHtml += '<option value="' + reConnectOptions[i] +'" ';
		if( reConnectOptions[i] == reConnectDefault){
			reConnectSelectHtml += 'selected="selected"';
		}
		reConnectSelectHtml += '>' + reConnectOptions[i] + '(分钟)</option>';
	}
	reConnectSelectHtml += '</select>';

	var periodInputHtml = '<input class="form-control" name="deviceDuration" value="60"  onblur="check(this)"  onkeyup="this.value=this.value.replace(/[^0-9.]/g,\'\')" />',
		periodSelectHtml = '<select class="form-control" name="deviceDuration">';
	for(i = 0;i < periodOptions.length ; i++){

		periodSelectHtml += '<option value="' + periodOptions[i] +'" ';
		if( periodOptions[i] == periodDefault){
			periodSelectHtml += 'selected="selected"';
		}
		periodSelectHtml += '>' + periodOptions[i] + '(秒)</option>';
	}
	periodSelectHtml += '</select>';

	var singleSensorHtml;

	var $reConnect = $("#deviceDelay");
	var $period = $("#devicePeriod");
	var $connectProtocol = $("#deviceConnectProtocol");
	var $sensorList = $("#deviceSensorList");
	var $comOption = $("#comOption");
	var $addDeviceForm = $("#add-device-form");
	var $devicePositionLng = $addDeviceForm.find('[name = "devicePositionLng"]');
	var $devicePositionLat = $addDeviceForm.find('[name = "devicePositionLat"]');


	$addDeviceForm.on('click','[name="reConnectOption"]',function(){
		if($(this).val() == 1){
			$reConnect.empty();
			$reConnect.append(reConnectSelectHtml);
		}else{
			$reConnect.empty();
			$reConnect.append(reConnectInputHtml);
		}
	});


	$addDeviceForm.on('click','[name="periodOption"]',function(){
		$period.empty();
		if($(this).val() == 1){		
			$period.append(periodSelectHtml);
		}else{
			$period.append(periodInputHtml);
		}
	});

	$addDeviceForm.submit(function(e){
		var $deviceName = $addDeviceForm.find('input[name="deviceName"]');
		if($deviceName.val()==""){
			$deviceName.focus().parent().addClass("has-error")
			$deviceName.one("keydown",removeErrorHandle);
			e.preventDefault();
			return;
		}
		var $deviceDelay = $addDeviceForm.find('input[name="deviceDelay"]');
		if($deviceDelay && $deviceDelay.val()==""){
			$deviceDelay.focus().parent().addClass("has-error");
			$deviceDelay.one("keydown",removeErrorHandle);
			e.preventDefault();
			return;
		}
		var $deviceDuration = $addDeviceForm.find('input[name="deviceDuration"]');
		if($deviceDuration && $deviceDuration.val()==""){
			$deviceDuration.focus().parent().addClass("has-error");
			$deviceDuration.one("keydown",removeErrorHandle);
			e.preventDefault();
			return;
		}

		$addDeviceForm.find('input[name="sensorName"]').each(function(){
			var $this = $(this);
			if($this.val() == ""){
				$this.focus().parent().addClass("has-error");
				$this.one("keydown",removeErrorHandle);
				e.preventDefault();
				return;
			}
		})
		$addDeviceForm.find('input[name="sensorUnit"]').not(":hidden").each(function(){
			var $this = $(this);
			if($this.val() == ""){
				$this.focus().parent().addClass("has-error");
				$this.one("keydown",removeErrorHandle);
				e.preventDefault();
				return;
			}
		})
		var $isShare = $addDeviceForm.find('input[name="deviceIsShare"]');
		if($isShare.val() == 1){
			if(!$devicePositionLng.val() && $devicePositionLat.val()){
				alert("您选择了公开设备，请在地图上点击设置坐标");
				e.preventDefault();
				return;
			}
		}
	});

	$("#addSingleSensorBtn").on('click',function(){
		$sensorList.append(generateSensorItem());
		init(icoNum);
	});

	$("#addSensorMutilFormBtn").on('click', function() {

		var $form = $("#addSensorMutilForm");

		var num = $form.find('[name="comNum"]').val();
		var namePre = $form.find('[name="comNamePre"]').val();
		var type = $form.find('[name="comSensorType"]').val();

		var sign, unit, gear;
		if(type == 1){
			sign = $form.find('[name="comSensorSign"]').val();
			unit = $form.find('[name="comSensorUnit"]').val();
		}else if(type == 2){
			gear = $form.find('[name="comSensorGear"]').val();
		}

		$("#mutilSensorDialog").modal('hide');

		if((num = Math.floor(num)) > 0){
			for(var i = 0; i < num; i ++){
				$sensorList.append(generateSensorItem({
					namePre:namePre + (i + 1),
					type:type,
					sign:sign || 0,
					unit:unit || '个',
					gear:gear || '2'
				}))
				init(icoNum);
			}
		}
	});

	$("#addSensorMutilForm").find('[name="comSensorType"]').bind('change',function(){
		$comOption.empty();
		if($(this).val() == 1){
			$comOption.append(generateWraper('form-group').append(generateComLabel('小数位')).append(generateComSign()))
					  .append(generateWraper('form-group').append(generateComLabel('单位')).append(generateComUnit()));
		}else if($(this).val() == 2){
			$comOption.append(generateWraper('form-group'));
		}

	});

    //删除传感器
	$sensorList.on('click',"button",function(){
	   if(confirm('您确定要删除传感器吗？')){
			var $this = $(this);
			var deviceId = $this.attr("data-device-id");
			var sensorId = $this.attr("data-sensor-id");
			if(deviceId && sensorId){
			    var sensorIds = $("#deleteSensorId").val();
			    sensorIds += sensorId + ",";
			    $("#deleteSensorId").val(sensorIds);
				$this.parent().parent().remove();
			}else{
				$this.parent().parent().remove();	
			}
                        $.ajax({
                           url: '/sensors/'+sensorId,
                           type: 'DELETE',
                           success: function(result) {
                             // Do something with the result
                           }
                        });
		}
	});


	function generateComLabel(text){
		return '<label class="col-md-3 control-label">'+ text +'</label>';
	}

	function generateComSign(){
		var tmpHtml = '<select class="form-control" name="comSensorSign">';
		for(var i=0; i<= sensorSignMax;i++){
			tmpHtml += '<option value="' + i +'">' + i + '(小数位)</option>';
		}
		tmpHtml += '</select>';
		return generateWraper('col-md-9').append(tmpHtml);
	}

	function generateComUnit(){
		return generateWraper('col-md-9').append($("<input>").addClass('form-control').attr({
				type:"text",
				name:"comSensorUnit",
				placeholder:"单位"
			}));
	}

	
	function removeErrorHandle(){
		$(this).parent().removeClass("has-error");
	}

	// 百度地图API功能
	var map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(114.063356,22.552596), 12);
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	function myFun(result){
		var cityName = result.name;
		map.setCenter(cityName);
		if($devicePositionLng.val()!="" && $devicePositionLng.val()!=0 && $devicePositionLat.val()!="" && $devicePositionLat.val()!="0"){
			var point = new BMap.Point($devicePositionLng.val(),$devicePositionLat.val());
			map.centerAndZoom(point,12);
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
		}
		else{
			var point = new BMap.Point(114.063356,22.552596);
			map.centerAndZoom(point,12);
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			$devicePositionLng.val(114.063356);
			$devicePositionLat.val(22.552596);
		}
		
	}
	var myCity = new BMap.LocalCity();
	//myCity.get(myFun);
	
	//单击获取点击的经纬度
	map.addEventListener("click",function(e){
		map.clearOverlays();
		var point = new BMap.Point(e.point.lng,e.point.lat);
		$devicePositionLng.val(e.point.lng);
		$devicePositionLat.val(e.point.lat);
		map.centerAndZoom(point, 12);
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
	});
	
	function showInfo(lng,lat){
		map.clearOverlays();
		var point = new BMap.Point(lng,lat);
		$devicePositionLng.val(lng);
		$devicePositionLat.val(lat);
		map.centerAndZoom(point, 12);
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
	}
});

	function generateSensorItem(opts){
		var option = $.extend({
			namePre:"",
			type:1,
			sign:"",
			gear:"",
			unit:"",
			sensorId:"",
		},opts || {});
        icoNum++;
        var more = '&nbsp;&nbsp;&nbsp;<a style="display:none">MORE...</a>';
        if('1' == option.type){
           more = '&nbsp;&nbsp;&nbsp;<a data-toggle="collapse" href="#collapse'+icoNum+'" aria-expanded="false" style="display:none">MORE...</a>';
        }
		var html = '<div class="col-md-11 pd0"><div class="col-md-11 addSensor_line"><div class="row">'+generateSensorName(option.namePre,option.sensorId)+
		            generateSensorType(option.type,icoNum)+generateSensorSign(option.type,option.sign)+generateSensorUnit(option.type,option.unit)+
		            '<div class="pull-right"> <img width="45px" height="45px" data-container="body" data-toggle="popover" style="cursor: pointer;" src="'+'../img/temperature.png" id="_icoUrl'+icoNum+'" />'+
		            '<input type="hidden" name="icoUrl" id="icoUrl'+icoNum+'" value="/images/temperature.png" />&nbsp;&nbsp;'+
		            generateDeleteBtn()+more+'</div>'+createAddMapping(option.type,icoNum)+'</div></div></div>';
	   return html;			
	}
	
	
	function createAddMapping(type,id){
		  var basePath = $("#basePath").val();
	      var html = '<div class="col-sm-12 pd0 collapse" id="collapse'+id+'"><div class="well"><span data-toggle="modal" data-target="#addMapping" onclick="addMapping('+id+')"><img style="width: 20px;height: 20px;" src="'+basePath+'/images/add_ys.png">添加映射</span><span><input type="hidden" name="fieldId" >';
		  if('1' == type){
			 html +='<input type="hidden" name="field1" id="field1'+id+'"  /><input type="hidden" name="field2" id="field2'+id+'" />'+
		            '<input type="hidden" name="field3" id="field3'+id+'"  /><input type="hidden" name="field4" id="field4'+id+'" />';
	      }else{
	         html+='<input type="hidden" name="field1" id="_sensorGearVal'+id+'"  /><input type="hidden" name="field2" /><input type="hidden" name="field3" /><input type="hidden" name="field4" />';
	      }
	      html+='<span id="_mapping'+id+'"></span></span><span style="padding-left: 200px"><a href="javascript:delMapping('+id+')">删除映射</a></span></div></div>';
	      return html; 		 
	}
	
	
	function generateWraper(className){
		return $("<div>").addClass(className);
	}

	function generateSensorName(namePre,sensorId){
         return '<div class="col-md-2"><div class="form-group"><input class="form-control" type="text" name="sensorName" id="sensorName" value="'+namePre+'" placeholder=传感器名称 /><input type="hidden" name="sensorId"  value="'+sensorId+'"></div></div>';
	}

	function generateSensorType(type,id){
		var tmpHtml = "",
			$sensorType = "",
			selected = type || 0;
		for(var i = 1; i<= sensorTypeOptions.length;i++){
			tmpHtml += '<option value="' + i;
			if(selected == i){
				tmpHtml += '" selected="selected';
			}
			tmpHtml += '">' + sensorTypeOptions[i-1] + '</option>';
		}
		return '<div class="col-md-2"><div class="form-group"><select class="form-control" name="sensorType" onchange="typeChangeHandler(this)" id="_sensorType'+id+'">'+tmpHtml+'</select></div></div>';
	}


	function generateSensorSign(type,sign){
		var sign = sign || 0;
		if(type == 1){
			var tmpHtml = "";
			for(var i = 0; i<= sensorSignMax;i++){
				tmpHtml += '<option value="' + i + '"';
				if(sign == i){
					tmpHtml += ' selected="selected"';
				}
				tmpHtml += '>' + i + '(小数位)</option>';
			}
			return '<div class="col-md-2"><div class="form-group"><select class="form-control" name="sensorSign">'+tmpHtml+'</select></div></div>';
		}else{
			return '<input type="hidden" name="sensorSign" value="">';
		}
	}	

	function generateSensorUnit(type,unit){
		if(type == 1){
		    return '<div class="col-md-1"><div class="form-group"><input class="form-control" type="text" name="sensorUnit" placeholder="单位" value="'+unit+'" /></div></div>';
		}else{
			return '<input type="hidden" name="sensorUnit" value="">';
		}
	}

	function generateDeleteBtn(){
		return '<button class="btn btn-danger delete_sensor" type="button">删除</button>';
	}



function typeChangeHandler(obj){
	var type = obj.value;
	var parent = $(obj).parent().parent().parent();
	var namePre = parent.find('[name="sensorName"]').val();
	var sensorId = parent.find('[name="sensorId"]').val();
	parent.parent().parent().replaceWith(generateSensorItem({type:type,namePre:namePre,sensorId:sensorId}))
    init(icoNum)
}

var lableIndex = 0;
function addLabel(flag){
  lableIndex = lableIndex+1;
  var htm="<span id='s_"+lableIndex+"'>["+flag+"]<input type='hidden' lab='val' value='"+flag+"' /> <a href='javascript:removeLabel("+lableIndex+")'> X </a></span>";
  $("#device-label").append(htm);
}

function addLabel1(flag){
	lableIndex = lableIndex+1;
    var htm = "<span id='s_"+lableIndex+"'>["+flag+":<input type='text' lab='"+flag+"' size='5' >] <a href='javascript:removeLabel("+lableIndex+")'> X </a></span>";
    $("#device-label").append(htm);
}

function addLabel2(flag){
   lableIndex = lableIndex+1;
   var htm="<span id='s_"+lableIndex+"'>["+flag+"[<input type='text' lab='len' size='5' >]|<input type='text' lab='"+flag+"'size='5' >] <a href='javascript:removeLabel("+lableIndex+")'> X </a></span>";
   $("#device-label").append(htm);
}

function addLabel3(flag){
	lableIndex = lableIndex+1;
   var htm="<span id='s_"+lableIndex+"'>["+flag+"[<input type='text' lab='len' flag="+flag+" size='5'>]] <a href='javascript:removeLabel("+lableIndex+")'> X </a></span>";
   $("#device-label").append(htm);
}

function removeLabel(labIndex){
   $("#s_"+labIndex).remove();
}
function selectAgree(obj){
  $("#device-label").html(obj.value);
}

function check(){
   if($("#sensorName").length == 0 ){
      alert("请至少添加一个传感器！");
      return false;
     }
   if($("#devicePositionLng").val == "" || $("#devicePositionLng").val == "0" ){
  			alert("请在地图上设置设备所有位置!");
  			return false;
  	}  
    return true; 
}
function getIco(num){
  var basePath = $("#basePath").val();
  html =  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/temperature.png' onclick=changeIco('../img/temperature.png',"+num+")  />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/humidity.png' onclick=changeIco('../img/humidity.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/switch.png' onclick=changeIco('../img/switch.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/GPS.png' onclick=changeIco('../img/GPS.png',"+num+") />"+
		  "<img width='45px' height='45px' style='cursor: pointer;' src='"+"../img/icon_image.png' onclick=changeIco('../img/icon_image.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/video.png' onclick=changeIco('../img/video.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/gen.png' onclick=changeIco('../img/gen.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/current.png' onclick=changeIco('/images/current.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/voltage.png' onclick=changeIco('../img/voltage.png',"+num+") />"+
		  "<img width='40px' height='40px' style='cursor: pointer;' src='"+"../img/power.png'  onclick=changeIco('../img/power.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/pressure.png' onclick=changeIco('../img/pressure.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/value.png' onclick=changeIco('../img/value.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/regulate.png' onclick=changeIco('../img/regulate.png',"+num+") />"+
		  "<img width='45px' height='45px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/dustproof.png' onclick=changeIco('../img/dustproof.png',"+num+") />"+
		  "<img width='36px' height='36px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/land_.png' onclick=changeIco('../img/land_.png',"+num+") />"+
		  "<img width='36px' height='36px' style='margin-left: 4px;cursor: pointer;' src='"+"../img/WindSpeed_.png' onclick=changeIco('../img/WindSpeed_.png',"+num+") />";
  return html;
}
function changeIco(name,num){	
	var basePath = $("#basePath").val();
  	$("#_icoUrl"+num).attr("src",name);
  	$("#icoUrl"+num).val(name);
  	$("#_icoUrl"+num).popover("hide");
}

function init(num){
  var options = {
	html  : true,
    content : getIco(num),
    placement : "top",
    trigger : "click"
	}	
  $('#_icoUrl'+num).popover(options);
}

function addConfirm(id){
 	 var sensorType = $("#_sensorType"+id).val();
 	 if( '1' == sensorType){
	     var field1 = $("#field1").val();
	     var field2 = $("#field2").val();
	     var field3 = $("#field3").val();
	     var field4 = $("#field4").val();
	     if(""!=field1 && ""!= field2 && ""!=field3 && ""!=field4){
		     $("#field1"+id).val(field1);
		     $("#field2"+id).val(field2);
		     $("#field3"+id).val(field3);
		     $("#field4"+id).val(field4);
		     $("#_mapping"+id).html("("+field1+","+field2+")=>("+field3+","+field4+")");
	     }else{
	        alert('映射值为必填！');
	        return;
	     }
	  }else{
	  	  var gear = $("#_sensorGear"+id).val();
	      var num = parseInt(gear)+1;
	      var field5 = $("input[name = field5]");
	      var field6 = $("input[name = field6]"); 
	      var gearVal = "[";
	      var showGearVal = "";
	      for(var i = 0;i<num;i++){
	        if('' != field5.eq(i).val() && ''!= field6.eq(i).val()){
	       		 gearVal += "{\"field5\":\""+field5.eq(i).val()+"\",\"field6\":\""+field6.eq(i).val()+"\"},";
	       	  }
	       	  showGearVal+= field5.eq(i).val()+ "=>" +field6.eq(i).val()+",";
	      }
	      gearVal = gearVal.substring(0,gearVal.length-1);
	      if(gearVal.length > 0){
		      gearVal+="]";
		      $("#_sensorGearVal"+id).val(gearVal);
		       $("#_mapping"+id).html(showGearVal.substring(0,showGearVal.length-1));
		  }
	  }
    $("#addMapping").modal("hide");
}
function createMapping(id){
    var sensorType = $("#_sensorType"+id).val();
    var htm ="";
    if('1' == sensorType){
	    var field1 =  $("#field1"+id).val();
	    var field2 =  $("#field2"+id).val();
	    var field3 =  $("#field3"+id).val();
	    var field4 =  $("#field4"+id).val();
	     htm = '<div class="row yings_input">'+
               '<div style="margin-left:14px;" class="col-sm-2"><input type="text" id="field1" name="field1" class="form-control" value="'+field1+'" onblur="check(this)"  onkeyup="this.value=this.value.replace(/[^0-9.-]/g,\'\')"  ></div>'+
               '<div class="col-sm-3"><div class="col-sm-3"> 一 </div><div class="col-sm-9"><input type="text" id="field2" name="field2" class="form-control" value="'+field2+'" onblur="check(this)"  onkeyup="this.value=this.value.replace(/[^0-9.-]/g,\'\')"  ></div></div>'+
               '<div class="col-sm-3"><div class="col-sm-3"> =&gt;</div><div class="col-sm-9"><input type="text" id="field3" name="field3" class="form-control" value="'+field3+'" onblur="check(this)"  onkeyup="this.value=this.value.replace(/[^0-9.-]/g,\'\')"  ></div></div>'+
               '<div class="col-sm-3"><div class="col-sm-3"> 一 </div><div class="col-sm-9"><input type="text" id="field4" name="field4" class="form-control" value="'+field4+'" onblur="check(this)"  onkeyup="this.value=this.value.replace(/[^0-9.-]/g,\'\')"  ></div></div>'+
               '</div>';
    }else{
       var gear = $("#_sensorGear"+id).val();
       var num = parseInt(gear)+1;
       var gearField = $("#_sensorGearVal"+id).val();      
       if('' != gearField && undefined != gearField){
           gearField = JSON.parse(gearField);
	    }
	    for(var i = 0;i < num; i++){
          if(undefined != gearField &&　 gearField.length > 0 && null != gearField[i] ){
        	htm+='<div class="row yings_values">'+
             '<div style="margin-left:15px;" class="col-sm-3"><input type="text" id="field5" name="field5" class="form-control" value="'+gearField[i].field5+'"></div>'+
             '<div class="col-sm-1">=&gt;</div>'+
             '<div class="col-sm-3"><input type="text" id="field6" name="field6" class="form-control" value="'+gearField[i].field6+'"></div></div>';
          }else{
             htm+='<div class="row yings_values">'+
             '<div style="margin-left:15px;" class="col-sm-3"><input type="text" id="field5" name="field5" class="form-control" value="'+i+'"></div>'+
             '<div class="col-sm-1">=&gt;</div>'+
             '<div class="col-sm-3"><input type="text" id="field6" name="field6" class="form-control"></div></div>';
          }
	     }
    }
    htm+='<div class="modal-footer"><button type="submit" class="btn btn-default" onclick="addConfirm('+id+')">确认</button></div> ';
    return htm;	      
}
function addMapping(id){
  var htm = createMapping(id);
  $("#myBody").html(htm);	
}
function clearVal(id){
    $("#_sensorGearVal"+id).val("");
}
function check(e) { 
    var re = /^[-+]?[0-9]+(\.[0-9]+)?$/;
    if (e.value != "") { 
        if (!re.test(e.value)) { 
            alert("请输入正确的数字"); 
            e.value = ""; 
            e.focus(); 
        } 
    } 
} 

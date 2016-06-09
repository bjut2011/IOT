function writePage(msg) {
    document.write(msg);
}

var allPage = { deviceNo: "设备号(ID)", search: "搜索", tracking: "实时跟踪", playback: "历史轨迹", monitor: "定位监控", home: "主页", customer: "我的客户", message: "消息", exit: "退出",
    selSizeStr: "查询到", sizeStr: "条记录", createTime: "创建日期", operation: "操作", no: "序号", cellName: "联系人", phone: "电话", device: "设备", purchase: "进货", stock: "库存",
    mobileWebsite: "手机访问", deviceName: "设备名", simNo: "设备电话", expireTime: "设备到期", remark: "备注", cancel: "取消", deviceInfo: "设备信息", imeiNo: "ID号",
    dataError: "数据异常!", softFailed: "出现错误!", password: "密码", confirm: "确定", num: "序号", noData: "没有查询到数据", acc0: "关", acc1: "开",
    acc2: "未接", searchNull: "搜索条件为空!", initPass: "重置密码", updateTime: "更新时间", loginAccount: "登陆账号", passLengthMsg: "密码长度不得大于20个字符", type: "类型", userType1: "用户",
    userType2: "经销商", address: "地址", add: "新增", information: "资料", deviceType: "设备类型", overspeed: "超速", kmHour: "公里/每小时", devicePhone: "设备手机卡号", modelName: "型号",
    createTime: "创建时间", activeTime: "激活时间", hireExpireTime: "到期时间", edit: "修改", more: "更多", deletes: "删除", cusName: "客户名", userInfo: "用户信息", plsSelUser: "请选择一个用户!",
    km: "公里", plsSel: "请选择", all: "全部", online: "在线", offline: "离线", arrears: "欠费", carNum: "车牌号", speedLimit: "超速限制", lat: "纬度", lng: "经度", speed: "速度", drection: "方向",
    allDistance: "总里程", state: "状态", positionTime: "定位时间", status1: "未启用", moving: "行驶", stopCar: "静止", accStr: "ACC状态", edit2: "编辑", deliveryTime: "出厂时间",
    cellPhone: "联系电话", save: "保存", clear: "清除", type2: "类型", view: "查看", noJur: "没有权限!", deviceHireDay: "代充天数", service: "服务商",myDevice:"我的设备"
};

//login.aspx
var loginPage = { title: "GPS定位平台", accountTab: " 账号 ", imeiTab: "车牌号/ID号", account: "登录名", password: "密码", loginSubmit: "登陆", languageMsg: "我们提供" ,loginMsg: "请检查您的用户名和密码是否正确，然后重试！",
    loginMsg2: "请检查ID号,车牌号和密码是否正确，然后重试！", loginMsg3: "输入不能为空！"
};


//Dealer.aspx
var dealerPage = { warnTitle: "系统报警信息提醒", warnSound: "开启报警声音", username: "客户名/账号", hello: "您好", changePassword: "修改密码", searchDevice: "搜设备", searchUser: "搜客户",
    searchDevice2: "搜索设备", searchUser2: "搜索用户", name: "名称", belongTo: "所属用户", sim: "设备手机卡号", activeTime: "开通日期", customerName: "客户名称", nowSearch: "正在搜索...",
    name2: "名称", name3: "设备名称"
};

//Home.aspx
var homePage = { quickSearch: "快速搜索", searchTxt: "ID号/设备名/车牌号" ,stage:"我的工作台",deviceCount:"设备数量",operations:"更多操作",novice:"新手上路",quickSale:"快速销售",
    batchSale: "批量销售", customer: "销售给", sale: "销售", customerList: "客户列表", addDevice: "添加设备", add: "添加", imeiNullMsg: "请选择设备!", expireTimeNullMsg: "请选择到期时间!",
    saleSuccess:"销售成功!"
};

var warnMessagePage = { alarmType: "报警类型", alarmTime: "报警时间" };

var alarmIndexPage = { geofenceIn: "进电子栅栏", geofenceOut: "出电子栅栏", moved: "位移报警", lowBattery: "低电报警", sos: "求救报警", cutPower: "断电报警", vibration: "震动报警",
    overSpeed: "超速报警", offline: "离线报警"
};

//map.aspx
var mapPage = { searchInput: '请输入设备名/ID号', divicesInfo: "设备信息", geofence: "电子栅栏", cutOffPetrol: "远程断油电", restorePetrol: "远程恢复油电", checkLocation: "查询定位", checkCommand: "查询指令记录",
    sendConfirm: "发指令前请再次确认登录账号", passNull: "请输入密码!", passError: "密码输入错误!", sendMsg1: "正在发送指令,请稍后...", sendSuccess: "命令已经成功下发,等待设备响应...",
    sendMsg2: "命令无效", sendMsg3: "设备不存在", sendMsg4: "设备与服务器已经断开连接", sendMsg5: "下发不成功", sendMsg6: "命令已经保存", responseSuccess: "设备成功返回!", responseNull: "还没有获取到设备返回数据!",
    checkLocatoin: "在线检查位置", checkCommandTitle: "查询指令记录", cmdType: "指令类型", cmdState: "指令状态", responseText: "响应信息", responseTime: "响应时间", sendTime: "发送时间",
    dyd: "断油电", hfyd: "恢复油电", deviceResponse: "设备已返回", sendSuccess2: "命令已发送", noSend: "命令未发送", deviceDetailList: "设备详细信息列表", addGroup: "添加组", defaultGroup: "默认组",
    moveToGroup: "移至分组", delGroupConfirm: "这个分组吗?", downloadLocation: "下载轨迹", deviceFortify: "终端设防", deviceDismiss: "终端撤防"
};

var courseName = { dueNorth: "正北", northeast: "东北", dueEast: "正东", southeast: "东南", dueSouth: "正南", southwest: "西南", dueWest: "正西", northwest: "西北" };

//CustomersList.aspx
var cusPage = { delUserConfirm: "确认删除", delUserConfirm2: "这个用户吗?", delUserMsg: "该用户下有设备,不能删除!", delUserMsg2: "该用户下有别的用户,不能删除!", msgFailed: "删除失败!",
    updateUserSuccess: "修改资料成功!", updateUserFailed: "修改资料失败!", delDeviceConfirm2: "这个设备吗?", addCus: "新增客户", manCus: "管理客户", delCus: "删除客户", saleTo: "销售给..",
    beDevice: "设备属于", updateExpTime: "增加到期时间", deviceChange: "设备转移", cusInfo: "客户信息", toCus: "目标客户", newAddChildrenCus: "新增下级客户", parentCus: "上级客户",
    confirmPass: "确认密码", allCus: "全部客户", addCusTitle: "新增下级客户", loginToUser: "登陆到终端平台", childCus: "下级客户", changeDevices: "批量转移", updateExpDevices: "批量更新到期时间",
    addUserMsg: "请完善以下信息，比如联系电话、联系人（若包含该项）", plsParentCusMsg: "请选择上级客户!", msg1: "名称,登陆账号,密码均不能为空!", passError: "2次密码输入不一致!",
    existAccount: "登陆名已经存在!", dataError: "数据输入不合法!", dataNull: "名称,登陆账号,密码均不能为空!", imeisNull: "ID号不能为空!", saveDevuceMsg1: "你一起输入:", saveDevuceMsg2: "组ID号,",
    saveDevuceMsg3: "全部都已导入成功!", saveDevuceMsg4: "导入成功:", saveDevuceMsg5: "组", saveDevuceMsg6: "失败:", saveDevuceMsg7: "发生错误!", updateExpSuccess: "修改到期时间成功!",
    updateError: "修改失败!", changeDeviceSuccess: "设备转移成功!", changeDeviceError: "设备转移失败!", confirmInitPassMsg1: "确定重置设备:", confirmInitPassMsg2: "的密码吗:",
    initPassSuccess: "密码重置成功!", initPassError: "密码重置失败!", confirmInitUserPassMsg1: "确定重置用户:", page: "每页显示", records: "条"
};

var productUpdatePage = { oilCoefficient: "百公里油耗系数", updateIcon: "更换图标", carNumMsg1: "车牌号长度过长!", sccuess: "更新成功!", faild: "更新失败!", isExistMsg: "车牌号已经存在,请换一个!", filterLBS: "过滤LBS" };

var moneyPage = { day: "天", msg1: "1个点数1天", oneYeah: "一年", twoYeah: "二年", lifelong: "终身", msg2: "增加到期时间", msg3: "设备充值天数成功!", msg4: "点数不够,请充值!", msg5: "天数必须大于0!",
    msg6: "不能转入给自己!", pointGive: "点数转让", pointConsumptionLog: "点数消费记录", loginNameNotExist: "不存在此登录名", intoLoginID: "转入登陆账号", intoUsername: "转入用户名", intoPoint: "转入点数", detect: "检测",
    pleaseDetectLoginName: "请检测转入登录名", pleaseInputIntoPoint: "请输入转入点数"
};

var yiwen201312 = { oneMonth: "一月", monthCardnod: "您的用户下月卡不够!", yearCardnod: "您的用户下年卡不够!", lifelongCardnod: "您的用户下终身卡不够!", searchDeviceMsg1: "已经存在于转移列表中!", searchDeviceMsg2: "搜索结果不是唯一,请将ID号填写更详细一些!", accOn: "ACC开", accOff: "ACC关", fortify: "设防", dismiss: "撤防", carOpen: "车门开", carClose: "车门关", zdlj: "主电连接",
    zddk: "主电断开", uploadInterval: "上传间隔", msg1: "设置设备上传间隔", msg2: "单位秒,最小10秒", msg3: "间隔不能小于10秒!", msg4: "间隔不能大于9999秒!"
}

var yiwen201407 = { nowPosition: "当前位置", message: "消息中心", moveCustomer: "客户转移", importExcel: "导出Excel", moveMsg1: "不能将客户转移给自己或下级客户!",
    moveMsg2: "你确定要将客户", moveMsg3: "转移到", moveMsg4: "用户下吗?", moveMsg5: "请选择上级用户!", moveMsg6: "转移失败!", moveMsg7: "不能将客户转移给自己或下级客户!",
    moveMsg8: "转移成功!", userList: "用户列表", setSOS: "设置SOS号码", sosPhone: "SOS号码", setQinqing: "设置亲情号码", qqPhone: "亲情号码", elec: "电量",
    gsm0: "无信号", gsm1: "信号极弱", gsm2: "信号较弱", gsm3: "信号良好", gsm4: "信号强", deviceStatus: "状态查询", restart: "远程重启", setUploadTimeMsg: "间隔不能小于10秒!",
    moreCommand: "更多指令", centerPhone: "中心号码", version: "版本查询", touchuan: "透传"
}

var yiwen201409 = { commandClass: "指令分类", controlCommand: "控制指令", setCommand: "设置指令", queryCommand: "查询指令", commandType: "指令类型", userHire: "用户到期", userList: "用户列表" }
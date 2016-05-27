/**
 * 系统公用js
 */
$(function() {
	jQuery.validator.addMethod("isMobile", function(value, element) {
		var length = value.length;
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		return this.optional(element) || (length == 11 && mobile.test(value));
	}, "请正确填写手机号码");
	jQuery.validator.addMethod("TelorMobile", function(value,element) {   
	    var length = value.length;   
	    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
	    var tel = /^0+\d{10,11}$/;   
	    return this.optional(element) || (tel.test(value) || mobile.test(value));
	}, "请正确填写您的固话或手机号码"); 
	jQuery.validator.addMethod("notEqualTo", function(value, element, param) {
		return value != $(param).val();
		}, $.validator.format("两次输入不能相同!"));
	jQuery.validator.addMethod("onlyLetterAndDigit", function(value, element, params) {
		var regex = new RegExp('^[A-Za-z0-9]+$');
		return regex.test(value);
	}, "只能输入字母或数字");
	jQuery.validator.addMethod("onlyLetterAndChinese", function(value, element, params) {
		var regex = new RegExp('^[\\u4E00-\\u9FA5\\uF900-\\uFA2D\\w]');
		return regex.test(value);
	}, "只能输入字母或汉字");
	jQuery.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
	}, "只能包括中文字、英文字母、数字和下划线");
	// 电话号码验证
	jQuery.validator.addMethod("isTel", function(value, element) {
		var tel = /^\d{3,4}-?\d{7,9}$/; // 电话号码格式010-12345678
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的电话号码");
	jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
		var length = value.length;
		for ( var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length >= param[0] && length <= param[1]);
	}, jQuery.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));
	// 邮政编码验证
	jQuery.validator.addMethod("isZipCode", function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的邮政编码");
	jQuery.validator.addMethod("isMoney", function(value, element) {
		//var money=/^\d+(\.\d{1,2})$|^\d*$/;
		var money=/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
        return this.optional(element) || money.test(value);
    }, "请输入正确的金额");
	//输入是否含有中文
	jQuery.validator.addMethod("isNotChinese", function(value, element, params) {
		var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
		if(!patrn.exec(value)){ 
			return true; 
		}
		else{ 
			return false; 
		} 
		
	}, "输入不能含有汉字");
	jQuery.validator.addMethod("validNickname", function(value, element, params) {
		//var regex = new RegExp('^[A-Za-z0-9_@]+$');
		var regex= new RegExp('^[\u4e00-\u9fa5]{2,10}$|^[a-zA-Z]+[A-Za-z0-9-_-]+$');
		return regex.test(value);
	}, "只能输入字母、数字、_和-");
});

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, ""); 
};
String.prototype.rtrim = function() { 
	return this.replace(/(\s*$)/g, ""); 
};
function closeMe(){
	$("#cboxClose").click();
}
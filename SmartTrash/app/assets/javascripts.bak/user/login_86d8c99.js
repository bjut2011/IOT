$(function() {
	function t(t) {
		var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
		i = window.location.search.substr(1).match(n);
		return null != i ? (console.log(i[2]), i[2]) : null
	}
	$(".j_login_form").on("submit",
	function(t) {
		t.preventDefault();
		var n = $(this),
		i = n.find(".j_submit"); ! IOT.button.isLoading(n) && n.isValid() && (IOT.button.addLoading(i, IOT.tr("登录中"), "loading"), IOT.post("/login", n.serialize(),
		function(t) {
			IOT.button.removeLoading(i, IOT.tr("登&nbsp;&nbsp;录")),
			t !== !1 && (0 == t.code ? location.href =  t.redirect_uri: IOT.showPostError(t.msg))
		},
		"json"))
	});
	var n = $("#name"); ! n.val() && n.focus(),
	n.val(t("id"));
	var i = $(".j_login_third");
	"1" !== i.attr("data-third-reged") && i.on("submit",
	function(t) {
		t.preventDefault();
		var n = $("#telphone"),
		i = $("#email"),
		o = $(this),
		a = $(".button-login");
		return "" === n.val() && "" === i.val() ? void IOT.tips(IOT.tr("请至少留下联系电话或邮箱，以便为您发送重要信息"), "warning") : void(!IOT.button.isLoading(o) && o.isValid() && (IOT.button.addLoading(a, IOT.tr("提交中"), "loading"), a.attr("disabled", "disabled"), IOT.post("/login/" + $(".tab-tit i").text(), o.serialize(),
		function(t) {
			IOT.button.removeLoading(a, IOT.tr("确&nbsp;&nbsp;定")),
			a.removeAttr("disabled"),
			t !== !1 && (0 === t.code ? (IOT.tips(IOT.tr("提交成功"), "success", 500), setTimeout(function() {
				location.href = IOT.i18nS + "/"
			},
			200)) : (IOT.showPostError(t.msg), setTimeout(function() {
				location.href = IOT.i18nS + "/login"
			},
			1500)))
		},
		"json")))
	})
});

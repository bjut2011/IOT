$(function() {
	var t = $("#pid").val(),
	e = $(".j_project_add"),
	i = $("#project_name"),
	o = $(".j_project_name_succeed"),
	d = $(".j_success"),
	a = $(".j_to_details"),
	n = $(".j_add_device");
	e.on("submit",
	function(r) {
		r.preventDefault();
		var c = e.find(".j_submit"); ! IOT.button.isLoading(c) && e.isValid() && (t ? IOT.button.addLoading(c, IOT.tr("正在修改项目"), "loading") : IOT.button.addLoading(c, IOT.tr("正在创建项目"), "loading"), IOT.post("/projects", e.serialize(),
		function(r) {
			t ? IOT.button.removeLoading(c, IOT.tr("立即修改项目")) : IOT.button.removeLoading(c, IOT.tr("立即创建项目")),
			r !== !1 && (0 == r.code ? (a.attr("href", IOT.i18nS + "/project/details?pid=" + r.msg), n.attr("href", IOT.i18nS + "/device/add?pid=" + r.msg), o.html(s.sprintf('<a href="%s/project/details?pid=%s">%s</a>', IOT.i18nS, r.msg, i.val())), e.hide(), d.show()) : IOT.showPostError(r.msg))
		},
		"json"))
	}),
	i.select()
});

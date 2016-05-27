/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.1
 *
 */
!
function(a) {
	jQuery.fn.extend({
		slimScroll: function(b) {
			var c = {
				width: "auto",
				height: "250px",
				size: "7px",
				color: "#000",
				position: "right",
				distance: "1px",
				start: "top",
				opacity: .4,
				alwaysVisible: !1,
				disableFadeOut: !1,
				railVisible: !1,
				railColor: "#333",
				railOpacity: .2,
				railDraggable: !0,
				railClass: "slimScrollRail",
				barClass: "slimScrollBar",
				wrapperClass: "slimScrollDiv",
				allowPageScroll: !1,
				wheelStep: 20,
				touchScrollStep: 200,
				borderRadius: "7px",
				railBorderRadius: "7px"
			},
			d = a.extend(c, b);
			return this.each(function() {
				function x(b) {
					if (c) {
						var b = b || window.event,
						e = 0;
						b.wheelDelta && (e = -b.wheelDelta / 120),
						b.detail && (e = b.detail / 3);
						var f = b.target || b.srcTarget || b.srcElement;
						a(f).closest("." + d.wrapperClass).is(o.parent()) && y(e, !0),
						b.preventDefault && !n && b.preventDefault(),
						n || (b.returnValue = !1)
					}
				}
				function y(a, b, c) {
					n = !1;
					var e = a,
					f = o.outerHeight() - v.outerHeight();
					if (b && (e = parseInt(v.css("top")) + a * parseInt(d.wheelStep) / 100 * v.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), v.css({
						top: e + "px"
					})), j = parseInt(v.css("top")) / (o.outerHeight() - v.outerHeight()), e = j * (o[0].scrollHeight - o.outerHeight()), c) {
						e = a;
						var g = e / o[0].scrollHeight * o.outerHeight();
						g = Math.min(Math.max(g, 0), f),
						v.css({
							top: g + "px"
						})
					}
					o.scrollTop(e),
					o.trigger("slimscrolling", ~~e),
					B(),
					C()
				}
				function z() {
					window.addEventListener ? (this.addEventListener("DOMMouseScroll", x, !1), this.addEventListener("mousewheel", x, !1), this.addEventListener("MozMousePixelScroll", x, !1)) : document.attachEvent("onmousewheel", x)
				}
				function A() {
					i = Math.max(o.outerHeight() / o[0].scrollHeight * o.outerHeight(), m),
					v.css({
						height: i + "px"
					});
					var a = i == o.outerHeight() ? "none": "block";
					v.css({
						display: a
					})
				}
				function B() {
					if (A(), clearTimeout(g), j == ~~j) {
						if (n = d.allowPageScroll, k != j) {
							var a = 0 == ~~j ? "top": "bottom";
							o.trigger("slimscroll", a)
						}
					} else n = !1;
					return k = j,
					i >= o.outerHeight() ? (n = !0, void 0) : (v.stop(!0, !0).fadeIn("fast"), d.railVisible && u.stop(!0, !0).fadeIn("fast"), void 0)
				}
				function C() {
					d.alwaysVisible || (g = setTimeout(function() {
						d.disableFadeOut && c || e || f || (v.fadeOut("slow"), u.fadeOut("slow"))
					},
					1e3))
				}
				var c, e, f, g, h, i, j, k, l = "<div></div>",
				m = 30,
				n = !1,
				o = a(this);
				if (o.parent().hasClass(d.wrapperClass)) {
					var p = o.scrollTop();
					if (v = o.parent().find("." + d.barClass), u = o.parent().find("." + d.railClass), A(), a.isPlainObject(b)) {
						if ("height" in b && "auto" == b.height) {
							o.parent().css("height", "auto"),
							o.css("height", "auto");
							var q = o.parent().parent().height();
							o.parent().css("height", q),
							o.css("height", q)
						} else if ("height" in b) {
							var r = b.height;
							o.parent().css("height", r),
							o.css("height", r)
						}
						if ("scrollTo" in b) p = parseInt(d.scrollTo);
						else if ("scrollBy" in b) p += parseInt(d.scrollBy);
						else if ("destroy" in b) return v.remove(),
						u.remove(),
						o.unwrap(),
						void 0;
						y(p, !1, !0)
					}
				} else {
					d.height = "auto" == d.height ? o.parent().height() : d.height;
					var s = a(l).addClass(d.wrapperClass).css({
						position: "relative",
						overflow: "hidden",
						width: d.width,
						height: d.height
					});
					o.css({
						overflow: "hidden",
						width: d.width,
						height: d.height
					});
					var u = a(l).addClass(d.railClass).css({
						width: d.size,
						height: "100%",
						position: "absolute",
						top: 0,
						display: d.alwaysVisible && d.railVisible ? "block": "none",
						"border-radius": d.railBorderRadius,
						background: d.railColor,
						opacity: d.railOpacity,
						zIndex: 90
					}),
					v = a(l).addClass(d.barClass).css({
						background: d.color,
						width: d.size,
						position: "absolute",
						top: 0,
						opacity: d.opacity,
						display: d.alwaysVisible ? "block": "none",
						"border-radius": d.borderRadius,
						BorderRadius: d.borderRadius,
						MozBorderRadius: d.borderRadius,
						WebkitBorderRadius: d.borderRadius,
						zIndex: 99
					}),
					w = "right" == d.position ? {
						right: d.distance
					}: {
						left: d.distance
					};
					u.css(w),
					v.css(w),
					o.wrap(s),
					o.parent().append(v),
					o.parent().append(u),
					d.railDraggable && v.bind("mousedown",
					function(b) {
						var c = a(document);
						return f = !0,
						t = parseFloat(v.css("top")),
						pageY = b.pageY,
						c.bind("mousemove.slimscroll",
						function(a) {
							currTop = t + a.pageY - pageY,
							v.css("top", currTop),
							y(0, v.position().top, !1)
						}),
						c.bind("mouseup.slimscroll",
						function() {
							f = !1,
							C(),
							c.unbind(".slimscroll")
						}),
						!1
					}).bind("selectstart.slimscroll",
					function(a) {
						return a.stopPropagation(),
						a.preventDefault(),
						!1
					}),
					u.hover(function() {
						B()
					},
					function() {
						C()
					}),
					v.hover(function() {
						e = !0
					},
					function() {
						e = !1
					}),
					o.hover(function() {
						c = !0,
						B(),
						C()
					},
					function() {
						c = !1,
						C()
					}),
					o.bind("touchstart",
					function(a) {
						a.originalEvent.touches.length && (h = a.originalEvent.touches[0].pageY)
					}),
					o.bind("touchmove",
					function(a) {
						if (n || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
							var b = (h - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
							y(b, !0),
							h = a.originalEvent.touches[0].pageY
						}
					}),
					A(),
					"bottom" === d.start ? (v.css({
						top: o.outerHeight() - v.outerHeight()
					}), y(0, !0)) : "top" !== d.start && (y(a(d.start).position().top, null, !0), d.alwaysVisible || v.hide()),
					z()
				}
			}),
			this
		}
	}),
	jQuery.fn.extend({
		slimscroll: jQuery.fn.slimScroll
	})
} (jQuery);; !
function() {
	function e(e) {
		this._container = e.container,
		this._width = e.width || 200,
		this._height = e.height || 50,
		this._uploadUrl = e.uploadUrl || "",
		this._file = e.file || "file",
		this._isPreview = "undefined" == typeof e.isPreview ? !0 : e.isPreview,
		this._previewSize = e.previewSize || "200*200|80*80|48*48",
		this._defaultPreview = e.defaultPreview || "",
		this._ratio = 0 === e.ratio ? 0 : e.ratio || 1,
		this._uploadSize = e.uploadSize || "",
		this._resourceUrl = e.resourceUrl || "",
		this._flashUrl = e.flashUrl,
		this._token = (new Date).getTime(),
		this._flashVars = "",
		this._events = ["complete", "error", "load"],
		this._init()
	}
	e.prototype.submit = function() {
		this._flash.submit()
	},
	e.prototype.setImageSrc = function(e) {
		if (this._flash.setImageSrc) this._flash.setImageSrc(e);
		else {
			var t = this;
			this.bind("load",
			function() {
				t._flash.setImageSrc(e)
			})
		}
	},
	e.prototype.bind = function(e, t) {
		this._events[e] || (this._events[e] = []),
		this._events[e].push(t)
	},
	e.prototype.unbind = function(e, t) {
		if (this._events[e]) for (var i = this._events[e], a = 0; a < i.length; a++) t == i[a] && i[a].splice(a, 1)
	},
	e.prototype.trigger = function(e, t) {
		if (this._events[e]) for (var i = this._events[e], a = 0; a < i.length; a++) i[a].call(this, e, t)
	},
	e.prototype._init = function() {
		this._initFlashvars(),
		this._generateCallBack(),
		this._initUI()
	},
	e.prototype._initFlashvars = function() {
		var e = ["uploadUrl=" + encodeURIComponent(this._uploadUrl), "file=" + encodeURIComponent(this._file), "isPreview=" + this._isPreview, "previewSize=" + encodeURIComponent(this._previewSize), "defaultPreview=" + encodeURIComponent(this._defaultPreview), "ratio=" + encodeURIComponent(this._ratio), "uploadSize=" + encodeURIComponent(this._uploadSize), "resourceUrl=" + this._resourceUrl];
		this._flashVars = e.join("&")
	},
	e.prototype._initUI = function() {
		var e = "flashUploader" + this._token,
		t = this._flashUrl,
		i = '<object id="' + e + '" onfocus="return false;"  name="#" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + this._width + '" height="' + this._height + '"><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode"><param name="flashvars" value="' + this._flashVars + '" /><param name=play value=false> <param name="allowFullScreen" value="false" /><param name="movie" value="' + t + '" /></object>',
		a = '<object id="' + e + '" type="application/x-shockwave-flash" data="' + t + '" width="' + this._width + '" height="' + this._height + '"><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode"><param name="flashvars" value="' + this._flashVars + '" /></object>';
		this._container.innerHTML = -1 != navigator.appName.indexOf("Microsoft") ? i: a,
		this._flash = document[e] || window[e]
	},
	e.prototype._generateCallBack = function() {
		for (var e = this._token,
		t = this,
		i = this._events,
		a = 0; a < i.length; a++) {
			var s = i[a],
			o = s + e;
			window[o] = function(e) {
				return function(i) {
					t.trigger(e, i)
				}
			} (s),
			this._flashVars += "&" + this._decodeCamel(s) + "=" + o
		}
	},
	e.prototype._decodeCamel = function(e) {
		return e.replace(/([A-Z])/g,
		function(e, t) {
			return "_" + t.toLowerCase()
		})
	},
	IOT.ImageClipper = e
} ();;
function initializebaidumap() {
	$(function() {
		function e(e) {
			return document.getElementById(e)
		}
		function a(e, a) {
			for (var t = [], i = [], n = 0; n < e.length; n++) {
				var o = e[n];
				t.push(o.lng),
				i.push(o.lat)
			}
			$.ajax({
				url: "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&mode=1&x=" + t.join(",") + "&y=" + i.join(","),
				dataType: "jsonp",
				success: function(e) {
					for (var t = null,
					i = [], n = 0; n < e.length; n++) t = e[n],
					0 == t.error && i.push(t);
					a(i)
				},
				error: function() {
					a(null)
				}
			})
		}
		function t(e, a) {
			var t = [],
			i = [];
			for (var n in e) t.push(e[n].lng),
			i.push(e[n].lat);
			$.ajax({
				url: "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&mode=1&x=" + t.join(",") + "&y=" + i.join(","),
				dataType: "jsonp",
				success: function(e) {
					for (var n, o, r = null,
					l = null,
					s = [], d = 0; d < e.length; d++) {
						if (r = e[d], 0 != r.error) return void a(null);
						l = new BMap.Point(r.x, r.y),
						n = 2 * t[d] - l.lng,
						o = 2 * i[d] - l.lat,
						s.push({
							lng: n,
							lat: o
						})
					}
					a(s)
				},
				error: function() {
					a(null)
				}
			})
		}
		function i(e) {
			o(e.point)
		}
		function n(e) {
			l && (l.removeEventListener("dragend", i), h.clearOverlays()),
			o(e),
			l = new BMap.Marker(e),
			h.addOverlay(l),
			l.enableDragging(),
			l.addEventListener("dragend", i)
		}
		function o(a) {
			e("longitude-span").innerText = "",
			e("latitude-span").innerText = "",
			v.val(""),
			p.val(""),
			IOT.button.addLoading(u, IOT.tr("正在纠偏"), "loading"),
			t([a],
			function(a) {
				e("longitude-span").innerText = a[0].lng,
				e("latitude-span").innerText = a[0].lat,
				v.val(a[0].lng),
				p.val(a[0].lat),
				IOT.button.removeLoading(u, IOT.tr(d ? "修改设备": "添加设备"))
			})
		}
		function r() {
			function e() {
				var e = a.getResults().getPoi(0).point;
				o(e),
				h.centerAndZoom(e, 18),
				l = new BMap.Marker(e),
				h.addOverlay(l),
				l.enableDragging(),
				l.addEventListener("dragend", i)
			}
			l && l.removeEventListener("dragend", i),
			h.clearOverlays();
			var a = new BMap.LocalSearch(h, {
				onSearchComplete: e
			});
			a.search(T)
		}
		var l, d = $("#device_id").val(),
		c = $(".j_device_add"),
		u = c.find(".j_submit"),
		v = $("#longitude"),
		p = $("#latitude"),
		m = v.val(),
		f = p.val(),
		h = new BMap.Map("l-map");
		d && m && f && (0 != m || 0 != f) ? a([{
			lng: m,
			lat: f
		}],
		function(e) {
			if (e) {
				var a = new BMap.Point(e[0].x, e[0].y);
				h.centerAndZoom(a, 18),
				n(a)
			}
		}) : h.centerAndZoom(IOT.tr("北京"), 13),
		h.enableScrollWheelZoom();
		var g = new BMap.Autocomplete({
			input: "device_position",
			location: h
		});
		g.addEventListener("onhighlight",
		function(a) {
			var t = "",
			i = a.fromitem.value,
			n = "";
			a.fromitem.index > -1 && (n = i.province + i.city + i.district + i.street + i.business),
			t = "FromItem<br />index = " + a.fromitem.index + "<br />value = " + n,
			n = "",
			a.toitem.index > -1 && (i = a.toitem.value, n = i.province + i.city + i.district + i.street + i.business),
			t += "<br />ToItem<br />index = " + a.toitem.index + "<br />value = " + n,
			e("searchResultPanel").innerHTML = t
		});
		var T;
		g.addEventListener("onconfirm",
		function(a) {
			var t = a.item.value;
			T = t.province + t.city + t.district + t.street + t.business,
			e("searchResultPanel").innerHTML = "onconfirm<br />index = " + a.item.index + "<br />myValue = " + T,
			r()
		}),
		h.addEventListener("click",
		function(e) {
			n(e.point)
		});
		var j = $("#l-map");
		j.on("mousewheel",
		function(e) {
			e.preventDefault()
		});
		var b = !1,
		O = $(".img-select"),
		I = $(".j_avatar_img"),
		w = $(".img-content");
		w.slimscroll({
			height: "100%"
		}),
		$(".j_edit_head").click(function(e) {
			e.stopPropagation(),
			e.preventDefault(),
			O.show(),
			b || $.ajax({
				type: "GET",
				url: IOT.i18nS + "/device/imglist",
				dataType: "json"
			}).done(function(e) {
				if (0 === e.code) {
					var a, t = document.createDocumentFragment();
					$.each(e.data,
					function(e, i) {
						a = new Image,
						a.src = i.path,
						t.appendChild(a)
					}),
					w.append(t),
					w.children("img").click(function(e) {
						e.stopPropagation();
						var a = $(e.currentTarget);
						I.attr("src", a.attr("src")),
						c[0].elements.device_img.value = a.attr("src"),
						a.addClass("active").siblings().removeClass("active")
					}),
					b = !0
				} else IOT.tips(e.msg, "error")
			}).fail(function() {
				IOT.tips(IOT.tr("网络错误"), "error")
			})
		}),
		$(document).click(function(e) {
			var a = $(e.target); ! a.hasClass("img-select") && !a.parents(".img-select").length && O.is(":visible") && O.hide()
		});
		var y, x = !1;
		$(".j_upload_head").click(function(e) {
			if (e.preventDefault(), !x) {
				y = new IOT.Dialog({
					title: IOT.tr("修改设备图片"),
					content: '<div class="ui-dialog-bd"></div><div class="ui-dialog-ft"><a class="button j_submit">' + IOT.tr("上传") + "</a></div>",
					beforeClose: null,
					showClose: !0,
					showFooter: !1,
					className: "",
					cache: !0,
					width: "700px"
				});
				var a = new IOT.ImageClipper({
					file: "upfile",
					container: y.$root.find(".ui-dialog-bd")[0],
					width: 550,
					height: 400,
					previewSize: "120*120|56*56",
					uploadSize: "120*120",
					flashUrl: IOT.staticUrl + "/files/image_clipper/imageClipper.swf?v=0810",
					resourceUrl: IOT.staticUrl + "/files/image_clipper",
					uploadUrl: "http://" + IOT.host + "/device/imgup"
				}),
				t = y.$root.find(".j_submit");
				a.bind("complete",
				function(e, a) {
					IOT.button.removeLoading(t, IOT.tr("上传"));
					var i = a.response.data.addr;
					$(".j_avatar_img").attr("src", i),
					c[0].elements.device_img.value = i,
					y.close()
				}),
				a.bind("error",
				function(e, a) {
					IOT.tips(a.errorMessage || IOT.tr("上传失败，请稍后再试"), "warning"),
					IOT.button.removeLoading(t, IOT.tr("上传"))
				}),
				t.on("click",
				function(e) {
					e.preventDefault(),
					IOT.button.isLoading(t) || (IOT.button.addLoading(t, IOT.tr("上传中"), "loading"), a.submit())
				})
			}
			y.open()
		});
		var C = $(".j_device_data_private"),
		k = $(".j_device_data_open"),
		L = $("#device_data"),
		D = $(".j_device_protocol_http"),
		M = $(".j_device_protocol_edp"),
		E = $("#device_protocol"),
		P = $(".j_add_auth"),
		S = $(".j_auth_dialog"),
		B = $(".j_dialog_submit"),
		U = $(".j_dialog_cancel"),
		z = $("#param_name"),
		A = $("#param_value"),
		H = $(".j_invalid_auth_message"),
		N = $(".j_auth_ul"),
		Z = $(".j_auth_ul > li"),
		F = $(".j_auth_group"),
		J = $(".j_router_group"),
		R = {};
		C.click(function(e) {
			e.preventDefault(),
			C.hasClass("hollow") || (C.removeClass("secondary").addClass("hollow"), k.removeClass("hollow").addClass("secondary"), L.val("1"))
		}),
		k.click(function(e) {
			e.preventDefault(),
			k.hasClass("hollow") || (k.removeClass("secondary").addClass("hollow"), C.removeClass("hollow").addClass("secondary"), L.val("0"))
		}),
		"HTTP" == E.val() && (F.hide(), J.hide()),
		D.click(function(e) {
			e.preventDefault(),
			D.hasClass("hollow") || (D.removeClass("secondary").addClass("hollow"), M.removeClass("hollow").addClass("secondary"), E.val("HTTP"), F.hide(), J.hide())
		}),
		M.click(function(e) {
			e.preventDefault(),
			M.hasClass("hollow") || (M.removeClass("secondary").addClass("hollow"), D.removeClass("hollow").addClass("secondary"), E.val("EDP"), F.show(), J.show())
		});
		var V = function() {
			var e = z.val(),
			a = A.val();
			return s.isBlank(e) || s.isBlank(a) ? (H.text(IOT.tr("参数名和参数值均不能为空")), !1) : _.has(R, s.trim(e)) ? (H.text(IOT.tr("参数名不能重复")), !1) : (H.text(""), {
				name: s.trim(e),
				value: s.trim(a)
			})
		},
		G = !1,
		W = function() {
			z.bind("keyup", V),
			A.bind("keyup", V),
			G = !0
		},
		q = function() {
			z.unbind("keyup", V),
			A.unbind("keyup", V),
			G = !1
		};
		P.click(function(e) {
			e.preventDefault(),
			S.is(":visible") || (S.show(), z.focus())
		}),
		U.click(function(e) {
			e.preventDefault(),
			G && q(),
			S.hide()
		});
		var K, Q = function(e) {
			delete R[e.data.$root.children(".j_param_name").text()],
			Y(e.data.$i),
			e.data.$root.remove()
		},
		X = function(e) {
			var a = e.children("i");
			a.bind("click", {
				$root: e,
				$i: a
			},
			Q)
		},
		Y = function(e) {
			e.unbind("click", Q)
		};
		Z.length && (Z.each(function() {
			var e = $(this);
			R[e.children(".j_param_name").text()] = e.children(".j_param_value").text(),
			X(e)
		}), K = JSON.stringify(R)),
		B.click(function(e) {
			e.preventDefault();
			var a = V();
			if (a) {
				G && q(),
				S.hide(),
				z.val(""),
				A.val(""),
				R[a.name] = a.value;
				var t = $(s.sprintf('<li><span class="param-name j_param_name">%s</span>：<span class="param-value j_param_value">%s</span><i class="icon-cancel"></i></li>', a.name, a.value));
				X(t),
				N.append(t)
			} else W()
		});
		var ea = $(".j_project_name_succeed"),
		aa = $(".j_success"),
		ta = $(".j_invalid_position_message"),
		ia = $("#device_auth");
		c.parsley().on("form:validate",
		function(e) {
			return e.isValid("position", !0) ? void ta.html("") : (e.submitEvent.preventDefault(), void ta.html(IOT.tr("你需要选择一个位置")))
		}),
		c.on("submit",
		function(e) {
			e.preventDefault(),
			ia.val(JSON.stringify(R)),
			!IOT.button.isLoading(u) && c.isValid() && (S.detach(), d && K && K == JSON.stringify(R) && ia.prop("disabled", !0), IOT.button.addLoading(u, IOT.tr(d ? "正在修改": "正在添加"), "loading"), IOT.post("/devices", c.serialize(),
			function(e) {
				if (IOT.button.removeLoading(u, IOT.tr(d ? "修改设备": "添加设备")), e === !1) return void F.append(S);
				if (0 == e.code) {
					ea.text(e.data.proj_name),
					$(".j_device_protocol").text(E.val()),
					$(".j_api_addr").text(e.data.addr);
					var a = $("#proj_id").val();
					d ? ($(".j_device_id").text(d), $(".j_to_device").attr("href", s.sprintf("/device/detail?pid=%s&device_id=%s", a, d))) : ($(".j_device_id").text(e.data.device_id), $(".j_to_device").attr("href", s.sprintf("/device/detail?pid=%s&device_id=%s",  a, e.data.device_id + ""))),
					$(".j_device_name_succeed").html(s.sprintf('<a href="/device/detail?pid=%s&device_id=%s">%s</a>',  a, e.data.device_id + "", $("#device_name").val())),
					$(".j_api_key").text(e.data.key),
					c.hide(),
					aa.show(),
					location.href = "#success-info"
				} else IOT.showPostError(e.msg),
				F.append(S),
				ia.removeProp("disabled")
			},
			"json"))
		})
	})
}

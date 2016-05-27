!
function(n) {
    n.fn.multislider = function(i) {
        var e, t = 1,
        a = 1,
        r = n(this),
        o = 0,
        s = {
            RTL: {
                "z-index": 1,
                width: 0,
                right: 0,
                left: "auto"
            },
            LTR: {
                "z-index": 1,
                width: 0,
                right: "auto",
                left: 0
            }
        },
        d = {
            width: 1920,
            dots: !0,
            number: !1,
            color: "#e6e6e6",
            highlight: "#e63939",
            verticalDuring: 1e3,
            aDuring: 3500,
            aBack: !0,
            aDirection: "RTL"
        },
        c = {
            init: function() {
                o = d.banners.length,
                c.renderMainLayout(),
                d.dots ? c.renderNaviLi() : "",
                c.excuteAfterLoaded()
            },
            excuteAfterLoaded: function() {
                var i = '<div class="loading"><div class="spin"><div class="load"><span></span><span></span><span></span></div></div></div>',
                e = [];
                r.prepend(i).find("img").each(function() {
                    var i = n.Deferred();
                    n(this).bind("load",
                    function() {
                        i.resolve()
                    }).bind("error",
                    function() {
                        console.log(IOT.tr("图片路径出错！或者网络问题！"))
                    }),
                    this.complete && setTimeout(function() {
                        i.resolve()
                    },
                    1e3),
                    e.push(i)
                }),
                n.when.apply(null, e).done(function() {
                    r.find(".loading").remove(),
                    c.startAnimation(t),
                    c.bindHoverImage(),
                    d.dots ? c.bindDotsClick() : ""
                })
            },
            renderMainLayout: function() {
                for (var n = [], i = 0, e = o; e > i; i++) {
                    var t = d.banners[i],
                    a = "string" == typeof t.name ? t.name: t.name.step1;
                    n.push('<div class="outer"><div class="inner">' + (d.aBack && t.name.step2label ? '<img src="' + a + '" alt=""/>': '<a href="' + t.link + '" target="' + (t.target || "") + '"><img src="' + a + '" alt=""/></a>') + "</div>" + (d.aBack && t.name.step2label ? '<a target="' + (t.target || "") + '" href="' + t.link + '" class="inner-slider"><div class="inner-slider-img"><img src="' + t.name.step2 + '" /></div>' + (t.name.step2label ? "<button>" + t.name.step2label + "</button>": "") + "</a>" + (void 0 !== t.name.step3 && "" !== t.name.step3 && t.name.step2label ? '<div class="inner-line"><img src="' + t.name.step3 + '" alt=""/></div>': "") : "") + "</div>")
                }
                r.append(n.join(""))
            },
            renderNaviLi: function() {
                for (var n = [], i = 0, e = o; e > i; i++) n.push('<li data-no="' + (i + 1) + '">' + (d.number ? i + 1 : "") + "</li>");
                var t = '<ol class="banner-icon">' + n.join("") + "</ol>";
                r.append(t)
            },
            setNaviLi: function(i) {
                n("li", n(".banner-icon", r)).css("background-color", d.color).eq(i).css("background-color", "").css("background-color", d.highlight)
            },
            startAnimation: function(n) {
                t = n,
                d.dots ? c.setNaviLi(n - 1) : "",
                c.bgAnimate()
            },
            initBanner: function() {
                var i = n(".outer", r).find(".inner"),
                e = n(".outer", r).find(".inner-line"),
                t = r.find(".outer");
                t.css(s[d.aDirection]).stop(!0, !0),
                i.css({
                    width: d.width
                }),
                e.css({
                    width: d.width
                })
            },
            bindDotsClick: function() {
                n("li", n(".banner-icon", r)).click(function() {
                    clearTimeout(e);
                    var i = n(this),
                    a = i.attr("data-no"),
                    s = r.find(".outer");
                    c.initBanner(),
                    c.setNaviLi(a - 1),
                    s.eq(t - 2).css({
                        width: "100%",
                        "z-index": 2
                    }).stop(!0, !0),
                    c.animation(a - 1),
                    t = i.attr("data-no") > o - 1 ? 1 : parseInt(i.attr("data-no")) + 1,
                    e = setTimeout(function() {
                        c.startAnimation(t)
                    },
                    d.aDuring)
                })
            },
            bindHoverImage: function() {
                n(".outer").off("mouseover").on("mouseover",
                function() {
                    clearTimeout(e)
                }).off("mouseleave").on("mouseleave",
                function() {
                    e = setTimeout(function() {
                        c.startAnimation(t)
                    },
                    d.aDuring)
                })
            },
            getImgOffset: function() {
                var i = r.parent().innerWidth(),
                e = n(".inner", r).find("img").innerWidth(),
                t = parseInt(e) - parseInt(i);
                return t > 0 ? t / 2 : 0
            },
            bgAnimate: function() {
                var i = n(".outer", r).find(".inner"),
                s = n(".outer", r).find(".inner-line"),
                l = i.parent();
                c.initBanner();
                var u = c.getImgOffset();
                "RTL" === d.aDirection ? (i.css({
                    right: -u
                }), s.css({
                    right: -u
                })) : (i.css({
                    left: -u
                }), s.css({
                    left: -u
                })),
                1 === t && 1 === a ? l.eq(0).css({
                    width: "100%"
                }) : l.eq(t - 2).css({
                    width: "100%"
                }),
                c.animation(t - 1),
                t = t + 1 > o ? 1 : t + 1,
                a++,
                e = setTimeout(function() {
                    c.startAnimation(t)
                },
                d.aDuring)
            },
            animation: function(n) {
                r.find(".outer").eq(n).css({
                    "z-index": 3
                }).stop(!0, !0).animate({
                    width: "100%"
                },
                d.verticalDuring).find(".inner img").css({
                    width: 1.25 * d.width,
                    left: -150,
                    top: -20
                }).stop(!0, !0).animate({
                    width: d.width,
                    left: "+=150",
                    top: "+=20"
                },
                d.verticalDuring, d.aBack ? c.animationCallBack: "")
            },
            animationCallBack: function() {
                var i = n(".inner-slider", r),
                e = n(this).parents(".outer");
                i.removeClass("visible"),
                e.find(".inner-slider").addClass("visible"),
                e.find(".inner-line").addClass("animate-line"),
                setTimeout(function() {
                    e.find(".inner-line").removeClass("animate-line")
                },
                d.aDuring)
            }
        };
        d = n.extend(d, i),
        c.init()
    }
} (jQuery);; !
function() {
    function n() {
        var n, e = document.createElement("fakeelement"),
        i = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };
        for (n in i) if (i.hasOwnProperty(n) && void 0 !== e.style[n]) return i[n]
    }
    var e = {
        bindHoverForCloud: function() {
            var n = $(".cloud", $(".c-function")),
            e = n.find(".cloud-info-forIE");
            n.hover(function() {
                $("img, .word", e).addClass("hover")
            },
            function() {
                $("img, .word", e).removeClass("hover")
            })
        },
        bindUnHoverForApp: function() {
            var e = $(".app", $(".c-function")),
            i = $(".inner .flight-path", e),
            a = $(".bg-flight", e),
            t = $(".bg-app", e),
            o = $(".bg-word, .front, .inner-front", e);
            e.mouseleave(function() {
                i.removeClass("hover"),
                !a.hasClass("unhover") && a.hasClass("hover") && a.addClass("unhover"),
                setTimeout(function() {
                    t.addClass("hidden")
                },
                300),
                o.removeClass("hover")
            }).mouseenter(function() {
                i.addClass("hover"),
                a.hasClass("hover") || (a.addClass("hover"), setTimeout(function() {
                    a.css("opacity", 1)
                },
                500)),
                t.removeClass("hidden"),
                o.addClass("hover")
            });
            var s = n();
        },
        bindHoverForData: function() {
            var n = $(".data", $(".c-function")),
            e = $(".data-word", n);
            n.mouseenter(function() {
                e.addClass("hover")
            }).mouseleave(function() {
                e.removeClass("hover")
            })
        }
    };
    $(".sliders").multislider("en_US" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/en_US/index/en0112_1.jpg",
            link: "/"
        },
        {
            name: "/static/files/i18n/en_US/index/en0112_2.jpg",
            link: "/device/add"
        },
        {
            name: "/static/files/i18n/en_US/index/en0108_3.jpg",
            link: "/discover"
        },
        {
            name: "/static/files/i18n/en_US/index/en0107_4.jpg",
            link: "javascript:;"
        },
        {
            name: "/static/files/i18n/en_US/index/en0107_5.jpg",
            link: "http://ioteams.com",
            target: "_blank"
        }]
    }: "de_DE" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/de_DE/index/de0217_1.jpg",
            link: "/"
        },
        {
            name: "/static/files/i18n/de_DE/index/de0222_2.jpg",
            link: "/"
        },
        {
            name: "/static/files/i18n/de_DE/index/de0222_4.jpg",
            link: "/"
        }]
    }: "ru_RU" === IOT.i18n ? {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/static/files/i18n/ru_RU/index/ru0217_1.jpg",
            link: "/"
        },
        {
            name: "/static/files/i18n/ru_RU/index/ru0222_2.jpg",
            link: "/"
        },
        {
            name: "/static/files/i18n/ru_RU/index/ru0222_4.jpg",
            link: "/"
        }]
    }: {
        dots: !0,
        aDuring: 3e3,
        aBack: !1,
        banners: [{
            name: "/assets/yd_banner5.jpg",
            link: "/bbs/topics/413",
            target: "_blank"
        },
        {
            name: "/assets/yd_banner5.jpg",
            link: "http://ioteams.com",
            target: "_blank"
        }]
    }),
    e.bindHoverForCloud(),
    e.bindUnHoverForApp(),
    e.bindHoverForData()
} ();

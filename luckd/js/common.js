//cookie begin
!(function (e) {
  var n = !1;
  if (
    ("function" == typeof define && define.amd && (define(e), (n = !0)),
    "object" == typeof exports && ((module.exports = e()), (n = !0)),
    !n)
  ) {
    var o = window.Cookies,
      t = (window.Cookies = e());
    t.noConflict = function () {
      return (window.Cookies = o), t;
    };
  }
})(function () {
  function g() {
    for (var e = 0, n = {}; e < arguments.length; e++) {
      var o = arguments[e];
      for (var t in o) n[t] = o[t];
    }
    return n;
  }
  return (function e(l) {
    function C(e, n, o) {
      var t;
      if ("undefined" != typeof document) {
        if (1 < arguments.length) {
          if (
            "number" == typeof (o = g({ path: "/" }, C.defaults, o)).expires
          ) {
            var r = new Date();
            r.setMilliseconds(r.getMilliseconds() + 864e5 * o.expires),
              (o.expires = r);
          }
          o.expires = o.expires ? o.expires.toUTCString() : "";
          try {
            (t = JSON.stringify(n)), /^[\{\[]/.test(t) && (n = t);
          } catch (e) {}
          (n = l.write
            ? l.write(n, e)
            : encodeURIComponent(String(n)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (e = (e = (e = encodeURIComponent(String(e))).replace(
              /%(23|24|26|2B|5E|60|7C)/g,
              decodeURIComponent
            )).replace(/[\(\)]/g, escape));
          var i = "";
          for (var c in o)
            o[c] && ((i += "; " + c), !0 !== o[c] && (i += "=" + o[c]));
          return (document.cookie = e + "=" + n + i);
        }
        e || (t = {});
        for (
          var a = document.cookie ? document.cookie.split("; ") : [],
            s = /(%[0-9A-Z]{2})+/g,
            f = 0;
          f < a.length;
          f++
        ) {
          var p = a[f].split("="),
            d = p.slice(1).join("=");
          this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
          try {
            var u = p[0].replace(s, decodeURIComponent);
            if (
              ((d = l.read
                ? l.read(d, u)
                : l(d, u) || d.replace(s, decodeURIComponent)),
              this.json)
            )
              try {
                d = JSON.parse(d);
              } catch (e) {}
            if (e === u) {
              t = d;
              break;
            }
            e || (t[u] = d);
          } catch (e) {}
        }
        return t;
      }
    }
    return (
      ((C.set = C).get = function (e) {
        return C.call(C, e);
      }),
      (C.getJSON = function () {
        return C.apply({ json: !0 }, [].slice.call(arguments));
      }),
      (C.defaults = {}),
      (C.remove = function (e, n) {
        C(e, "", g(n, { expires: -1 }));
      }),
      (C.withConverter = e),
      C
    );
  })(function () {});
});
//cookie end

function getErrorMessageByKey(errors, required_key) {
  for (var key in errors) {
    if (required_key == key && errors.hasOwnProperty(key)) {
      // console.log(errors[key]);
      return errors[key][0];
    }
  }

  return "";
}

var LS = {
  isDevMode: function () {
    return (
      window.location.hostname != "www.lefujiayuan.com" &&
      window.location.hostname != "www.lefujiayuan.cn" &&
      window.location.hostname != "www.lovestruck.com"
    );
  },

  isChina: function () {
    return window.location.pathname.indexOf("/shenzhen") > -1;
  },

  handleBannerGoldenLine: function () {
    var width = $(window).width();
    // console.log(width);
    // console.log(width < 1023);
    // console.log('banner golden line');
    if (width >= 1023) {
      var h = $(".banner-left").height();
      var my_h = $(".banner-right").height();
      if (my_h < h) {
        // console.log('set --');
        $(".banner-right .box-banner").css({ height: h - 15 });
      }
    } else {
      console.log("unset --");
      $(".banner-right .box-banner").css({ height: "auto" });
    }
  },

  handleReadMore: function () {
    if (!$.fn.dotdotdot) return false;

    // dotdotdot
    $("#success-stories .box p").dotdotdot();

    $(".readmore").click(function (e) {
      e.preventDefault();

      var content = $(this).prev("p").triggerHandler("originalContent");

      $(".modal-body").html(content);
    });
  },

  handleForm: function () {
    $("#booking-form").submit(function (e) {
      e.preventDefault();

      $.post(post_url, $(this).serialize(), function (rs) {
        console.log(rs);
        if (rs.status_code == 301) {
          // ok and redirect
          window.location = rs.data.redirect_url;
        } else if (rs.status_code == 400) {
          // display error
          var errors = rs.data.errors;
          console.log(errors);

          var $inputs = $("form input, form select");
          $.each($inputs, function (key, v) {
            if (!$inputs.hasOwnProperty(key)) return true;

            var $input = $(v);
            if (!$input.length) {
              return true;
            }

            var $helpBlock = $input.next();
            var msg = getErrorMessageByKey(errors, $input.attr("name"));
            if (msg) {
              $helpBlock.text(msg);
              $helpBlock.show();
            } else {
              $helpBlock.text("");
              $helpBlock.hide();
            }
          });

          if (errors.hasOwnProperty("ip")) {
            $inputs.last().next().text("you try again later");
          }
        }
      });
    });
  },

  handleMinorPage: function () {
    /**
     *
     * @param target_id string
     * @param no_redirect
     * @returns {boolean}
     */
    function scrollToTarget(target_id, no_redirect) {
      var $target = $(target_id);
      // console.log($target);
      // window.tmp = $target;

      // console.log('scrollToTarget ' + target_id, $target.length);

      if (!$target.length && !no_redirect) {
        window.location = "/infinity/" + target_id;
        return true;
      }

      var target_id_name = target_id.replace("#", "");
      var $target_tmp = document.getElementById(target_id_name);
      var h_position = $target.position().top; // this not correct ! \_/
      // var h_position = Math.abs($target_tmp.getBoundingClientRect().top) + 200;
      // console.log(target_id_name);
      // console.log('target height ' + h_position);

      $("html, body").animate({ scrollTop: h_position }, 0);
    }

    // hide menu
    // if ($(window).width() <= 990) {
    //     $('#bs-example-navbar-collapse-1').hide();
    // }

    // scroll to top
    $("#scroll-to-top, .to-top").click(function (e) {
      e.preventDefault();

      $("html, body").animate({ scrollTop: 0 }, 0);

      $("input, select").first().focus();
    });

    if (window.location.hash) {
      console.log("scroll by hash");
      // setTimeout(function(){
      scrollToTarget(window.location.hash, true);
      // }, 500)
    } else {
      // focus input
      setTimeout(function () {
        if ($(window).scrollTop() < 500) {
          $("input, select").first().focus();
        }
      }, 1000);
    }

    // menu scroll to div
    // $('a.nav-link').click(function(e){
    //     var target_id = $(this).data('target-id');
    //     if (target_id){
    //         e.preventDefault();
    //
    //         scrollToTarget(target_id);
    //
    //         return false;
    //     }
    // });
  },

  handleMatchMaker: function () {
    // show more matchmaker
    $(".teams .more-info").click(function () {
      var $teams = $(this).closest(".teams");
      $teams.toggleClass("active");

      var data = $(this).data();
      if ($teams.hasClass("active")) {
        $(this).text(data.textLess);
      } else {
        $(this).text(data.textMore);
      }
    });

    $(".teams .more-info").text($(".teams .more-info").data("textMore"));
  },

  onResize: function () {
    this.handleBannerGoldenLine();
  },

  onPageLoad: function () {
    // $('img[height="1"]').hide();
    setTimeout(function () {
      if ($('img[height="1"]').length > 0) {
        $('img[height="1"]').hide();
      }
    }, 800);
    //this.handleBannerGoldenLine();
    //this.handleReadMore();
    //this.handleForm();
    // this.handleMinorPage();         // todo enable
    //this.handleMatchMaker();
    // this.navactive();

    if ($(".cookie_privacy").length > 0) {
      var consent = Cookies.get("consent");
      // ucook = null;
      if (!consent) {
        $(".cookie_privacy").show();
        $(".cookie_setting").on("click", function () {
          $(".ucookie1").hide();
          $(".ucookie2").show();
        });

        $(".cookie_reject").on("click", function () {
          $(".cookie_privacy").hide();
          // LS.storage.set('cpop', 1);
          Cookies.set("consent", '{"accept all":false}', {
            expires: 90,
            path: "/",
          });
          // location.reload();
        });

        $(".accept_essential").on("click", function () {
          $(".cookie_privacy").hide();
          // LS.storage.set('cpop', 1);
          Cookies.set("consent", '{"accept all":false}', {
            expires: 90,
            path: "/",
          });
          // location.reload();
        });

        $(".cookie_agree,.allow_continue,.accept_all").on("click", function () {
          $(".cookie_privacy").hide();
          Cookies.set("consent", '{"accept all":true}', {
            expires: 90,
            path: "/",
          });
          // LS.storage.set('cpop', 1);
          // location.reload();
        });
      }
    }
  },

  navactive: function () {
    var city = location.pathname.split("/")[2];
    if (!city) {
      return false;
    }
    $('.lsi-localtion-navbar a[data-location="' + city + '"]')
      .removeClass("text-muted")
      .addClass("text-ls-y");
    return false;
  },

  log: function () {
    if (this.isDevMode()) console.log(arguments);
  },

  fbq_track: function (event_name) {
    // if (this.isChina() || !window.fbq) return false;
    //
    // fbq('track', event_name);
  },

  getRequest: function () {
    var url = location.search,
      theRequest = {};

    if (url.indexOf("?") != -1) {
      var strs = url.substr(1).split("&");

      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(
          strs[i].split("=")[1]
        );
      }
    }
    return theRequest;
  },
  setUtmData: function () {
    return false;
    //utm_source, utm_medium, utm_campaign, utm_term

    var req = LS.getRequest(),
      cookie_config = { expires: 30, path: "/" };
    if (req["utm_source"]) {
      Cookies.set("utmSource", req["utm_source"], cookie_config);
    }
    if (req["utm_medium"]) {
      Cookies.set("utmMedium", req["utm_medium"], cookie_config);
    }
    if (req["utm_campaign"]) {
      Cookies.set("utmCampaign", req["utm_campaign"], cookie_config);
    }
    if (req["utm_term"]) {
      Cookies.set("utmTerm", req["utm_term"], cookie_config);
    }
    if (req["utm_content"]) {
      Cookies.set("utmContent", req["utm_content"], cookie_config);
    }
  },
  removeUtmData: function () {
    var cookie_config = { path: "/" };
    Cookies.remove("utmSource", cookie_config);
    Cookies.remove("utmMedium", cookie_config);
    Cookies.remove("utmCampaign", cookie_config);
    Cookies.remove("utmTerm", cookie_config);
    Cookies.remove("utmContent", cookie_config);
  },
  getUtmData: function () {
    return {
      utm_source: AD_utm_source,
      utm_medium: AD_utm_medium,
      utm_campaign: AD_utm_campaign,
      utm_term: AD_utm_term,
      utm_content: AD_utm_content,
      utm_agid: AD_utm_agid,
    };
    // return{
    //     "utm_source": Cookies.get("utmSource") ? Cookies.get("utmSource") : "",
    //     "utm_medium": Cookies.get("utmMedium") ? Cookies.get("utmMedium") : "",
    //     "utm_campaign": Cookies.get("utmCampaign") ? Cookies.get("utmCampaign") : "",
    //     "utm_term": Cookies.get("utmTerm") ? Cookies.get("utmTerm") : "",
    //     "utm_content": Cookies.get("utmContent") ? Cookies.get("utmContent") : ""
    // };
  },
  get_date_str: function (y, m, d) {
    m = m + 1;
    if (m < 10) {
      m = "0" + m;
    }

    if (d < 10) {
      d = "0" + d;
    }

    return {
      en: d + "/" + m + "/" + y,
      cn: y + "-" + m + "-" + d,
    };
  },
  //LinkedIn conversion tracking LS website
  addLinkedinAds: function () {
    $("body").append(
      `<img height="1" width="1" style="display:none;" alt="" src="https://dc.ads.linkedin.com/collect/?pid=1226412&conversionId=665883&fmt=gif" />`
    );
  },
  gtag_act: function (step_v) {
    // return false;
    if (LS.isChina() || !window.gtag || !window.fbq || !window.uetq) {
      console.log("not found");
      return false;
    }
    // gtag('event', 'generate_lead', { 'value': step_v});
    // gtag('event', 'generate_lead', {value: step_v, send_to: 'ga4'});
    // fbq('trackCustom', 'DIA_Step' + step_v);
    // window.uetq && window.uetq.push('event',       'submit',       {'event_category': 'form',       'event_label': 'dia',       'event_value': '0'});

    // ref: https://help.ads.microsoft.com/#apex/ads/en/56916/2
    // window.uetq = window.uetq || [];
    //
    // window.uetq.push ('event', 'submit', {
    //     'event_category': 'form',
    //     'event_label': 'dia',
    //     'event_value': 0 // enforce to zero, aligin Goal setting
    // });
    // window.uetq.push ('event', 'test', {
    //     'event_category': 'test',
    //     'event_label': 'test',
    //     'event_value': 999
    // });

    // console.log('gtag', 'fbq', step_v)
  },
  storage: {
    set: function (key, value, exp = 0) {
      if (typeof localStorage == "undefined") {
        console.log("localStorage undefined");
        return false;
      }
      let now = new Date().getTime();
      let exp_key = `${key}_expiry`;

      exp = exp ? now + exp * 1000 : 0;

      localStorage.setItem(exp_key, exp);
      if (typeof value == "object") {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    },
    get: function (key) {
      // console.log('-----storage get:', key)
      if (typeof localStorage == "undefined") {
        console.log("localStorage undefined");
        return false;
      }
      let now = new Date().getTime();
      let exp_key = `${key}_expiry`;
      let expiry = localStorage.getItem(exp_key);
      //console.log(expiry,now)
      if (expiry > 0 && expiry < now) {
        this.remove(key);
        return false;
      }
      let cache = localStorage.getItem(key);
      try {
        return cache ? JSON.parse(cache) : false;
      } catch (e) {
        //console.log("is not object");
        return cache;
      }
    },
    remove: function (key) {
      if (typeof localStorage == "undefined") {
        return false;
      }
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expiry`);
    },
    clear: function () {
      if (typeof localStorage == "undefined") {
        return false;
      }

      localStorage.clear();
    },
    setAuthTag: function () {
      this.set("hasAuth", 1, 60);
    },
    getAuthTag: function () {
      return this.get("hasAuth");
    },
  },
  check: {
    detectSQLInjection: function (text) {
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b.*\b(FROM|INTO|TABLE)\b)/i,
        /('|"|`).*('|"|`).*(OR|AND).*=/i,
        /--|\/\*|\*\//,
        /;\s*(SELECT|INSERT|UPDATE|DELETE|DROP)/i,
        /EXEC(\s|\()/i,
        /xp_cmdshell/i,
      ];

      return sqlPatterns.some((pattern) => pattern.test(text));
    },
    email_format: function (value) {
      value = value.replace(/ +/g, "");
      return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
        value
      );
    },
    check_phone_number: function (icode, mobile) {
      if (!mobile) {
        return false;
      }
      if (!LS.check.check_country_number(icode)) {
        return false;
      }
      mobile = mobile.replace(/\s+/g, "");
      if (typeof icode == "string") {
        icode = icode.replace("+", "");
        icode = parseInt(icode);
      }
      /**
         * 2023.12.07
         * select case country code
         * case 1:
         * Digits 10
         * Prefix: Any

         * case 852
         * Digits: 8
         * Prefix: 2,3,4,5,6,7,9

         * case 65
         * Digits: 8
         * Prefix: 3,6,8,9

         * case 66:
         * Digits: 9 or 10
         * Prefix: 02,03,04,05,06,08,09,2,3,4,5,6,7,8,9

         * case 44:
         * Digits: 10 or 11
         * Prefix: 01,02,07,1,2,7

         * case 86
         * Digits 11
         * Prefix: 1

         * case else:
         * Digits: >=7 and <=12
         * Prefix: Any

         */
      let regex = /^[0-9]{7,12}$/;

      switch (icode) {
        case 1:
          regex = /^[0-9]{10}$/;
          break;
        case 86:
          regex = /^1[0-9]{10}$/;
          break;
        case 852:
          regex = /^[0-9]{8}$/;
          // regex = /^(2|3|4|5|6|7|9)[0-9]{7}$/;
          break;
        case 65:
          regex = /^[0-9]{8}$/;
          // regex = /^(3|6|8|9)[0-9]{7}$/;
          break;
        case 66:
          regex = /^[0-9]{9,10}$/;
          break;
        case 44:
          regex = /^[0-9]{10,11}$/;
          break;
      }
      return regex.test(mobile);
    },
    check_phone_number2: function (mobile) {
      return /^[0-9]{6,15}$/.test(mobile);
    },
    check_country_number: function (icode) {
      return /^[0-9]{1,4}$/.test(icode);
    },
  },
  layer: {
    msg: function (txt) {
      layer.open({
        content: txt,
        skin: "msg",
        time: 2,
      });
    },
    loading: function () {
      return layer.open({ type: 2 });
    },
    close: function (lindex) {
      layer.close(lindex);
    },
    closeAll: function () {
      layer.closeAll();
    },
  },
  getLsLangCode: function (lang_key) {
    lang_key = lang_key.toLowerCase();
    if (lang_key.indexOf("en") > -1) {
      return "en_US";
    } else if (lang_key.indexOf("cn") > -1) {
      return "zh_CN";
    } else if (lang_key.indexOf("hk") > -1) {
      return "zh_HK";
    } else if (lang_key.indexOf("th") > -1) {
      return "th";
    } else {
      return "en_US";
    }
  },
  getRouteLangCode: function (lang_key) {
    lang_key = lang_key.toLowerCase();
    if (lang_key.indexOf("en") > -1) {
      return "en";
    } else if (lang_key.indexOf("cn") > -1) {
      return "zh-CN";
    } else if (lang_key.indexOf("hk") > -1) {
      return "zh-HK";
    } else if (lang_key.indexOf("th") > -1) {
      return "th";
    } else {
      return "en";
    }
  },
  getAppCityPath: function (path) {
    return path;
    // return path.replace('-', '')
  },
  story: {
    eventInit: function () {
      $(".viewMoreStoryText").on("click", function () {
        let self = $(this),
          successStoryDesc = self.prev(".successStoryDesc");
        // console.log('height', successStoryDesc.css('height'))
        let h = "210px";
        if (successStoryDesc.hasClass("v2")) {
          h = "125px";
        }
        console.log("");

        if (successStoryDesc.css("height") == h) {
          successStoryDesc.css({ height: "auto" });
          self.html(lang_view_less);
        } else {
          successStoryDesc.css({ height: h });
          self.html(lang_view_more);
        }
      });
    },
  },
  device: {
    isAndroid: function () {
      if (
        /Linux/i.test(navigator.userAgent) &&
        /android/i.test(navigator.userAgent.toLowerCase())
      ) {
        return true;
      }
      return false;
    },
    isiOS: function () {
      if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true;
      }
      return false;
    },
  },
  countryList: {
    currentFlag: "",
    currentICode: "",
    init: function (country) {
      let self = this;
      console.log("countryList", country, self.currentFlag, self.currentICode);
      self.currentFlag = _.get(country, "flag_url");
      self.currentICode = _.get(country, "dial_code");

      self.setCurrentCode();
      self.bindEvent();
    },
    showCountrySmsCode: function (obj) {
      let countryCodeBox = $(obj)
        .closest(".input-group")
        .children(".countryCodeBox");
      countryCodeBox.css({ top: "51px" }).show();
    },
    hideCountrySmsCode: function () {
      $(".countryCodeBox").css({ top: "85px" }).hide();
    },
    bindEvent: function () {
      let self = this;

      $(".countty-list a.country_item").on("click", function () {
        let icode = $(this).attr("data-code");

        self.currentFlag = $(this).children("img").attr("src");
        self.currentICode = icode;
        self.hideCountrySmsCode();
        self.setCurrentCode();
      });
    },
    setCurrentCode: function () {
      let self = this;
      $(".currentICode").html(
        `<img src="${self.currentFlag}" class="mr-2" height="20"/> +${self.currentICode} ▼`
      );
    },
  },
  setLSLoginData: function (client) {
    LS.storage.set("user", {
      id: _.get(client, "client_id", ""),
      userId: _.get(client, "client_id", ""),
      token: _.get(client, "access_token", ""),
      is_new_user: _.get(client, "is_new_user", 0),
      isEmployee: false,
      isCrm: true,
    });
    LS.storage.set("userInfo", client);
    LS.storage.set("token", _.get(client, "access_token", ""));
  },
};

$(function () {
  LS.onPageLoad();
  LS.setUtmData();
  // $(window).resize(function(){
  //     LS.onResize();
  // });

  // LS.story.eventInit();

  setTimeout(function () {
    if ($('img[height="1"]').length > 0) {
      $('img[height="1"]').hide();
    }
  }, 200);

  $(document).on("click", function (e) {
    if ($(".countryCodeBox").length == 0) {
      return;
    }
    // console.log('doc', e.target.className)
    var codeClasses = ["countryCodeBox", "currentICode"];
    let exit = false;
    for (let cla of codeClasses) {
      if (e.target.className.indexOf(cla) > -1) {
        exit = true;
        break;
      }
    }
    if (!exit) {
      // phoneInputObj.hideCountrySmsCode();
      LS.countryList.hideCountrySmsCode();
    }

    var target = $(event.target);
    // console.log("target", target);
    if (
      !target.closest(".icode").length &&
      !target.closest(".icodeList").length
    ) {
      $(".icodeList").hide();
    }
  });
});

var LSApiObj = {
  BASE_URL: `${APP_API_BASE}/`, //'https://api.lovestruck.com/api/',
  BASE_HEADERS: {
    "App-Name": location.host.indexOf("ever.") > -1 ? "ever-web" : "ls6-web",
  },
  axiosObj: null,
  client_id: null,
  getMe: function () {
    let self = this;
    // console.log('getMe')
    let token = localStorage.getItem("token");
    // console.log('getMe', token)
    if (!token) {
      return false;
    }
    this.setToken(token);
    this.postRequest("v2/authorise/loginFromToken", {})
      .then(function (rs) {
        // console.log('get me', _.get(rs, 'data'))
        if (_.get(rs, "data.client_id")) {
          localStorage.setItem(
            "ls_city",
            _.get(rs, "data.city_url", "hong-kong")
          );
          let re_url = self.parseFirstLoadPage(_.get(rs, "data"));
          // console.log("re_url", re_url)
          location.href = re_url;
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        console.log("get me", err);
      });
  },
  initLS: function (lang) {
    if (!this.axiosObj) {
      this.axiosObj = axios.create({
        baseURL: this.BASE_URL,
        timeout: 10000,
        responseType: "json",
        responseEncoding: "utf8",
        headers: {
          "Accept-Language": lang,
          "ls-wishes": "no_legacy",
          //'Content-Type':'application/x-www-form-urlencoded'
        },
      });
    }

    this.axiosObj.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // console.log('error', error)
        if (error && error.response) {
          switch (error.response.status) {
            // case 400: error.message = '请求错误'; break
            case 401:
              error.message = "Authorize failed";
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = "Not found";
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 500:
              error.message = "服务器内部错误";
              break;
            case 501:
              error.message = "服务未实现";
              break;
            case 502:
              error.message = "网关错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "Time out";
              break;
            case 505:
              error.message = "HTTP版本不受支持";
              break;
            case 400:
            case 606:
              error.message = _.get(error, "response.data.error.body");
              // console.log('606', error.response)
              break;
            default:
              break;
          }
        }
        // errorLog(error)
        return Promise.reject(error);
      }
    );
  },
  setToken: function (token) {
    this.BASE_HEADERS["Authorization"] = token;
  },
  setId: function (id) {
    this.client_id = id;
  },

  setPostContentType: function () {
    this.BASE_HEADERS["Content-Type"] = "application/x-www-form-urlencoded";
  },

  postRequest: function (url, data) {
    this.setPostContentType();

    return this.axiosObj.request({
      method: "post",
      url: url,
      data: data,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
      headers: this.BASE_HEADERS,
    });
  },

  putRequest: function (url, data) {
    return this.axiosObj.request({
      method: "put",
      url: url,
      data: data,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
      headers: this.BASE_HEADERS,
    });
  },

  getRequest: function (url, params) {
    return this.axiosObj.request({
      method: "get",
      url: url,
      params: params,
      headers: this.BASE_HEADERS,
    });
  },

  parseFirstLoadPage: function (response) {
    let refv = "";
    if (response.is_new_user == 1) {
      refv = "signup";
    }
    let path = "";
    let query = ""; //lang=${response.lang_code}
    let firstLoadPage = _.get(response, "uncompleted_field.profile_step");
    // firstLoadPage = 'profile_step3'
    // if (firstLoadPage.indexOf("profile_step") > -1) {
    if (firstLoadPage) {
      // let step = firstLoadPage.replace("profile_step", "")
      path = `reg-step`;
      // let stepV = 'miss';
      let stepV = firstLoadPage.replace("profile_step", "");
      if (
        _.get(response, "membership_level_id", 0) > 1 &&
        stepV != "email" &&
        stepV != "idphoto" &&
        stepV != "idphoto_dis"
      ) {
        stepV = "miss";
        // stepV = firstLoadPage.replace("profile_step", "")
      }
      // query = `${query}&step=${step}`
      query = `?step=${stepV}`;
    } else {
      firstLoadPage = _.get(response, "first_load_page");
      switch (firstLoadPage) {
        case "search":
        case "match":
          path = "matchmaking-new-matches";
          break;
        case "free_page":
          path = "matchmaking";
          break;
        case "elites":
          path = "elite/list";
          break;
        case "client_chat":
          path = "chat";
          break;
        case "op_matches":
          path = "op-matches";
          break;
        default:
          path = "op-matches";
          break;
      }
    }

    //${_.get(response, 'city_url')}/
    //         query = `${query}&ls_city=${_.get(response, 'city_url')}`
    url = `${location.origin.replace("-uat", "")}/app/${path}${query}`;
    console.log("url", url);
    return url;
  },
};

var mmapiObj = {
  BASE_URL: "https://app.lovestruck.com/api/",
  BASE_HEADERS: {},
  MMapiAxios: null,
  LSApiAxios: null,
  startup_data: null,
  client_id: null,
  client_data: null,

  init: function (lang) {
    if (!this.MMapiAxios) {
      console.log("inin mmapi");
      this.MMapiAxios = this.createAxios(lang);
    }

    if (!this.startup_data) {
      this.getStartup();
    }
  },

  setToken: function (token) {
    this.BASE_HEADERS["Authorization"] = token;
  },
  setId: function (id) {
    this.client_id = id;
  },

  setPostContentType: function () {
    this.BASE_HEADERS["Content-Type"] = "application/x-www-form-urlencoded";
  },

  createAxios: function (lang) {
    return axios.create({
      baseURL: this.BASE_URL,
      timeout: 3000,
      responseType: "json",
      responseEncoding: "utf8",
      headers: {
        "Accept-Language": lang,
        //'Content-Type':'application/x-www-form-urlencoded'
      },
    });
  },

  getStartup: function () {
    this.startup({}, function (d) {
      // console.log(d);
      if (d.data.links) {
        mmapiObj.startup_data = d.data;
      } else {
        console.log("startup failed.");
      }
    });
  },

  getClientInfo: function () {
    this.client_me({}, function (d) {
      if (d.data.client) {
        mmapiObj.client_data = d.data.client;
        mmapiObj.client_id = d.data.client.client_id;
      }
    });
  },

  getLink: function (id) {
    try {
      let link = this.startup_data["links"][id]["link"];
      return link.replace("{{client_hash}}", this.client_data.client_hash);
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  test: function (data, successCallBack, errorCallBack, finallyCallBack) {
    this.setPostContentType();
    this.postRequest(
      "test/clientdata",
      data,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  login_getVerificationCode: function (
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.setPostContentType();
    this.postRequest(
      "login/getVerificationCode",
      data,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  client_verifyVerificationCode: function (
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.setPostContentType();
    this.postRequest(
      "client/verifyVerificationCode",
      data,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  client_me: function (
    params,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.getRequest(
      "client/me",
      params,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  client_info: function (
    params,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.getRequest(
      "client/info",
      params,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  client_update: function (
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.setPostContentType();
    if (this.client_id) {
      this.putRequest(
        "client/" + this.client_id,
        data,
        successCallBack,
        errorCallBack,
        finallyCallBack
      );
      return;
    }
    this.postRequest(
      "client/update",
      data,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  client_generateInitialMatches: function (
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.setPostContentType();
    this.postRequest(
      "client/generateInitialMatches",
      data,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  startup: function (params, successCallBack, errorCallBack, finallyCallBack) {
    this.getRequest(
      "startup",
      params,
      successCallBack,
      errorCallBack,
      finallyCallBack
    );
  },

  postRequest: function (
    url,
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.MMapiAxios.request({
      method: "post",
      url: url,
      data: data,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
      headers: this.BASE_HEADERS,
    })
      .then(function (response) {
        successCallBack && successCallBack(response);
      })
      .catch(function (error) {
        errorCallBack && errorCallBack(error);
      })
      .then(function (response) {
        finallyCallBack && finallyCallBack(response);
      });
  },

  putRequest: function (
    url,
    data,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.MMapiAxios.request({
      method: "put",
      url: url,
      data: data,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
      headers: this.BASE_HEADERS,
    })
      .then(function (response) {
        successCallBack && successCallBack(response);
      })
      .catch(function (error) {
        errorCallBack && errorCallBack(error);
      })
      .then(function (response) {
        finallyCallBack && finallyCallBack(response);
      });
  },

  getRequest: function (
    url,
    params,
    successCallBack,
    errorCallBack,
    finallyCallBack
  ) {
    this.MMapiAxios.request({
      method: "get",
      url: url,
      params: params,
      headers: this.BASE_HEADERS,
    })
      .then(function (response) {
        successCallBack && successCallBack(response);
      })
      .catch(function (error) {
        errorCallBack && errorCallBack(error);
      })
      .then(function (response) {
        finallyCallBack && finallyCallBack(response);
      });
  },
};

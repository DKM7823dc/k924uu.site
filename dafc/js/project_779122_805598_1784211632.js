
        (function(d, s, id, w, n) {
            w.__ssc = w.__ssc || {};
            w.__ssc.license = 'g1v13lj';
            if (w.ssq) return false;
            n = w.ssq = function() {n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            n.push=n;n.loaded=!0;n.queue=[];
            var js, sjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            var deUrl = atob('aHR0cHM6Ly9wbHVnaW4tY29kZS5zYWxlc21hcnRseS5jb20='), path = '/chat/widget-v2/code/install.js';
            var cs = d.currentScript, csUrl = deUrl;
            if (cs && cs.src) {var scriptURL = new URL(cs.src); csUrl = scriptURL.origin;}
            js.src = csUrl + path;
            sjs.parentNode.insertBefore(js, sjs);
            js.onerror = function() {
                if (d.getElementById(id)) {var el = d.getElementById(id); el.parentNode.removeChild(el);}
                var newJs = d.createElement(s); newJs.id = id;
                newJs.src = deUrl + path;
                sjs.parentNode.insertBefore(newJs, sjs);
            }
        }(document, 'script', 'ss-chat', window));
        
var tool = (function () {
    var setRunObj = setRun();
    return {
        urlVal: urlVal/* 获得浏览器参数(url地址_可选)-返回obj */
    };
})();

function setRun() {
    setArrPrototypFind();
};

var SynChannelObj = {};/* Sync同步容器 */
var setSave = {};
function setArrPrototypFind() {
    if (!Array.prototype.find) {
        Array.prototype.find = function (findCallFn) {
            var ourArrVal, nowArr = this;
            ourArrVal = arrFindFn(nowArr);
            /* 建立数组过滤取值 */
            function arrFindFn(arr, aKey) {
                for (var a = 0; a < arr.length; a++) {
                    if (findCallFn(arr[a], a)) {
                        return arr[a];
                    };
                };
            };
            return ourArrVal;
        };
    };
};


/* 获得浏览器参数(url地址_可选)-返回obj */
function urlVal(url) {
    if (setSave.urlVal && setSave.urlVal[window.location.href]) { return setSave.urlVal[window.location.href]; }
    else {
        if (!setSave.urlVal) { setSave.urlVal = {}; };
        var urlVal = {}, urlArr = (url || window.location.href).split("?"), forUrl = [];
        if (urlArr.length > 1) {
            for (var d = 0; d < urlArr.length; d++) {
                if (d) { /* 去除不必要的字符 */
                    forUrl.push(urlArr[d].replace(/#.*/, ''));
                };
            };
            urlVal = urlStringToObj(forUrl);
        };
        setSave.urlVal[window.location.href] = urlVal;
        return urlVal;
        /* 将参赛字符串转对象方法 */
        function urlStringToObj(urlStrinArrVal) {
            var outVal = {};
            for (var r = 0; r < urlStrinArrVal.length; r++) {
                var urlValArr = urlStrinArrVal[r].split('&');
                for (var n = 0; n < urlValArr.length; n++) {
                    var valuKeyAr = urlValArr[n].split("=");
                    outVal[valuKeyAr[0]] = valuKeyAr[1];
                };
            };
            return outVal;
        };
    };
};

/*xxx 目录@@
声明 ID_181118130033
执行 ID_181118130037
    注册 ID_181118130054
    逻辑 ID_181118130057
构建 ID_181118130040
    内变量 ID_181118130101
*/

// 声明 ID_181118130033
var obj = {
    re: function (cafn) {
        if (document.readyState != "complete") {
            document.onreadystatechange = function () {
                document.readyState == "complete" ? cafn() : {};
            };
        }
        else {
            setTimeout(cafn, 0);
        };
    }
};

// 执行 ID_181118130037
obj.re(function () {
    var thiss = new obj.fn();
    // 注册 ID_181118130054
    thiss.varGetAjaxConfig = thiss.setGetAjaxConfig;//注册 获取配置
    thiss.varFinNowConfig = thiss.setFinNowConfig;//注册 确定当前配置
    thiss.varSetPro = thiss.setSetPro;//注册 设定产品
    thiss.varSetLtd = thiss.setSetLtd;//注册 设定公司信息
    thiss.varSetEmail = thiss.setSetEmail;//注册 设定邮件信息
    thiss.varSetPageShow = thiss.setSetPageShow;//注册 让页面展示
    thiss.varSetProSet = thiss.setSetProSet;//注册 单独品时处理
    thiss.varSetNewLtdS = thiss.setSetNewLtdS;//注册 单独处理公司其他方法
    thiss.varLtdYsConfig = thiss.setLtdYsConfig;//注册 公司隐私政策数据配置
    thiss.varVueConfig = thiss.setVueConfig;//注册 注册Vue对象
    // 逻辑 ID_181118130057
    /* 处理第三方隐私配置 */
    thiss.varLtdYsConfig();
    /* 设立第三方隐私配置 */
    thiss.varVueConfig();
    /* Set HF Configs */
    thiss.getHFConfig();
    /* 获取公司配置 */
    // thiss.varGetAjaxConfig(function (config, configAll) {
    //     var nowConfig = thiss.varFinNowConfig(config);
    //     /* 单独品时处理 */
    //     thiss.varSetProSet(nowConfig, configAll);
    //     /* 单独处理公司非公司名的其他数据 */
    // thiss.varSetNewLtdS(da, configAll);
    /* 以下是处理原有公司时使用 */
    // thiss.varSetPro(nowConfig,configAll);
    // thiss.varSetLtd(nowConfig,configAll);
    // thiss.varSetEmail(nowConfig,configAll);
    thiss.varSetPageShow();
    thiss.setHFPro()
    // });
});

// 构建 ID_181118130040
obj.fn = function () {
    // 内变量 ID_181118130101
    var thiss = this;
    var da = {
        url: {
            appname: tool.urlVal().appname && decodeURIComponent(tool.urlVal().appname),//pro产品游戏名
            n: tool.urlVal().n && decodeURIComponent(tool.urlVal().n),//pro产品游戏名
            t: tool.urlVal().t && decodeURIComponent(tool.urlVal().t),//确定公司配置源
            ch: tool.urlVal().ch && decodeURIComponent(tool.urlVal().ch),//渠道
            company: tool.urlVal().company && decodeURIComponent(tool.urlVal().company) || 'hf',
        },
        dom: {
            txtAllDom: document.getElementById('txtAll'),//邮件Dom
            /* 保留DOM */
            emailDom: document.getElementById('email'),//邮件Dom
            emailBDom: document.getElementById('emailB'),//邮件BDom
            emailCDom: document.getElementById('emailC'),//邮件CDom-不一定用随DOM注释做判断
            bodyInDom: document.getElementById('bodyIn'),//bodyInBDom
            proDom: document.getElementById('pro'),//产品Dom
            nameDom: document.getElementById('name'),//公司名Dom
            makeTimeDom: document.getElementById('makeTime'),
            updateTimeDom: document.getElementById('updateTime')
        }
    };
    //公共数据对象
    // SynChannelObj = {},
    // Sync = function(json,valIfs,callFns){json = json&&{name:false,valIfs:false,IfVcallFn:function(){},channel:2,}; if(!json.name&&typeof json!='string'){console.log('同步昵称错误');return;}; var nowName = false,nowCallFn = false,nowChannel = 0,valIf; if(typeof json!='string'){ nowName = json.name; valIf = json.valIfs; nowCallFn = json.callFn; }else{ nowName = json; valIf = valIfs; nowCallFn = callFns; }; if(!SynChannelObj[nowName]){ SynChannelObj[nowName] = {callFnList:[],ruanFnok:[]}; }; SynChannelObj[nowName].callFnList.push(nowCallFn); SynChannelObj[nowName].nowChannel = SynChannelObj[nowName].callFnList.length; if(valIf){ var lengthNumber = 0; (function runSync(){ if(lengthNumber<SynChannelObj[nowName].nowChannel){ SynChannelObj[nowName].callFnList[lengthNumber](); SynChannelObj[nowName].ruanFnok.push(SynChannelObj[nowName].callFnList[lengthNumber]); lengthNumber++; runSync(); }else{ SynChannelObj[nowName].callFnList.splice(0,SynChannelObj[nowName].callFnList.length); }; })(); }; };
    thiss.setGetAjaxConfig = function (call) {
        /* 原生ajax请求 */
        var ajax = new XMLHttpRequest();//创建ajax对象
        // ajax.open('GET','./data/config.json',true);//设定发送数据方式
        ajax.open('GET', 'https://yxc.vzhifu.net/user/private/v1/emailInfo', true);//设定发送数据方式
        ajax.onreadystatechange = function () {//获取响应信息
            if (ajax.status == '200' && ajax.readyState == 4) {
                da.configJson = eval("(" + ajax.responseText + ")");
                if (da.configJson.code == 200) {
                    da.configJson = da.configJson.data;
                    // da.configJsonAll = da.configJson[0];
                    // da.configJsonAll = da.configJson.data;
                    // da.configJson = da.configJsonAll&&da.configJsonAll.set;
                    call(da.configJson, { notSet: 1, set: da.configJson, });
                } else {
                    console.error('接口请求异常');
                };
            };
        };
        ajax.send();//发送ajax数据
    };

    thiss.getHFConfig = function (call) {
        let data = hfConfig;
        da.hfconfig = data;
        call && call(da.hfconfig);
        console.log(tool.urlVal())
    };

    thiss.setHFPro = function (config) {
        da.dom.emailDom.innerHTML = da.hfconfig[da.url.company].email;
        da.dom.emailBDom.innerHTML = da.hfconfig[da.url.company].email;
        da.dom.makeTimeDom.innerHTML = da.hfconfig.mt;
        da.dom.updateTimeDom.innerHTML = da.hfconfig.ut;
    };

    thiss.setFinNowConfig = function (configVal) {
        var nowConfig = false;
        for (var c = 0; c < configVal.length; c++) {
            if (configVal[c].key == da.url.t) {
                nowConfig = configVal[c];
            };
        };
        return nowConfig;
    };

    thiss.setSetPro = function (configObj, configAll) {
        if (da.url.n) {
            da.dom.proDom.innerHTML = da.url.n;
        } else if (da.url.appname) {
            da.dom.proDom.innerHTML = da.url.appname;
        } else if (configObj) {//有公司无产品
            da.dom.notProDom.innerHTML = '';
        } else {//无公司//无产品
            da.dom.notAllDom.innerHTML = '欢迎您使用本产品！';
            // da.dom.nameDom.innerHTML = '';
            da.dom.emailDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            da.dom.emailBDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            if (da.dom.emailCDom) {/* 部分页面新增的第三个邮箱 */
                da.dom.emailCDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            };
        };
    };

    thiss.setSetLtd = function (configObj, configAll) {
        if (configObj) {//有公司
            da.dom.nameDom.innerHTML = configObj.name;
        } else if (da.url.n || da.url.appname) {//无公司有产品
            da.dom.nameDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).name;
        };
    };

    /** Old Func SetEmail */
    thiss.setSetEmail = function (configObj, configAll) {
        if (configObj) {//有公司
            da.dom.emailDom.innerHTML = configObj.email;
            da.dom.emailBDom.innerHTML = configObj.email;
            if (da.dom.emailCDom) {/* 部分页面新增的第三个邮箱 */
                da.dom.emailCDom.innerHTML = configObj.email;
            };
        } else if (da.url.n || da.url.appname) {//无公司有产品
            da.dom.emailDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
        };
    };

    thiss.setSetPageShow = function () {
        // if(!da.dom.bodyInDom){console.log('da.dom.bodyInDom,不存在');return;};
        da.dom.bodyInDom.style.display = 'block';
    };

    thiss.setSetProSet = function (configObj, configAll) {
        // if(!da.dom.txtAllDom){console.log('找不到产品设置的dome');return;};
        /* 处理产品 */
        if (da.url.n) {
            da.dom.txtAllDom.innerHTML = "欢迎您使用" + da.url.n + ",";
        } else if (da.url.appname) {
            da.dom.txtAllDom.innerHTML = "欢迎您使用" + da.url.appname + ",";
        } else {
            da.dom.txtAllDom.innerHTML = "欢迎您使用本产品！";
        };
    };

    /** New Func SetEmail */
    thiss.setSetNewLtdS = function (configObj, configAll) {
        /* 处理公司 */
        if (configObj) {//有公司
            da.dom.emailDom.innerHTML = configObj.email;
            da.dom.emailBDom.innerHTML = configObj.email;
            da.dom.txtAllDom ? da.dom.txtAllDom.innerHTML += ("本产品由" + configObj.name + "提供产品和服务！") : '';
            if (da.dom.emailCDom) {/* 部分页面新增的第三个邮箱 */
                da.dom.emailCDom.innerHTML = configObj.email;
            };
        }
        else {
            // da.dom.emailDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            console.log(da.hfconfig);
            da.dom.emailDom.innerHTML = da.hfconfig.hf.email;
            da.dom.emailBDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            da.dom.txtAllDom ? da.dom.txtAllDom.innerHTML += ("") : '';
            if (da.dom.emailCDom) {/* 部分页面新增的第三个邮箱 */
                da.dom.emailCDom.innerHTML = configAll.set.find(function (s) { return s.key == configAll.notSet; }).email;
            };
        };
    };

    var ltdYsConfig = [];
    thiss.setLtdYsConfig = function () {
        ltdYsConfig = compantConfig;
    };

    thiss.setVueConfig = function () {
        if (typeof Vue != 'undefined') {
            new Vue({
                el: "#tableFrameP",
                data: function () {
                    return {
                        /* 公司配置类别 */
                        ltdList: ltdYsConfig,
                    };
                },
                //渲染完执行
                mounted: function () {
                    let thiss = this;
                    // console.log(thiss.ltdList);
                },
            });
        } else {
            console.warn('未发现Vue对象,无法设置第三方公司隐私协议渲染');
        };
    };

};
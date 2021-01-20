//;分号解决js合并时可能会产生的错误
; (function (undefined) {  //undefined在老的浏览器是不被支持，增加一个形参undefined，就算外部的 undefined 定义了，里面的 undefined 依然不受影响；
  "use strict"
  var _global;
  

  /**
   * 获取cookie
   * @param {*} name 名称
   */
  function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr= document.cookie.match(reg)){
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  };

  /**
   * 设置COOKIE
   * @param {*} name 名称
   * @param {*} value 值
   * @param {*} time 过期时间
   */
  function setCookie(name, value, time) {
    if(time) {
      document.cookie = name + "=" + encodeURIComponent(value) + ";max-age=" + time;
    } else {
      document.cookie = name + "=" + encodeURIComponent(value) + ";";
    }
  };
  /**获取用户操作系统 */
  function getOS() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return navigator.platform;
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return navigator.platform;
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "";
  }
  /** 获取请求数组*/
  function getRequest() {
    let  entryTimesList = [];
    let entryList = window.performance.getEntries();
    entryList.forEach((item,index)=>{
    
      let templeObj = {};
      
      let usefulType = ['navigation','script','css','fetch','xmlhttprequest','link','img'];
      if(usefulType.indexOf(item.initiatorType)>-1){
        templeObj.name = item.name;
        
        templeObj.nextHopProtocol = item.nextHopProtocol;
        
        //dns查询耗时
        templeObj.dnsTime = item.domainLookupEnd - item.domainLookupStart;
  
        //tcp链接耗时
        templeObj.tcpTime = item.connectEnd - item.connectStart;
        
        //请求时间
        templeObj.reqTime = item.responseEnd - item.responseStart;
  
        //重定向时间
        templeObj.redirectTime = item.redirectEnd - item.redirectStart;
  
        entryTimesList.push(templeObj);
      }
    });
    return entryTimesList
  }
  
  //图片形式上报数据，不受跨域的影响
  function imgReport(url, data,callback) {
    if (!url || !data) {
        return;
    }
    let image = document.createElement('img');
    let items = [];
    items = getUrlParams(data);
    let name = 'img_' + (+new Date());
    image.onload = image.onerror = function (e) {
      if (callback) {
        callback(e)
      }
    };
    let newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + items;
    
    image.src = newUrl;
  }

  //在页面销毁期，可以异步的发送数据
  function sendBeacon(url,data){
    if (navigator.sendBeacon) {
      let headers = {
        type: 'application/x-www-form-urlencoded'
      };
      let blob = new Blob([JSON.stringify(data)], headers);
      return navigator.sendBeacon(url, blob);
    } else {
      return false
    }
  }
  
  //使用post请求上报数据，存在跨域问题。
  function xmlLoadData(url,data,callback) {
    var client = new XMLHttpRequest();
    client.open("POST", url,false);
    client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    client.send(JSON.stringify(data));
    client.onload = e => {
      if (callback) {
        callback(e)
      }
    }
  }

  //参数对象转化为url参数
  function getUrlParams (obj) {
    let arr = []
    for (let key in obj) {
      arr.push(key + '=' + obj[key])
    }
    return arr.join('&')
  }


  //数据上报功能
  function track(url, times,callback) {
    // let times = performanceInfo(appId);
    let items = getUrlParams(times);
    let urlLength = (url + (url.indexOf('?') < 0 ? '?' : '&') + items).length;
    if(urlLength<2083){
      imgReport(url,times,callback);     
    }else if (callback && sendBeacon(url, times)) { //参数太长时使用sendBeacon,无法跨域
        callback() 
    }else{
      xmlLoadData(url,times,callback); //不支持sendBeacon时降级处理。
    }
  }
  
  /**深度合并对象 */
  function extend() {
    var extended = {};
    var deep = false;
    var i = 0;
    
    // 判断是否为深拷贝
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;//如果为深拷贝则初始的i为1或者为0
    }
    
    // 将对象属性合并到已存在的对象中
    var merge = function(obj) {
    for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // 如果属性为对象并且需要深拷贝时则使用函数递归、反之则将当前的属性替换现有的属性
    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
    　　extended[prop] = extend(extended[prop], obj[prop]);
    } else {
    　　extended[prop] = obj[prop];
    }
    　　}
    　　}
    };
    
    // 遍历所有对象属性
    for (; i < arguments.length; i++) {
    　　merge(arguments[i]);
    }
    
    return extended;
    
    }



  var browser = {

    userAgent:navigator.userAgent.toLowerCase(),
    
    /**
     * 获取用户浏览器版本
     */
    getBrowse:function() {
      var bs = {};
      var s;
      (s = this.userAgent.match(/msie ([\d.]+)/)) ? bs.ie = s[1] : (s = this.userAgent.match(/firefox\/([\d.]+)/)) ? bs.firefox = s[1] : (s = this.userAgent.match(/chrome\/([\d.]+)/)) ? bs.chrome = s[1] : (s = this.userAgent.match(/opera.([\d.]+)/)) ? bs.opera = s[1] : (s = this.userAgent.match(/version\/([\d.]+).*safari/)) ? bs.safari = s[1] : 0;
      var version = "";
      if (bs.ie) {
          version = 'IE ' + bs.ie;
      }
      else {
          if (bs.firefox) {
              version = 'firefox ' + bs.firefox;
          }
          else {
              if (bs.chrome) {
                  version = 'chrome ' + bs.chrome;
              }
              else {
                  if (bs.opera) {
                      version = 'opera ' + bs.opera;
                  }
                  else {
                      if (bs.safari) {
                          version = 'safari ' + bs.safari;
                      }
                      else {
                          version = '未知浏览器';
                      }
                  }
              }
          }
      }
      return version;
    },
    /**
     * 获取使用平台类型
     */
    getPlatform:function() {
      var bIsIpad = this.userAgent.match(/ipad/i) == "ipad"?'ipad':'';
      var bIsIphoneOs = this.userAgent.match(/iphone os/i) == "iphone os"?'iphone os':'';
      var bIsMidp = this.userAgent.match(/midp/i) == "midp"?'midp':'';
      var bIsUc7 = this.userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"?'rv:1.2.3.4':'';
      var bIsUc = this.userAgent.match(/ucweb/i) == "ucweb"?'ucweb':'';
      var bIsAndroid = this.userAgent.match(/android/i) == "android"?'android':'';
      var bIsCE = this.userAgent.match(/windows ce/i) == "windows ce"?'windows ce':'';
      var bIsWM = this.userAgent.match(/windows mobile/i) == "windows mobile"?'windows mobile':'';
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          // document.writeln("phone");
        return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM
      }
      else {
        return 'pc'
      }
    }
  }


  function Hunter(conf) {
    this._init(conf)
    let that = this
      /**监听路由变化*/
    function routeChange(e, type) {
      if (type&&that._config.routeMode !==type) {
        return;
      }

      let startTime = sessionStorage.getItem('startView') && JSON.parse(sessionStorage.getItem('startView'))
      let during = sessionStorage.getItem('during')&& JSON.parse(sessionStorage.getItem('during'))
      if (startTime) {
        let arr ={currentTime:parseInt(new Date().getTime()), duringTime: new Date().getTime() - parseInt(startTime.duringTime),url:startTime.url } 
        sessionStorage.setItem('during', JSON.stringify(during?during.concat(arr):[arr]))
      
        sessionStorage.removeItem('startView')
      }
      sessionStorage.setItem('startView',JSON.stringify({duringTime:new Date().getTime(),url:window.location.href}))
      that.setPV(parseInt(sessionStorage.getItem('pv'))?parseInt(sessionStorage.getItem('pv')) + 1:1)
      sessionStorage.setItem('pv', that._pv)
      that.getUserId()&&!getCookie(this._userId)&&that.getConfig().autoUpload&& track(that.getConfig().baseUrl + that.getConfig().url, { [that.getConfig().prop.pv]: that._pv, [that.getConfig().prop.id]: that.getUserId() }, () => {
        sessionStorage.removeItem('pv')
      }) 
    }
    const bindEventListener = function(type) {
      const historyEvent = history[type];
      return function() {
          const newEvent = historyEvent.apply(this, arguments);
        const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return newEvent;
      };
    };
    history.pushState = bindEventListener('pushState');
    history.replaceState = bindEventListener('replaceState');
    
    window.addEventListener('replaceState', routeChange);
    window.addEventListener('pushState', routeChange);
    
    window.onpopstate = routeChange
    window.onunload = routeChange
    window.addEventListener('hashchange', function (e) { routeChange(e,'hash')});
    window.onload =  ()=> {
      if (!sessionStorage.getItem('startView')) {
        //todo 默认记录首次加载的配置项

      }
      sessionStorage.setItem('startView',JSON.stringify({time:new Date().getTime(),url:window.location.href}))
    }

    


  }
  Hunter.prototype = {
    constructor: this,
    _pv: 0,
    _leaveTime:0,
    _config:{
    },
    _defaultConfig: {
      baseUrl: '',
      url: '',
      routeMode: 'history',
      autoUpload: true,
      prop: {
        uv: 'uv',
        pv:'pv',
        id: 'id',
        mVisits: 'mVisits',
        domain: 'domain',
        title: 'title',
        referrer: 'referrer',
        screen: 'screen',
        lang: 'lang',
        userAgent: 'userAgent',
        os: 'os',
        browse: 'browse',
        device:'device',
      },
    },
    _directData: {
      domain: document.domain,
      title: document.title,
      referrer: document.referrer,
      screen: {
        w: window.screen.width,
        h: window.screen.height
      },
      lang: navigator.language,
      userAgent: navigator.userAgent,
      os: getOS()||browser.getPlatform(),
      browse: browser.getBrowse(),
      device:browser.getPlatform()
    },
   /**
    * 获取配置
    */
    getConfig: function () {
      return this._config
    },
    /**
     * 获取能直接读取到的数据
     */
    getDirectData: function () {
      return this._directData
    },
    /**
     * 设置用户Id
     * @param {*} userId 
     */
    setUserId:function(userId) {
      this._userId = userId
      this.setUV()
      sessionStorage.setItem('first_in', new Date().getTime())
      window.addEventListener('beforeunload', (e) => {
        sessionStorage.setItem('last_leave', new Date().getTime())
      })
      window.addEventListener('unload', (e) => {
        let curTime = new Date().getTime()
        if (curTime - sessionStorage.getItem('last_leave') < 5) {
        let onlineTime = new Date().getTime() - sessionStorage.getItem('first_in')
        if (this.getConfig().autoUpload&&sendBeacon(this.getConfig().baseUrl + this.getConfig().url, {
          onlineTime,
        })) {
          sessionStorage.setItem('onlineTime',onlineTime) 
        } else {
          sessionStorage.setItem('onlineTime',onlineTime) 
        }
          
        }
      })
    },
    /**
     * 获取用户id
     */
    getUserId:function() {
      return this._userId
    },
    /** 初始化内置环境*/
    _init: function (config) {
      this._config = extend(true,this._defaultConfig, config)  
    },
    /**
     * 获取pv量
     */
    getPV:function() {
      return this._pv
    },
    /**
     * 设置PV量
     * @param {*} pv 
     */
    setPV:function(pv) {
      this._pv = pv
    },
    /**
     * 清除PV记录量，用于手动提交记录时清空记录
     */
    clearPV: function () {
      sessionStorage.removeItem('pv')
    },
    setUV: function () {
      if (this._userId && !getCookie(this._userId)) {
        this.getConfig().autoUpload&&track(this.getConfig().baseUrl + this.getConfig().url, { [this.getConfig().prop.uv]: 1, [this.getConfig().prop.id]: this.getUserId() }, () => {
          
        })
        setCookie(this._userId, 1, 24 * 60 * 60 * 1000)
      }
    },
    /**
     * 获取第一次登录（记录userId）时间
     */
    getFirstLogin() {
      return sessionStorage.getItem('first_in')
    },
    /**
     * 获取在线时间（需要userId）
     */
    getOnlineTime() {
      return sessionStorage.getItem('onlineTime')
    },
    /**
     * 获取请求的模块
     */
    getReq: function () {
      return getRequest()
    },
    /**
     * 获取模块访问量
     */
    getModuleVisits:function() {
      return sessionStorage.getItem('during')
    },
    track: function (url,param,callback) {
      track(url,param,callback)
    }
    
  }

    _global = (function(){ return this || (0, eval)('this'); }());  // 将插件对象暴露给全局对象 取当前的全局this对象为作顶级对象用 ，间接表达式(0, eval)('this')，相当于eval('this')
    if (typeof module !== 'undefined' && module.exports) {      //有module.exports
      module.exports = Hunter;
    } else if (typeof define === 'function' && define.amd) {
      define(function(){return Hunter;});
    } else {
      !('Hunter' in _global) && (_global.Hunter = Hunter);
    }
  }());
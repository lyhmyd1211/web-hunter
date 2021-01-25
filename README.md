# web-hunter

简体中文 | [English](./README.md)

前端埋点通用方案，可以采集到用户浏览网页时的设备、浏览器版本、窗口大小、域名、PV/UV、每个页面的浏览时间、总浏览时间等信息。

## 安装

```
npm i npm i web-hunter 
```

or

```
yarn  add npm i web-hunter
```

## 安装

### Browser
下载dist/web-hunter.min.js

在页面中包含以下脚本：

```
<script src="web-hunter.min.js"></script>
```
这将创建全局变量Hunter
### NPM

#### CommonJS

```
const Hunter = require('web-hunter')
```


#### ES2015

```
import Hunter from 'web-hunter'

```
## 使用


```
  var hunter = new Hunter()
  console.log('user',hunter.getDirectData());
  
  /**user : { 
            browse: "chrome 89.0.4389.9" ,
            device: "pc",
            domain: "localhost",
            lang: "zh-CN",
            os: "Win10"
            referrer: "",
            screen: {w: 1920, h: 1080},
            title: "Document",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.9 Safari/537.36"
      
  }**/

  
```
当用户登录后获取到用户信息时可以使用setUserId()来设置用户ID

```
hunter.setUserId('test')
```
当setUserId()方法调用后会自动记录PV/UV信息，以及用户停留时间的信息。

```
console.log('getModuleVisits', hunter.getModuleVisits());
console.log('getPV', hunter.getPV());
```

## 配置项config
```
var hunter = new Hunter({
    baseUrl: '',  //基础接口地址url
    url: '',  //请求上报api的接口地址
    routeMode: 'history',//填写单页面应用中使用的路由模式。
    autoUpload: true,//是否自动请求接口，在setUserId之后会以baseUrl+url形式在页面切换时自动请求上报PV/UV的接口
    prop: {   //请求参数映射，参数名默认如下，可以自定义修改参数名。
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
    }
})
```

## 方法
getConfig():获取当前配置项

getDirectData():获取可直接获取的数据

setUserId(id):设置用户ID

getUserId():获取设置的用户ID

getPV():获取PV量

setPV():手动设置PV量

clearPV():清除累计的PV量，用于手动提交记录时清空记录

setUV():手动设置UV量

getFirstLogin():获取第一次登录（记录userId）时间

getOnlineTime():获取在线时间（需要userId）

getModuleVisits():获取模块访问量(根据URL划分)

track: function (url,param,callback)：手动上报数据。url:请求地址，param:请求参数，callback:请求回调

## 浏览器支持

现代浏览器以及 IE10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2021-present LuYingHeng

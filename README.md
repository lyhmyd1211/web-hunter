# web-hunter

English | [简体中文](./README-CN.md)

The general scheme of front-end tracking can collect the information of the device, browser version, window size, domain name, PV / UV, browsing time of each page, total browsing time and so on.

## Installation

### Browser

donwload dist/web-hunter.min.js

A simple and fast way to get started is to include this script on your page:

```
<script src="web-hunter.min.js"></script>
```

This will create the global variable **Hunter**

### NPM

```
npm i npm i web-hunter
```

or

```
yarn  add npm i web-hunter
```

#### CommonJS

```
const Hunter = require('web-hunter')
```

#### ES2015

```
import Hunter from 'web-hunter'

```

## Usage

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

When the user gets the user information after login, setuserid () can be used to set the user ID

```
hunter.setUserId('test')
```

When the setuserid () method is called, the PV / UV information and the user's residence time will be recorded automatically.

```
console.log('getModuleVisits', hunter.getModuleVisits());
console.log('getPV', hunter.getPV());
```

## Config

```
var hunter = new Hunter({
    baseUrl: '',  // baseUrl
    url: '',  //The interface address of the request reporting API
    routeMode: 'history',//The routing mode used in single page application.(history|hash)
    autoUpload: true,//Whether to automatically request the interface, after setuserid, it will automatically request the interface reporting PV / UV in the form of baseurl + URL when the page is switched
    prop: {   //Request parameter mapping. The default parameter name is as follows. You can customize and modify the parameter name.
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

## Methods

getConfig():Gets the current configuration item

getDirectData():Access to directly accessible data

setUserId(id):Set user ID

getUserId():Gets the set user ID

getPV():Get PV

setPV():Setting PV manually

clearPV():Clear the accumulated PV, which is used to clear the record when the record is submitted manually

setUV():Manually set UV amount

getFirstLogin():Get the first login (record userid) time

getOnlineTime():Get online time (requires userid)

getModuleVisits():Get module access (divided by URL)

track: function (url,param,callback)：Report data manually. URL: request address, param: request parameter, callback: request callback

## Browser support

Modern browser and ie10 +

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2021-present LuYingHeng

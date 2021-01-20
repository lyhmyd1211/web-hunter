import Hunter from '../../index'
  
  var hunter = new Hunter({
    test: '222',
    routeMode: 'hash',
    baseUrl: 'http://127.0.0.1:7001/',
    url: 'setPUV',
    autoUpload: true,
    prop: {
      uv: 'cuv',
      pv: 'ipv',
      // id:'userId'
    }
  })
console.log('yinru',Hunter);
hunter.setUserId('t333')
console.log('user',hunter.getDirectData());
  // hunter

  var btn = document.getElementById('btntest')
  btn.onclick = function(e) {
    history.pushState({ first: 'first' }, "page2", "/page.html")
    console.log('zhihou',hunter.getPV());
    // window.location.href = 'page.html'
    //  a
  }
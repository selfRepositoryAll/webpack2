'use strict';

function HtmlLocalStoragePlugin(options) {
  // {
  //   outputName: ['home.html', 'nav.html', 'baitiao.html']
  // }
  this.outputName = options.outputName || [];
}

HtmlLocalStoragePlugin.prototype.apply = function (compiler) {
  var self = this
  compiler.plugin('compilation', function (compilation) {
    compilation.chunks.forEach(function (chunk) {
      chunk.files.forEach(function (filename) {
        // Get the asset source for each file generated by the chunk:
        var source = compilation.assets[filename].source();
        console.log('filename', filename);
        console.log('source');
        console.log(source);
      });
    })
    compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
      self.outputName.some(outputName => {
        if (htmlPluginData.outputName.indexOf(outputName) > -1) {
          self.replace(htmlPluginData)
          return false
        }
      })
      callback(null, htmlPluginData)
    })
  })
}

HtmlLocalStoragePlugin.prototype.replace = function (htmlPluginData) {
  console.log(htmlPluginData);
  var html = htmlPluginData.html
  // console.log(htmlPluginData)
  var regJS = /<script type=text\/javascript src=".*\/js\/(.+\.js)\?v=([0-9a-z]+)"><\/script>/i
  var regCSS = /<link href=".*\/css\/(.+\.css)\?v=([0-9a-z]+)" rel=stylesheet>/i
  var matchJS = html.match(regJS)
  var matchCSS = html.match(regCSS)
  var sources = []
  if (matchCSS) {
    sources.push({
      type: 'css',
      name: matchCSS[1],
      version: matchCSS[2]
    })
  }
  if (matchJS) {
    sources.push({
      type: 'js',
      name: matchJS[1],
      version: matchJS[2]
    })
  }
  // console.log(name + ' ' + version)
  var content = this.getScript(sources)
  htmlPluginData.html = htmlPluginData.html.replace(regCSS, '').replace(regJS, content);
  console.log(htmlPluginData.html);
}

HtmlLocalStoragePlugin.prototype.getScript = function (sources) {
  var params = ''
  sources.forEach(function (source) {
    params += '{type:"' + source.type + '",name:"' + source.name + '",version: "' + source.version + '"},'
  })
  var script = '<script>(function(e,t){var e=document,t=window,a;var n={KEY_CACHE:"_ibc",KEY_VERSION:"_v",KEY_CONTENT:"_c",comparable:undefined,sources:[],init:function(e){this.comparable=e.comparable;this.sources=e.sources;this.sources.forEach(function(e){this.load(e)}.bind(this))},load:function(n){var s,i,c,o=e.getElementsByTagName("body")[0];if(n.type==="js"){c=e.createElement("script");c.type="application/javascript"}else if(n.type==="css"){c=e.createElement("style")}try{a=a||JSON.parse(t.localStorage.getItem(this.KEY_CACHE));i=a&&a[n.name]&&a[n.name][this.KEY_VERSION]||"";if(i&&n.version===i){s=a[n.name][this.KEY_CONTENT];c.innerHTML=s;o.appendChild(c)}else{this.fetch(c,n,n)}}catch(r){this.fetch(c,n,n)}},fetch:function(a,n,s){var i=e.getElementsByTagName("body")[0];var c=new XMLHttpRequest;c.open("GET","{{constant.cdn}}/laifenqi/static/"+s.type+"/"+n.name+"?v="+n.version);c.onreadystatechange=function(){if(c.readyState===4&&(c.status>=200&&c.status<300||c.status===304)){try{var e=c.responseText;if(n.type==="js"){e+="\\n//# sourceURL="+n.name+"\\n"}a.innerHTML=e;i.appendChild(a);if(s.name){var o=JSON.parse(t.localStorage.getItem(this.KEY_CACHE))||{};var r=o[s.name]={};r[this.KEY_VERSION]=s.version;r[this.KEY_CONTENT]=e;t.localStorage.setItem(this.KEY_CACHE,JSON.stringify(o))}}catch(E){}}}.bind(this);c.send()}};t.Istanbul=n})(document,window);'
  script += 'Istanbul.init({sources:[' + params + ']})</script>'
  return script
}

module.exports = HtmlLocalStoragePlugin

function MyPlugin() { }

MyPlugin.prototype.apply = function (compiler) {
  const data = {};
  // compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
  //   self.outputName.some(outputName => {
  //     if (htmlPluginData.outputName.indexOf(outputName) > -1) {
  //       self.replace(htmlPluginData)
  //       return false
  //     }
  //   })
  //   callback(null, htmlPluginData)
  // })
  compiler.plugin('emit', function (compilation, callback) {
    
    compilation.chunks.forEach(function (chunk) {
      chunk.modules.forEach(function (module) {
      });

      chunk.files.forEach(function (filename) {
        var source = compilation.assets[filename].source();
        console.log('filename', filename);
        console.log('source');
        console.log(source);
      });
    });

    callback();
  });
};

module.exports = MyPlugin;
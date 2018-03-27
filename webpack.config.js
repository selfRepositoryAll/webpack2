var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',// 单入口页面 不好 第三方库并没有改变 但是每次你
  // vue都是index。js单做如否
  //  多入口
  output: {
    filename: '[chunkhash].[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   // 可以是路径的问题
    //   filename: 'test.html',
    //   template: './template/test.html',
    //   inject: true
    //   // 生成的js 和css要不要自动插入到页面中  如果自己不插入的话就可以使用 ejs模板操作
    // })
  ]
}
/*
这对于该应用来说是很不理想的。
如果 index.js 中的代码改变了，那么整个 bundle 都会重新构建。浏览器就需要加载新的 bundle，即使其中大部分代码都没改变。

*/
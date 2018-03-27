var webpack = require('webpack');
var path = require('path');
// require('shelljs/global');
// rm('-rf', 'dist')
// module.exports = function(env) {
//     return {
//         entry: {
//             main: './index.js',
//             vendor: 'moment'
//         },
//         output: {
//             filename: '[chunkhash].[name].js',
//             path: path.resolve(__dirname, 'dist')
//         },
//         plugins: [
//             new webpack.optimize.CommonsChunkPlugin({
//                 name: 'vendor' // 指定公共 bundle 的名字。
//             })
            
//         ]
//     }
// }

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackLocalCachePlugin = require('html-webpack-local-cache-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackLocalCachePlugin({
      cacheSource: '(app\..*\.js|vendor\..*\.js)$', // 通过正则校验需要缓存的文件
      cacheEnsure: false, // 是否连ensure异步加载的js也缓存，默认false
      cssSync: true, // 是否使用document.write的方式加载，false则用xhr加载css，默认是false
      jsSync: true // 是否使用document.write的方式加载，false则用xhr加载js，默认是false
    })
  ]
};
// 提取了公共模块 问题来了 每次生成的hash 值是不同的 那没有意思 我的目的是缓存啊 哥哥
// 每次变化    这意味着我们任然无法从浏览器缓存机制中受益
/*
* 重点来了: webpack 一个文件的时候 运行代码就在一个build
* 假如几个build的时候 runtime代码被提及到 vendor里面这是不好的
*
*
*
*
*
*
* */
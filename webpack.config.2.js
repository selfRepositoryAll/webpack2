var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // 指定公共 bundle 的名字。
            })
        ]
    }
}
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
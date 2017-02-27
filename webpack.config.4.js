var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: {
        main: './index-css.js',
        vendor: 'moment'
    },
    output: {
        filename: '[chunkhash].[name].js',
        path: path.resolve(__dirname, 'css')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        },
            {
                //加载图标字体
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url?limit=8192'
            },
            {
                //图片
                test: /\.(png|jpg|bmp|gif)$/,
                loader: 'url?limit=8192'
            },
        ]
    }
};
/*
* 所以要提取出来
* 这里有一个缺点就是，你无法使用浏览器的能力，去异步且并行去加载 CSS。取而代之的是，你的页面需要等待整个 JavaScript 文件加载完，才能进行样式渲染。
*
* 所以来了 ExtractTextWebpackPlugin
*
*
* 首先生成不同的hash值 这个是重点  chunkhash webpack
* 第一次构建: 我们会生成四个文件 css  main。js Vendor.js manifest.js 他们的hash是彼此是不同的
* 当我们的业务逻辑发生改变的时候，我们再次运行webpack 只有main.js的hash变了，其他的没有变
* 原因就是webpack做了缓存 这是生产环境中是非常好的 ，当我们发布版本的时候，就不用拉去其他的文件
* 用浏览器的缓存可以
*
*  不要在开发环境下使用 [chunkhash]，因为这会增加编译时间。将开发和生产模式的配置分开，并在开发模式中使用 [name].js 的文件名， 在生产模式中使用 [name].[chunkhash].js 文件名。
*
*
*
* */
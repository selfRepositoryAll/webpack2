var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin=require('extract-text-webpack-plugin')
module.exports = {

    entry: {
        main: './index-css.js',
        vendor: 'moment'
    },
    output: {
        filename: '[chunkhash].[name].js',
        path: path.resolve(__dirname, 'Extract_css')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                               use: 'css-loader'
            })
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
    },
};
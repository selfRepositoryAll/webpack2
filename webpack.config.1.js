var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackLocalCachePlugin = require('html-webpack-local-cache-plugin');
// var HtmlLocalStoragePlugin = require('./HtmlLocalStoragePlugin.js')
var MyPlugin = require('./cssjsinhtml')

require('shelljs/global');
rm('-rf', 'dist')

//让我们尝试通过为 moment 添加一个单独的入口点并将其命名为 vendor 来缓解这一情况。
module.exports = {
    entry: {
        // main: './index.js',
        index2: './index2.js',
        // commom也是可以的；
        vendor: ['moment', 'ramda']
        // 需要提供到 lod
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
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
    plugins: [
        // new MyPlugin(),
        // new HtmlLocalStoragePlugin({ outputName: ['home.html', 'nav.html', 'baitiao.html'] }),
        // new ExtractTextPlugin('styles.css'),
        new ExtractTextPlugin({ filename: '[name].css?v=[contenthash:10]' }),
        // new HtmlWebpackPlugin({
        //     // 可以是路径的问题
        //     filename: 'test.html',
        //     template: './template/test.ejs',
        //     inject: false,
        //     chunks: ['main', 'manifest', 'vendor'],
        //     // 生成的js 和css要不要自动插入到页面中  如果自己不插入的话就可以使用 ejs模板操作
        // }),

        new HtmlWebpackPlugin({
            // 可以是路径的问题
            filename: 'index.html',
            template: './template/test.html',
            // inject: true,
            // chunks: ['index2', 'manifest', 'vendor'],
            // 生成的js 和css要不要自动插入到页面中  如果自己不插入的话就可以使用 ejs模板操作
        }),
        new HtmlWebpackLocalCachePlugin({
            cacheSource: '(index2\..*\.js|vendor\..*\.js|manifest\..*\.js)$', // 通过正则校验需要缓存的文件
            cacheEnsure: false, // 是否连ensure异步加载的js也缓存，默认false
            cssSync: true, // 是否使用document.write的方式加载，false则用xhr加载css，默认是false
            jsSync: true // 是否使用document.write的方式加载，false则用xhr加载js，默认是false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // // 因为严压缩 所以只在生产环境下使用
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 指定公共 bundle 的名字。
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ],
    devtool: false
    //  要将提取的js放到一个文件下
}
// 现在来说 vendor main 和vendor 都有这个moment.js 不好 现在要提取公共的模块 CommonsChunkPlugin
//
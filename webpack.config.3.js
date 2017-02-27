var webpack = require('webpack');
var path = require('path');

module.exports = {

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
                names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
            })
        ]
};
// manifest 因为webpack 需要一些代码 来保证 webpack的运行我们把这部分代码提到 manifest 里面
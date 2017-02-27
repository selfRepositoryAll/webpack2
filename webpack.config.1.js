var path = require('path');
//让我们尝试通过为 moment 添加一个单独的入口点并将其命名为 vendor 来缓解这一情况。
module.exports = {
    entry: {
        main: './index.js',
        vendor: 'moment'
    },
    output: {
        filename: '[chunkhash].[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
// 现在来说 vendor main 和vendor 都有这个moment.js 不好 现在要提取公共的模块 CommonsChunkPlugin
//
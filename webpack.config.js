var path = require('path');

module.exports ={
        entry: './index.js',// 单入口页面 不好 第三方库并没有改变 但是每次你
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        }
}
/*
这对于该应用来说是很不理想的。
如果 index.js 中的代码改变了，那么整个 bundle 都会重新构建。浏览器就需要加载新的 bundle，即使其中大部分代码都没改变。

*/
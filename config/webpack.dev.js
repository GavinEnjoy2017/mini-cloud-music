const path = require('path');

const currentPath = (resolvePath) => path.resolve(__dirname, resolvePath);

module.exports = require("./webpack.common.js")({
    mode: "development",
    plugins: [],
    devtools: 'eval-cheap-source-map',
    stats: "errors-only", //只在发生错误或有新的编译时输出
    devServer: {
        contentBase: currentPath('dist'),
        compress: true,
        port: 9000,
        hot: true,
        open: true
    }
});

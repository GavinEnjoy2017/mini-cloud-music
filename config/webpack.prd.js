const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); // 打包进度条美化
const chalk = require("chalk");

module.exports = require("./webpack.common")({
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
            format:
                `${chalk.green.bold("build[:bar]")} ` +
                chalk.green.bold(":percent") +
                " (:elapsed seconds)",
            clear: false,
            width: 60,
        }),
    ],
    devtools: 'source-map',
    stats: "normal", //标准输出
});

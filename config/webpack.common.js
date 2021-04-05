const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离CSS样式
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩CSS文件

const buildPath = 'dist';
const babelLoaderReg = /\.(js|ts)x?$/;
const cssLoaderReg = /\.(c|sc|sa)ss$/;
const fileLoaderReg = /\.(png|jpg|gif|woff|svg|ttf)$/;
const htmlTitle = 'mini-clound-music';

const currentPath = (resolvePath) => path.resolve(__dirname, resolvePath);

module.exports = function (options) {
    return {
        entry: currentPath('../src/index.tsx'),
        output: {
            path: currentPath(buildPath),
            filename: '[name].[chunkhash].js'
        },
        mode: options.mode,
        module: {
            rules: [
                {
                    test: babelLoaderReg,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: cssLoaderReg,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development'
                            }
                        },
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('dart-sass')
                            }
                        }
                    ]
                },
                {
                    test: fileLoaderReg,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: currentPath('../public/index.html'),
                title: htmlTitle,
                filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /index\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true }}]
                },
                canPrint: true
            }),
            ...options.plugins,
        ],
        stats: options.stats, // 打包日志发生错误和新的编译时输出
        devServer: options.devServer,
        resolve: {
            modules: [currentPath("../node_modules")],
            extensions: ['.jsx', '.js', '.sass', '.ts', '.tsx'],
            alias: {
                moment$: 'moment/moment.js',
                '@src': currentPath("src"),
                '@public': currentPath("public")
            }
        },
        devtool: options.devtool,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        chunks: 'initial',
                        test: currentPath('../node_modules'), // 路径在 node_modules 目录下的都作为公共部分
                        name: 'vendor', // 使用 vendor 入口作为公共部分
                        priority: -10
                    },
                    common: {
                        name: 'chunk-common',
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
}
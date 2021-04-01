const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = 'dist';
const babelLoaderReg = /\.(js|ts)x?$/;
const cssLoaderReg = /\.(c|sc|sa)ss$/;
const fileLoaderReg = /\.(png|jpg|gif|woff|svg|ttf)$/;
const htmlTitle = 'mini-clound-music';

const currentPath = (resolvePath) => path.resolve(__dirname, resolvePath);

module.exports = {
    entry: currentPath('src/index.tsx'),
    output: {
        path: currentPath(buildPath),
        filename: '[name].[chunkhash].js'
    },
    cache: {
        // 使用持久化缓存
        type: 'filesystem', //memory:使用内容缓存 filesystem：使用文件缓存
    },
    devtool: false,
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
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1
                        }
                    },
                    'postcss-loader',
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
            template: currentPath('public/index.html'),
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
        })
    ],
    devServer: {
        contentBase: currentPath(buildPath),
        compress: true,
        port: 9000,
        hot: true,
        open: true
    }
}
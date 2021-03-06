const AutoPreFixer = require('autoprefixer'); // 给 CSS3 的属性添加前缀，防止 CSS 样式冲突,结合 postcss-loader
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');
const path = require('path');
const common = require('./webpack.common');

const devWebpackConfig = {
    mode: 'development',
    entry: {
        main: paths.appIndexJs,
    },
    devtool: 'cheap-module-eval-source-map', // 有助于解析说明js原始出错的位置.
    output: {
        filename: 'static/js/bundle.js',// 指定了打包的名字和基本的引用路径
        chunkFilename: 'static/js/[name].chunk.js', // 指定了非入口文件的名称
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true, // 能看到样式具体在哪个文件哪一行
                        }
                    },
                    {
                        loader: 'postcss-loader', // 给 CSS3 的属性添加前缀，防止 CSS 样式冲突
                        options: {
                            ident: 'postcss', // 唯一标识符
                            sourceMap: true,
                            plugins: loader => [
                                AutoPreFixer({ overrideBrowserslist: ['> 0.15% in CN']}) // 添加前缀
                            ]
                        }
                    },
                    {
                        loader:'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.NamedChunksPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        new webpack.HotModuleReplacementPlugin(), // 启用模块热替换
    ]
};
module.exports = merge(common, devWebpackConfig);
//引入一个包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = 'production' // 是否生产环境

//webpack 中的所有配置都应该写在 module.exports 中
module.exports = {
    mode: isProd ? 'production' : 'development', //模式：生产模式还是开发模式
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        //打包后文件的名字
        filename: "bundle.js"
    },
    //指定webpack打包时使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test 指定规则生效的文件，以下匹配以 ts 结尾的文件
                test: /\.ts$/,
                //要使用的loader，用 ts-loader 处理以 ts 结尾的文件
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置 babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                //指定环境插件
                                '@babel/preset-env',
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "自定义标题",
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};
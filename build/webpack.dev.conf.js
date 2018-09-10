const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextWebpackPlugin("styles/[name]-one.css");
const extractLESS = new ExtractTextWebpackPlugin("styles/[name]-two.less");
const getHtmlConfig = function (options) {
    return {
        template: ''
    }
}
console.log("__dirname");
console.log(__dirname);// 当前模块所在的绝对路径
// C:\Users\mgt360124\Desktop\赞同科技\webpack-test\build

console.log(path.resolve(__dirname));// 当前模块所在的绝对路径
// C:\Users\mgt360124\Desktop\赞同科技\webpack-test\build

console.log(path.resolve(__dirname, "../src/main.js"));  // 当前模块所在的绝对路径
// C:\Users\mgt360124\Desktop\赞同科技\webpack-test\src\main.js
console.log("process.argv");
console.log(process.argv[2].split(','));// 脚本package.json中的 scripts中的执行脚本的参数。数组[array]<string>
module.exports = {
    entry: {
        hello: path.resolve(__dirname, "../src/main.js") // hello 为chunk 名称
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "",
        hashDigestLength: 5,
        filename: "js/[name].bundle.js", // name 为chunk 名称
        libraryTarget: "this", // 默认值为var, 可选值为 assign this window global commonjs commonjs2 amd umd jsonp
        library: "maoguotao",      // 在输出文件 hello.bundle.js中 为this.maoguotao = (function(t){})()
    },
    module: {
        // {
        //     test: /\.css$/,
        //     loader: 'css-loader'
        // }
        // // 等同于
        // {
        //     test: /\.css$/,
        //     use: 'css-loader'
        // }
        // // 等同于
        // {
        //     test: /\.css$/,
        //     use: {
        //         loader: 'css-loader',
        //         options: {}
        //     }
        // }
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract(["css-loader", "postcss-loader"])
            },
            {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader', 'less-loader'])
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //不处理node_modules下面的js文件
                include: "/src/", //处理src下面的js文件
                loader: "babel-loader",
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'admin.html', //生成的文件名称
            meta: {
                viewport: ' user-scalable=no, maximum-scale=1, minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            favicon: path.resolve(__dirname, "../static/img/agree.png"),
            minify: {
                collapseWhitespace: true,
            },
            inject: "head" //引入的脚本放在head头部标签中
        }),
        new uglify(),
        extractCSS,
        extractLESS,
    ],
    externals: {
        jquery: "jQuery" //防止将某些import的包package打包到bundle中,而是在运行时runtime再去从外部获取这些扩展依赖项 
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
            '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
            '#': path.resolve('src/components') //import Table from '#/table'
        },
        extensions: ['.js', '.vue', "json"],//扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist", //网站的根目录为 根目录/dist，如果没有指定，使用process.cwd()函数取当前工作目录
        compress: true,
        port: 8023,
        hot: true,
        host: "localhost",
        hotOnly: true,
        index: "admin.html",//
        lazy: true,
        open: true,
        openPage: "app.html",
    }
}

// console.log('output.library')
// console.log(module.exports.output.library)
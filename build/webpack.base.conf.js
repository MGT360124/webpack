const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 使用HtmlWebpackPlugin插件，生成一个html文件
const minify = require("html-minifier").minify;
const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextWebpackPlugin("styles/[name]-one.css");
const extractLESS = new ExtractTextWebpackPlugin("styles/[name]-two.less");
function resolve(dir) {
    return path.resolve(__dirname, dir); // path.resolve(__dirname,"")当前的文件所在的绝对路径
}
function join(dir){
    return path.join(__dirname,"bar","foo",dir)  // path.join(__dirname,"bar","foo",dir) 返回一个绝对路径 
}
console.log(join("/mgt"))  
// C:\Users\mgt360124\Desktop\赞同科技\webpack-test\build\bar\foo\mgt
console.log('=====================')
// console.log(resolve("../src"))
module.exports = {
    // mode: 'production',
    entry: {
        app: resolve("../src/main.js"), //多页功能的文件。
        index: resolve("../src/js/index.js")
    },
    output: {
        path: resolve("../dist"),
        // publicPath: "https://www.mymgt360124.cn/", // 项目上线时，生成线上的路径
        filename: "js/[name].js" // 多页功能打包，输出的是文件的名称是entry入口的app和index
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract(["css-loader", "postcss-loader"])
        },
        {
            test: /\.less$/,
            use: extractLESS.extract(["css-loader", "less-loader"])
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }
        ]
    },
    resolve: {
        modules: ["node_modules",path.resolve(__dirname, "src")],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
            '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
            '#': path.resolve('src/components') //import Table from '#/table'
        },
        extensions: ['.js', '.vue', "json"],//扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    },
    devtool:"source-map",
    plugins: [
        new uglify(),
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
            title: '多页应用的多个入口文件的第一个app', //生成的index.html的title
            template: "index.html", // 使用根路径下的index.html做模板
            filename: 'app.html', // 文件名称,这个路径是相对于output.path路径
            meta: {
                viewport: ' user-scalable=no, maximum-scale=1, minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            favicon: resolve("../static/img/favicon.ico"), //图标
            minify: {
                collapseWhitespace: true,
            },
            inject: "head" //引入的脚本放在head头部标签中
        }),
        new HtmlWebpackPlugin({
            title: '多页应用的多个入口文件的第二个index', //生成的index.html的title
            template: "index.html", // 使用根路径下的index.html做模板
            filename: 'index.html', // 文件名称,这个路径是相对于output.path路径
            meta: {
                viewport: ' user-scalable=no, maximum-scale=1, minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            favicon: resolve("../static/img/favicon.ico"), //图标
            minify: {
                collapseWhitespace: true, //生成的html是否代码压缩
            },
            inject: "head" //引入的脚本放在head头部标签中
        }),
    ]
}
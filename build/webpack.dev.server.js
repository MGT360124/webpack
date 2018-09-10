const path = require("path");
const config = require("./webpack.dev.conf.js");
console.log("config",config);
module.exports = {  
  devServer:{
    contentBase: "./dist",
    compress: true,
    port:8023,
    hot:true,
    host:"localhost",
    hotOnly:true,
    index:"admin.html",
    lazy:true,
    open:true,
    openPage:"admin.html",
}
}
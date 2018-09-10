const world = require("./world.js");
const index = require("@/css/index.css");
const style = require("@/css/style.less");
function hello(val){
    console.log("world is",world.world())
    window.alert(val)
}
hello('maoguotao')

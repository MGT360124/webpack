// import tpl from "./emmHeader.html";

require('./style.less');
function layer() {
    console.log("tpl", tpl)
    return {
        name: "layer",
        tpl: tpl
    }
}


export default {
    layer
};
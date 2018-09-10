"use strict";
/*@flow*/``
import utils from "./components/emmHeader/index.js"
const path = require("path");
const hello = require("./js/hello.js");
const index = require("./js/index.js");
const App = function () {
    console.log("layer", utils.layer)
    //  console.log("split",utils.split(11))
}
new App();
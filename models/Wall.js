var GameObject = require("./GameObject.js");

Wall = class Wall extends GameObject {
    constructor (x, y){
        r = 205;
        g = 133;
        b = 63;
        super(x,y,r, g , b);
    }
}

module.exports = GameObject;
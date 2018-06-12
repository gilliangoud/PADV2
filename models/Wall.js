var GameObject = require("./GameObject.js");

Wall = class Wall extends GameObject {
    constructor(x, y){
        super(x,y,205, 133 , 63);
        this.passable = false;
    }
}

module.exports = Wall;
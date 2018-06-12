var Wall = require("./Wall.js");
var Door = require("./Door.js");
var Furniture = require("./Furniture.js");


GameMap = class gameMap {
    constructor(gameElements){
        gameElements.push(new Wall(1,4));
        gameElements.push(new Wall(2,4));
        gameElements.push(new Wall(3,4));
        gameElements.push(new Wall(4,4));
        gameElements.push(new Wall(6,1));
        gameElements.push(new Wall(6,2));
        gameElements.push(new Wall(6,3));
        gameElements.push(new Wall(6,4));
        gameElements.push(new Wall(9,1));
        gameElements.push(new Wall(9,3));
        gameElements.push(new Wall(9,4));
        gameElements.push(new Wall(7,4));
        gameElements.push(new Wall(10,4));
        gameElements.push(new Wall(10,7));
        gameElements.push(new Wall(9,7));
        gameElements.push(new Wall(8,7));
        gameElements.push(new Wall(8,9));
        gameElements.push(new Wall(8,10));
        gameElements.push(new Wall(6,7));
        gameElements.push(new Wall(6,8));
        gameElements.push(new Wall(6,9));
        gameElements.push(new Wall(6,10));
        gameElements.push(new Wall(4,7));
        gameElements.push(new Wall(4,8));
        gameElements.push(new Wall(4,10));
        gameElements.push(new Wall(1,7));
        gameElements.push(new Wall(2,7));
        gameElements.push(new Wall(3,7));


        gameElements.push(new Wall(9,2));
        gameElements.push(new Wall(8,4));
        gameElements.push(new Wall(7,7));
        gameElements.push(new Wall(8,8));
        gameElements.push(new Wall(5,4));
        gameElements.push(new Wall(5,7));
        gameElements.push(new Wall(4,9));

        gameElements.push(new Furniture(1,1));
        gameElements.push(new Furniture(1,3));
        gameElements.push(new Furniture(2,3));
        gameElements.push(new Furniture(3,3));
        gameElements.push(new Furniture(3,1));
        gameElements.push(new Furniture(5,1));
        gameElements.push(new Furniture(10,1));
        gameElements.push(new Furniture(10,3));
        gameElements.push(new Furniture(7,1));
        gameElements.push(new Furniture(8,1));
        gameElements.push(new Furniture(10,8));
        gameElements.push(new Furniture(10,10));
        gameElements.push(new Furniture(9,10));
        gameElements.push(new Furniture(7,10));
        gameElements.push(new Furniture(5,10));
    }

}

module.exports = GameMap;

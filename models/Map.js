var Wall = require("./Wall.js");
var Door = require("./Door.js");
var GameObject = require("./GameObject.js");
Map = class Map {
    constructor(gameObjects){
        GameObject.push(new Wall(1,4));
            GameObject.push(new Wall(2,4));
            GameObject.push(new Wall(3,4));
            GameObject.push(new Wall(4,4));
            GameObject.push(new Wall(6,1));
            GameObject.push(new Wall(6,2));
            GameObject.push(new Wall(6,3));
            GameObject.push(new Wall(6,4));
            GameObject.push(new Wall(9,1));
            GameObject.push(new Wall(9,3));
            GameObject.push(new Wall(9,4));
            GameObject.push(new Wall(7,4));
            GameObject.push(new Wall(10,4));
            GameObject.push(new Wall(10,7));
            GameObject.push(new Wall(9,7));
            GameObject.push(new Wall(8,7));
            GameObject.push(new Wall(8,9));
            GameObject.push(new Wall(8,10));
            GameObject.push(new Wall(6,7));
            GameObject.push(new Wall(6,8));
            GameObject.push(new Wall(6,9));
            GameObject.push(new Wall(6,10));
            GameObject.push(new Wall(4,7));
            GameObject.push(new Wall(4,8));
            GameObject.push(new Wall(4,10));
            GameObject.push(new Wall(1,7));
            GameObject.push(new Wall(2,7));
            GameObject.push(new Wall(3,7));

            GameObject.push(new Wall(9,2));
            GameObject.push(new Wall(8,4));
            GameObject.push(new Wall(7,7));
            GameObject.push(new Wall(8,8));
            GameObject.push(new Wall(5,4));
            GameObject.push(new Wall(5,7));
            GameObject.push(new Wall(4,9));
/*
            GameObject.push(new GameObject(1,1));
            GameObject.push(new GameObject(1,3));
            GameObject.push(new GameObject(2,3));
            GameObject.push(new GameObject(3,3));
            GameObject.push(new GameObject(3,1));
            GameObject.push(new GameObject(5,1));
            GameObject.push(new GameObject(10,1));
            GameObject.push(new GameObject(10,3));
            GameObject.push(new GameObject(7,1));
            GameObject.push(new GameObject(8,1));
            GameObject.push(new GameObject(10,8));
            GameObject.push(new GameObject(10,10));
            GameObject.push(new GameObject(9,10));
            GameObject.push(new GameObject(7,10));
            GameObject.push(new GameObject(5,10));
            */
    }
}


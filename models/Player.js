var GameObject = require("./GameObject.js");

Player = class Player extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        this.id;
        this.name;
        this.actionPoints;
        this.inventory = [];
        this.activeTurn;
        this.socket;
    }

    setId(socketID){
        this.id = socketID;
    }

    setSocket(socket){
      this.socket = socket;
     }

     setName(name) {
         this.name = name;
     } 

    getName() {return this.name;}

    endTurn() {
        this.activeTurn = false;
        this.socket.emit('message', 'kut');
    }

    startTurn() {
        this.actionPoints += 10;
        this.activeTurn = true;
        this.socket.emit('message', this.activeTurn);
    }

    getActionPoints() {return this.actionPoints;}

    setActionPoints(points) {this.actionPoints = points;}

    move(direction){
            let position = super.getPosition();
            switch (direction){
                case 0: position.x++; break;
                case 1: position.y++; break;
                case 2: position.x--; break;
                case 3: position.y--; break;
                //default: console.log("No direction given with move. players name: " + this.name)
            }
            super.setPosition(position.x, position.y);
            //actionHandler();
    }


    addToInventory() {
        // TODO
    }

    getInventory() {return this.inventory;}

}


module.exports = Player;

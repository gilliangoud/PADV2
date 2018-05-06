import GameObject from "./GameObject.js";

Player = class Player extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        this.name
        this.actionPoints
        this.inventory = [];
    }

    getName() {return this.name;}

    endTurn() {
        // TODO
    }

    startTurn() {
        // TODO
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
            default: console.log("No direction given with move. players name: " + this.name)
        }
        super.setPosition(position.x, position.y);
    }

    addToInventory() {
        // TODO
    }

    getInventory() {return this.inventory;}

}

export default Player;

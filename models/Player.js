import GameObject from "./GameObject.js";

Player = class Player extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        this.name;
        this.actionPoints;
        
    }

    getName() {return this.name;}

    endTurn() {
        if(actionPoints === 0){
            
            nextTurn();
        }
    }

    startTurn() {
        if(playerindex === currentplayer){
        setActionPoints(10);
        
    }
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

    addItem() {
        inventory.push();
    }

    inventory = [];

    useItem(){
        var z = document.getElementById("itemnameofzo")
        var chosenItem = z.value;
        this.inventory.pop(chosenItem);
    }

    getInventory() {return this.inventory;}
    
    
    

}

export default Player;

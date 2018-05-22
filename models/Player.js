var GameObject = require("./GameObject.js");


Player = class Player extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos, yPos,colorR,colorG,colorB);
        this.id;
        this.name;
        this.actionPoints = 0;
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

     setRGBColor(color){
        switch(color){
            case 'Red':
                this.setColor(255,0,0);
                break;
            case 'Green':
                this.setColor(0,255,0);
                break;
            case 'Blue':
                this.setColor(0,0,255);
                break;
            case 'Yellow':
                this.setColor(255,255,0);
                break;
            case 'Orange':
                this.setColor(255,165,0);
                break;
            case 'Pink':
                this.setColor(255,192,203);
                break;
            case 'Gray':
                this.setColor(128,128,128);
                break;
            case 'Brown':
                this.setColor(165,42,42);
                break;
            case 'Purple':
                this.setColor(128,0,128);
                break;
            default:
                console.log('geen geldige kleur');
                break;
        }
     }

     setName(name) {
         this.name = name;
     } 

    getName() {return this.name;}

    endTurn() {
        this.activeTurn = false;
        this.socket.emit('endTurn');
    }

    startTurn() {
        this.actionPoints += 10;
        this.activeTurn = true;
        this.socket.emit('startTurn');

    }

    getActionPoints() {return this.actionPoints;}

    setActionPoints(points) {this.actionPoints = points;}

    move(direction){
            let position = this.getPosition();
            switch (direction){
                case 'right': position.x++; break;
                case 'up': position.y++; break;
                case 'left': position.x--; break;
                case 'down': position.y--; break;
                default: console.log("No direction given with move. players name: " + this.name)
            }
            this.setPosition(position.x, position.y);
            //actionHandler();
    }


    addToInventory() {
        // TODO
    }

    getInventory() {return this.inventory;}

}


module.exports = Player;

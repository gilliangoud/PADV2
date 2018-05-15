import GameObject from "./GameObject.js";

Enemy = class Enemy extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        
    }
    
    endTurn() {
        // TODO
    }

    startTurn() {
        
    }
    
    checkturn(){
        if(currentplayerindex == 3){
            //spawn ofzo
        }
    }
}
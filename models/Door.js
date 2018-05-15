import GameObject from "./GameObject.js";

Door = class Door extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        
    }

    
doorOpen = false;
boolean(doorOpen)
function openDoor(){
    if(doorOpen === false && collision === false && doorKey === true){
        doorOpen = true;
        collision = false;
        }
    }
    
}
    
    
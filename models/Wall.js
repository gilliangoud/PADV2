import GameObject from "./GameObject.js";

Wall = class Wall extends GameObject {
    constructor (xPos,yPos,colorR,colorG,colorB, name) {
        super(xPos,yPos,colorR,colorG,colorB);
        
    }
    
    collision(){
        if(this.xPos === player.xPos && this.yPos === player.yPos){
            //player.setPosition naar iets ofzo
        }
            
    }
    
}


export default Wall;
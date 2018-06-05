GameObject = class GameObject {
    constructor (x, y, r, g, b){
        this.position = {x, y};
        this.color = {r, g, b};
        this.passable = true;
    }

    setPosition(x,y){
        this.position = {x,y};
    }

    getPosition(){return this.position;}

    getColor() {return this.color;}

    setColor(r,g,b) {this.color = {r, g, b};}
}


module.exports = GameObject;
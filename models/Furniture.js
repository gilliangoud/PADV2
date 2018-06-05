Furniture = class Furniture extends GameObject {
    constructor (x, y){
        super(x,y,200,200,200);
        this.passable = false;
    }
}

module.exports = Furniture;
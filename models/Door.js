Door = class Door extends GameObject {
    constructor (x, y){
        super(x,y,69,69,69);
        this.passable = true;
    }
}

module.exports = Door;
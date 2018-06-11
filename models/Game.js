var boardController = require('../board/BoardController.js');
var Map = require('./GameMap.js');
Game = class Game {
    constructor() {
        this.players = [];
        this.gameObjects = [];
        this.currentPlayerIndex = 0;
        this.board = new BoardController();
        this.gameState;
    }

    moveAction(direction){
        this.collsionFlag  = false;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        this.tempPosition = this.currentPlayer.move(direction);
        for(var i in this.gameObjects){
            console.log(this.gameObjects);
            console.log(this.tempPosition);
           if ((this.gameObjects[i].position.x == this.tempPosition.x) && (this.gameObjects[i].position.y == this.tempPosition.y) && (this.gameObjects[i].passable == false)) {
             this.currentPlayer.socket.emit('collision');
             this.collsionFlag = true;
           }
        }
        if (this.collsionFlag == false) {
          this.currentPlayer.setPosition(this.tempPosition.x,this.tempPosition.y);
        }
    }

    // inlezen van map
	initMap() {
        this.map = new Map(this.gameObjects);
	}
	
	// update board
    updateBoard() {
        this.board.displayGame(this.gameObjects,this.players);
    }

    // wissel naar volgende speler die aan de beurt is
    nextTurn() {
            // inlezen huidige speler en beidingen van de beurt van huidige speler
            this.currentPlayer = this.players[this.currentPlayerIndex];
            this.currentPlayer.endTurn();
            // als het de laatste speler is in de array begin opnieuw
            if(this.currentPlayerIndex == this.players.length -1){
                this.currentPlayerIndex = 0;
            }
            // ga naar volgende speler in de array
            else {
                this.currentPlayerIndex++;
            }
            // begin beurt volgende speler
            this.players[this.currentPlayerIndex].startTurn();
            this.players[this.currentPlayerIndex].socket.emit('update-actionPoints',this.players[this.currentPlayerIndex].actionPoints);
    }

    addPlayer(player) {
        this.playerCount = this.players.length;
        this.players.push(player);
        if(this.playerCount == 0){
               player.startTurn();
        }
        console.log("Player " + player.id + " added to game.");
    }

    removePlayer(player) {
        let index = this.players.indexOf(player);
        if (index > -1) this.players.splice(index, 1);
    }

    actionHandler(val) {
        console.log(this.currentPlayerIndex)
        this.currentPlayer = this.players[this.currentPlayerIndex];
        this.currentPlayer.actionPoints+= val;
        if (this.currentPlayer.actionPoints <= 0) {
            this.nextTurn();
        }
        this.currentPlayer.socket.emit('update-actionPoints',this.currentPlayer.actionPoints);
    

    }

    startGame() {
        gameState = True;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        this.currentPlayer.startTurn();
    }

    endGame() {
        //reset everything to default
    }

}

module.exports = Game;
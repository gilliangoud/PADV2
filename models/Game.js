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

	initMap() {
        this.map = new Map(this.gameObjects);
	}
	
	
    updateBoard() {
        this.board.displayGame(this.gameObjects,this.players);
    }


    nextTurn() {
            this.currentPlayer = this.players[this.currentPlayerIndex];
            this.currentPlayer.endTurn();
            if(this.currentPlayerIndex == this.players.length -1){
                this.currentPlayerIndex = 0;
            }
            else {
                this.currentPlayerIndex++;
            }
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
var boardController = require('../board/BoardController.js');

Game = class Game {
    constructor() {
        this.players = [];
        this.gameObjects = [];
        this.currentPlayerIndex = 0;
        this.board = new BoardController(10,10,21);
        this.gameState;
    }

    nextTurn() {
        
        this.currentPlayer = this.players[this.currentPlayerIndex];
        this.currentPlayer.endTurn();
        this.currentplayerindex++;
        this.players[this.currentPlayerIndex].startTurn();
    }

    addPlayer(player) {
        this.players.push(player);
        if(this.players.length == 0){
            this.players[this.currentPlayerIndex].startTurn();
        }
        console.log("Player " + player.id + " added to game.");
    }

    removePlayer(player) {
        let index = this.players.indexOf(player);
        if (index > -1) this.players.splice(index, 1);
    }

    startGame() {
        gameState = True;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        this.players[this.currentPlayerIndex].startTurn();
    }

    endGame() {
        //reset everything to default
    }

}

module.exports = Game;
import BoardController from "../board/BoardController.js";

Game = class Game {
    constructor() {
        this.gameObjects = [];
        this.currentPlayerIndex = 0;
        this.board = new BoardController(10,10,21);
        this.gameState;
    }

    nextTurn() {
        this.currentPlayer = this.gameObjects[this.currentPlayerIndex];
        this.currentPlayer.endTurn();
        this.currentPlayerIndex++;
        this.gameObjects[this.currentPlayerIndex].startTurn();
    }

    addPlayer(player) {
        this.gameObjects.push(player);
    }

    removePlayer(player) {
        let index = this.gameObjects.indexOf(player);
        if (index > -1) this.gameObjects.splice(index, 1);
    }

    startGame() {
        //change isPlaying to true
    }

    endGame() {
        //reset everything to default
    }

}

export default Game;
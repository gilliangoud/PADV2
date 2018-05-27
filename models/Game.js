var boardController = require('../board/BoardController.js');
var Wall = require('./Wall.js');
Game = class Game {
    constructor() {
        this.players = [];
        this.gameObjects = [];
        this.currentPlayerIndex = 0;
        this.board = new BoardController();
        this.gameState;
    }

	initMap() {
		    this.gameObjects.push(new Wall(2,4));
            this.gameObjects.push(new Wall(3,4));
            this.gameObjects.push(new Wall(4,4));
            this.gameObjects.push(new Wall(6,1));
            this.gameObjects.push(new Wall(6,2));
            this.gameObjects.push(new Wall(6,3));
            this.gameObjects.push(new Wall(6,4));
            this.gameObjects.push(new Wall(9,1));
            this.gameObjects.push(new Wall(9,3));
            this.gameObjects.push(new Wall(9,4));
            this.gameObjects.push(new Wall(7,4));
            this.gameObjects.push(new Wall(10,4));
            this.gameObjects.push(new Wall(10,7));
            this.gameObjects.push(new Wall(9,7));
            this.gameObjects.push(new Wall(8,7));
            this.gameObjects.push(new Wall(8,9));
            this.gameObjects.push(new Wall(8,10));
            this.gameObjects.push(new Wall(6,7));
            this.gameObjects.push(new Wall(6,8));
            this.gameObjects.push(new Wall(6,9));
            this.gameObjects.push(new Wall(6,10));
            this.gameObjects.push(new Wall(4,7));
            this.gameObjects.push(new Wall(4,8));
            this.gameObjects.push(new Wall(4,10));
            this.gameObjects.push(new Wall(1,7));
            this.gameObjects.push(new Wall(2,7));
            this.gameObjects.push(new Wall(3,7));

            this.gameObjects.push(new Wall(9,2));
            this.gameObjects.push(new Wall(8,4));
            this.gameObjects.push(new Wall(7,7));
            this.gameObjects.push(new Wall(8,8));
            this.gameObjects.push(new Wall(5,4));
            this.gameObjects.push(new Wall(5,7));
            this.gameObjects.push(new Wall(4,9));
            console.log(this.gameObjects);
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
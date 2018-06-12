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
		//ophalen van de tijdelije positie op basis van een move actie
        this.tempPosition = this.currentPlayer.move(direction);
		// doorlopen van gameObjects 
        for(var i in this.gameObjects){
			// controlleren of er geen non passable gameObjects op die positie staan
           if ((this.gameObjects[i].position.x == this.tempPosition.x) 
                && (this.gameObjects[i].position.y == this.tempPosition.y) 
                && (this.gameObjects[i].passable == false)) { 
			//verstuur collision melding naar client
            this.currentPlayer.socket.emit('collision');
            return;
           }
        }
		// set nieuwe positie
        this.currentPlayer.setPosition(this.tempPosition.x,this.tempPosition.y);
        console.log("player moved to " + this.currentPlayer.getPosition());
		// ververs huidige staat van het bord
        this.updateBoard();
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
		// speler toevoegen aan array
        this.players.push(player);
		// in het geval dat het de eerste speler zet de beurt op true
        if(this.playerCount == 0){
               player.startTurn();
        }
        console.log("Player " + player.id + " added to game.");
    }
	
	// speler verwijderen
    removePlayer(player) {
        let index = this.players.indexOf(player);
        if (index > -1) this.players.splice(index, 1);
    }
	
	//actie handelings routine
    actionHandler(val) {
        this.currentPlayer = this.players[this.currentPlayerIndex];
		// nieuwe waarde action points inlezen
        this.currentPlayer.actionPoints+= val;
		// als de actionpoints 0 hebben berijkt beindig de beurt
        if (this.currentPlayer.actionPoints <= 0) {
            this.nextTurn();
        }
		// verstuur nieuwe waarde actionpoints naar client
        this.currentPlayer.socket.emit('update-actionPoints',this.currentPlayer.actionPoints);
    

    }
	// functie om de game te starten
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
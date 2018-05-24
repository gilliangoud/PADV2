BoardController = class BoardController {
    constructor() {
       var PythonShell = require('python-shell');
        var options = {
            mode: 'JSON',
            scriptPath: __dirname,
            stdio: 'pipe'
        };
        this.pyshell = new PythonShell('../board/driver.py', options);

        this.pyshell.on('message', function (message) {
            console.log("python: " + message);
        }); 
    }

    setBrightness(brightness) {
        // TODO structure json formatted message to driver, so it understands.
        self.pyshell.send(JSON.stringify(brightness));
    }

    get_led_position(pos_x ,pos_y){
        var coll = 10;
        var index = 0;
        if(pos_y % 2){
            index = (pos_y*coll)-(coll-pos_x);
        }
        else{
            index = (pos_y*coll)-(pos_x-1);
        }
        return index-1
    }

    ConvertColor(red, green, blue, white = 0){
            return (white << 24) | (red << 16)| (green << 8) | blue;
    }


    displayGame(gameObjects, players) {
           var gameArray = [];
        for(var i = 0; i <= 100; i++ ){
            gameArray[i] = 0;
        }
        for( var i in gameObjects){
            var position = gameObjects[i].getPosition();
            var x = position.x;
            var y = position.y;
            var color= gameObjects[i].getColor();
            var r = color.r;
            var g = color.g;
            var b = color.b;
            gameArray[this.get_led_position(x,y)] = convertedColor;
        }
        var tempArray = [];
        var tempCount = 0;
        for( var j in players){
            var position = players[j].getPosition();
            var x = position.x;
            var y = position.y;
            if (gameArray[this.get_led_position(x,y)] == 0){
                var color= players[j].getColor();
                var r = color.r;
                var g = color.g;
                var b = color.b;
                var convertedColor = this.ConvertColor(r,g,b);
                gameArray[this.get_led_position(x,y)] = convertedColor;
            }
            else {
                tempArray[tempCount] = gameArray[this.get_led_position(x,y)];
                var color= players[j].getColor();
                var r = color.r;
                var g = color.g;
                var b = color.b;
                var convertedColor = this.ConvertColor(r,g,b);
                tempArray.push(convertedColor);
                gameArray[this.get_led_position(x,y)] = tempArray;
                tempCount++;
            }
        }
        console.log(players);
        console.log(gameArray);
        this.pyshell.send(JSON.stringify(gameArray));
    }
}

module.exports = BoardController;
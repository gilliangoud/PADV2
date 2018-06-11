BoardController = class BoardController {
  constructor() {
      // aanmaken python sheel 
       var PythonShell = require('python-shell');
        var options = {
            mode: 'JSON',
            scriptPath: __dirname,
            stdio: 'pipe'
        };
        //aanroepen ptyhon script
        this.pyshell = new PythonShell('../board/driver.py', options);
        //output van python script doorsturen naar console
        this.pyshell.stdout.on('data', function (message) {
            console.log("python: " + message);
        }); 
} 

    setBrightness(brightness) {
        // TODO structure json formatted message to driver, so it understands.
        self.pyshell.send(JSON.stringify(brightness));
    } 

    //functie die x en y cordinaat omzet naar index voor de ledstrip
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
    // zet rgb waarde om naar kleur getal voor ledsrtip
    ConvertColor(red, green, blue, white = 0){
            return (white << 24) | (red << 16)| (green << 8) | blue;
    }

    //main object inlees functie
    displayGame(gameObjects, players) {
           var gameArray = [];
        //array aanmaken en vullen met lege plekken
        for(var i = 0; i <= 100; i++ ){
            gameArray[i] = 0;
        }
        // array vullen met gamobjecten
        for( var i in gameObjects){
            var position = gameObjects[i].getPosition();
            var x = position.x;
            var y = position.y;
            var color= gameObjects[i].getColor();
            var r = color.r;
            var g = color.g;
            var b = color.b;
            var convertedColor = this.ConvertColor(r,g,b);
            gameArray[this.get_led_position(x,y)] = convertedColor;
        }
        var tempArray = [];
        var tempCount = 0;
        //array vullen met spelers
        for( var j in players){
            var position = players[j].getPosition();
            var x = position.x;
            var y = position.y;
            // >>>>>>
            // ?????
            // >>>>>>
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
        // versturen van json naar python script
        this.pyshell.send(JSON.stringify(gameArray));
    }
}

module.exports = BoardController;

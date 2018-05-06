BoardController = class BoardController {
    constructor(cols, rows, pin) {
        var PythonShell = require('python-shell');
        var options = {
            mode: 'text',
            scriptPath: __dirname,
            stdio: 'pipe',
            args: [cols, rows, pin]
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

    displayGame(gameObjects) {
        // TODO process game objects to a json object matrix which the driver can understand. 
        this.pyshell.send(JSON.stringify(gameObjects));
    }
}

export default BoardController;
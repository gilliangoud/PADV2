module.exports.start = function (socket, player, game) {
     socket.on("move", (direction) => {
         game.moveAction(direction);
         game.updateBoard();
     });
    socket.on("currentstate", () => {
        socket.emit("activeTurn",player.activeTurn());
   });
   socket.on("action", (val) => {
            game.actionHandler(val);
    });
    socket.on("name", (name) => {
        player.setName(name);
    });
    socket.on("color", (color) => {
        player.setRGBColor(color);
    });
};
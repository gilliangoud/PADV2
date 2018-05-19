module.exports.start = function (socket, player, game) {
     socket.on("move", (direction) => {
         player.move(direction);
     });
     socket.on("endturn", () => {
         game.nextTurn();
    });
    socket.on("currentstate", () => {
        socket.emit("activeTurn",player.activeTurn());
   });
};
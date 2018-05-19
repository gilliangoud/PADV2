#!/usr/bin/env node

var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gameRoutes = require('./routes.js');
var gameController = require('./models/Game.js');
var PlayerController = require('./models/Player.js');
var boardController = require('./board/BoardController.js');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/html/index.html');
});

game = new Game();

io.on('connection', (socket) => {
  let player = new Player();
  player.setId(socket.id);
  player.setSocket(socket);
  game.addPlayer(player);
  gameRoutes.start(socket, player,game);
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
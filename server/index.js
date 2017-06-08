const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

const addPlayerToList = require('./updateDb').addPlayerToList;
const removePlayerFromList = require('./updateDb').removePlayerFromList;
const updateGameBoard = require('./updateDb').updateGameBoard;
const updateGameBoardAndCheckWinner = require('./updateDb').updateGameBoardAndCheckWinner;

const db = require('./db');

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', socket => {
    addPlayerToList(socket.id);
    
    socket.on('disconnect', () => {
        removePlayerFromList(socket.id)
    });

    socket.on('click td', clickedArrayIndex => {
        const updateGameBoardAndCheckWinnerResponse = updateGameBoardAndCheckWinner(socket.id, clickedArrayIndex);

        io.emit('gameboard update', updateGameBoardAndCheckWinnerResponse);
    });
});

http.listen(port, function(){
  console.log('listening on *: ' + port);
});
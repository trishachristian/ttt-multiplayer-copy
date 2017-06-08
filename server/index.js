const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

const addPlayerToList = require('./updateDb').addPlayerToList;
const removePlayerFromList = require('./updateDb').removePlayerFromList;
const updateGameBoard = require('./updateDb').updateGameBoard;

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', socket => {
    addPlayerToList(socket.id);
    
    socket.on('disconnect', () => {
        removePlayerFromList(socket.id)
    });

    socket.on('click td', clickedArrayIndex => {
        const updatedGameBoardResponse = updateGameBoard(socket.id, clickedArrayIndex);

        if(updatedGameBoardResponse.isUpdated) {
            io.emit('gameboard update', updatedGameBoardResponse);
        }
    });
});

http.listen(port, function(){
  console.log('listening on *: ' + port);
});
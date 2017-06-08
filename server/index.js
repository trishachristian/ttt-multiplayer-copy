const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

const db = require('./db');

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', socket => {
    addPlayerToList(socket.id);
    
    socket.on('disconnect', () => {
        removePlayerFromList(socket.id)
    });

    socket.on('click td', clickedArrayIndex => {
        const updateGameBoardResponse = updateGameBoard(socket.id, clickedArrayIndex);

        if(updateGameBoardResponse.isUpdated) {
            socket.emit('gameboard update', updateGameBoardResponse.gameBoard);
        }
    });
});


const addPlayerToList = clientId => {
    if(db.players.length > 1) return;

    db.players.push(clientId);
}

const removePlayerFromList = (clientId) => {
    const idIndex = db.players.indexOf(clientId);

    if(idIndex >= 0) db.players.splice(idIndex, 1);
}

const updateGameBoard = (clientId, clickedArrayIndex) => {
    const idIndex = db.players.indexOf(clientId);

    if(idIndex === 0 && db.gameBoard[clickedArrayIndex] === null && db.isXTurn === false) {
        db.gameBoard[clickedArrayIndex] = 'O';
        db.isXTurn = true;
        return { isUpdated: true, gameBoard: db.gameBoard};
    }
    else if(idIndex === 1 && db.gameBoard[clickedArrayIndex] === null && db.isXTurn === true) {
        db.gameBoard[clickedArrayIndex] = 'X';
        db.isXTurn = false;
        return { isUpdated: true, gameBoard: db.gameBoard};
    }
    return { isUpdated: false };
}


http.listen(port, function(){
  console.log('listening on *: ' + port);
});
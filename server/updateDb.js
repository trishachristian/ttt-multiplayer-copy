const db = require('./db');

module.exports.addPlayerToList = clientId => {
    if(db.players.length > 1) return;

    db.players.push(clientId);
}

module.exports.removePlayerFromList = (clientId) => {
    const idIndex = db.players.indexOf(clientId);

    if(idIndex >= 0) db.players.splice(idIndex, 1);
}

module.exports.updateGameBoard = (clientId, clickedArrayIndex) => {
    const idIndex = db.players.indexOf(clientId);

    if(idIndex === 0 && db.gameBoard[clickedArrayIndex] === null && db.isXTurn === false) {
        db.gameBoard[clickedArrayIndex] = 'O';
        db.isXTurn = true;
        return { isUpdated: true, gameBoard: db.gameBoard, nextTurn: 'X'};
    }
    else if(idIndex === 1 && db.gameBoard[clickedArrayIndex] === null && db.isXTurn === true) {
        db.gameBoard[clickedArrayIndex] = 'X';
        db.isXTurn = false;
        return { isUpdated: true, gameBoard: db.gameBoard, nextTurn: 'O'};
    }
    return { isUpdated: false };
}
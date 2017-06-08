const db = require('./db');

module.exports.addPlayerToList = clientId => {
    if(db.players.length > 1) return;

    db.players.push(clientId);
}

module.exports.removePlayerFromList = (clientId) => {
    const idIndex = db.players.indexOf(clientId);

    if(idIndex >= 0) db.players.splice(idIndex, 1);
}

module.exports.updateGameBoardAndCheckWinner = (clientId, clickedArrayIndex) => {
    const updatedGameBoardResponse = updateGameBoard(clientId, clickedArrayIndex);

    if(updatedGameBoardResponse.isUpdated) {
        const checkWinnerResponse = checkWinner(updatedGameBoardResponse.gameBoard);
        if(checkWinnerResponse.gameComplete) return checkWinnerResponse;
    }
    return updatedGameBoardResponse;
}

const updateGameBoard = (clientId, clickedArrayIndex) => {
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

const checkWinner = gameBoard => {
    const pattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    let i = 0,
        j = 0,
        figure = '';

    while(i < 8) {
        if(j >= 3) {
            if(figure === 'OOO' || figure === 'XXX') {
                db.gameComplete = true;
                db.winnerPattern = pattern[i];
                db.message = pattern[i][0] + ' wins the game';
                db.gameBoard = gameBoard;
                
                return {
                    isUpdated: true,
                    gameComplete: db.gameComplete,
                    winnerPattern: db.winnerPattern, 
                    message: db.message,
                    gameBoard: db.gameBoard
                };
            }
        i++;
        j = 0;
        figure = '';
        }
    
        if(i === 8) {
            if(gameBoard.indexOf(null) === -1) {
                db.gameComplete = true;
                message = 'Tie Game';
                db.gameBoard = gameBoard;
                return {
                    isUpdated: true,
                    gameComplete: db.gameComplete,
                    message: db.message,
                    gameBoard: db.gameBoard
                };
            }
            return { gameComplete: false };
        }
  
        figure += gameBoard[pattern[i][j]];

        j++;
    }
};
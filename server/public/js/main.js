$(() => {
    const socket = io();

    let gameBoard = [];

    $('td').on('click', event => {
        socket.emit('click td', event.target.id);
    });

    socket.on('gameboard update', updatedGameData => {
        updateDOM(updatedGameData);
    });


    const updateDOM = updatedGameBoard => {
        updatePlayerTurn(updatedGameBoard.nextTurn);
        updateGameBoard(updatedGameBoard.gameBoard);
        updateGameBoardOnDom();
    };

    const updatePlayerTurn = playerTurn => {
        $('.current-player-turn').text(playerTurn);
    }

    const updateGameBoard = updatedGameBoard => {
        gameBoard = updatedGameBoard;
    }

    const updateGameBoardOnDom = () => {
        gameBoard.map((figure, index) => {
            $('#' + index).text(figure);
        });
    }
});
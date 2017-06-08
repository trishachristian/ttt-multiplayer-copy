$(() => {
    const socket = io();

    $('td').on('click', event => {
        socket.emit('click td', event.target.id);
    });

    socket.on('gameboard update', updatedGameBoard => {
        $('.current-player-turn').text(updatedGameBoard.nextTurn);
        
        updatedGameBoard.gameBoard.forEach((figure, index) => {
            $('#' + index).text(figure);
        });
    });
});
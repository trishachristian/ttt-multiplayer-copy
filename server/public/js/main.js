$(() => {
    const socket = io();

    $('td').on('click', event => {
        socket.emit('click td', event.target.id);
    });

    socket.on('gameboard update', gameBoard => {
        gameBoard.forEach((figure, index) => {
            $('#' + index).text(figure);
        });
    });
});
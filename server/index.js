const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

const db = require('./db');

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', client => {
    addPlayerToList(client.id);
    
    client.on('disconnect', () => {
    removePlayerFromList(client.id)
})
});

const addPlayerToList = clientId => {
    if(db.players.length > 1) return;

    db.players.push(clientId);
    console.log(db.players)
}

const removePlayerFromList = (clientId) => {
    const idIndex = db.players.indexOf(clientId)
console.log(idIndex)
    if(idIndex >= 0) db.players.splice(idIndex, 1);

    console.log(db.players)
}

http.listen(port, function(){
  console.log('listening on *: ' + port);
});
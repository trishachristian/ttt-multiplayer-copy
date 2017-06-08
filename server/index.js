const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

io.on('connection', client => {
    client.on('join', name => {
        addPlayerToList(client.id);
    })
});

const addPlayerToList = (clientId) {
    if(db.clientId.length > 2) return;
    
    db.clientId.push(clientId);
}

http.listen(port, function(){
  console.log('listening on *: ' + port);
});
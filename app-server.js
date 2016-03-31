var express = require('express');
var app = express();

var connections = [];
var title = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000, function () {
  console.log('Server runnning at http://localhost:3000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.once('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected socket %s. %s connections remaining.', socket.id, connections.length);
  });

  socket.on('join', function (payload) {
    var newMember = {
      id: this.id,
      name: payload.name
    };
    this.emit('joined', newMember);
    console.log("Audience joined by %s:", payload.name);
  });

  socket.emit('welcome', {
    title: title
  });

  connections.push(socket);
  console.log('Connected to socket: %s. %s', socket.id, connections.length);
});

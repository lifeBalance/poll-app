var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000, function () {
  console.log('Server runnning at http://localhost:3000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.once('disconnect', function () {
    var member = _.findWhere(audience, {id: this.id});
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      console.log('%s left the audience. %s remain in the audience', member.name, audience.length);
    }

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
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    console.log("Audience joined by: %s", payload.name);
  });

  socket.emit('welcome', {
    title: title
  });

  connections.push(socket);
  console.log('Connected to socket: %s. %s', socket.id, connections.length);
});

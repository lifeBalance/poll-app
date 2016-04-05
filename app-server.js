var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
var questions = require('./app-questions');

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
    } else if (this.id === speaker.id) {
      console.log('Speaker %s has bounced. Presentation "%s" is over bitches!', speaker.name, title);
      speaker = {};
      title = 'Untitled Presentation';
      io.sockets.emit('end', { title: title, speaker: '' });
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected socket %s. %s connections remaining.', socket.id, connections.length);
  });

  // When a member of the audience joins the app
  socket.on('join', function (payload) {
    var newMember = {
      id: this.id,
      name: payload.name,
      type: 'audience'
    };
    this.emit('joined', newMember);
    audience.push(newMember);
    io.sockets.emit('audience', audience);
    console.log("Audience joined by: %s", payload.name);
  });

  // When a speaker starts a presentation
  socket.on('start', function (payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payload.title;
    this.emit('joined', speaker);
    io.sockets.emit('start', { title: title, speaker: speaker.name });
    console.log('Presentation: "%s" started. Lecturer: %s ', title, speaker.name);
  });

  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions
  });

  connections.push(socket);
  console.log('Connected to socket: %s. %s', socket.id, connections.length);
});

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var lastSocket = null;

app.get('/dc', function (req, res) {
  console.log(lastSocket);
  if (lastSocket != null) { lastSocket.disconnect(true); }
  res.json({ disconnect: 1 });
});

var sockets = {};

var usersList = function () {
  io.emit('usersList', {
    users: Object.keys(sockets)
  });
  setTimeout(usersList, 2000);
};
usersList();

io.on('connect', function (socket) {
  if (socket.handshake.query.username != null && sockets[socket.handshake.query.username] == null) {
    sockets[socket.handshake.query.username] = socket;
    lastSocket = socket;
    console.log('Socket connection');
    socket.send({ username: 'app', message: 'Connected!'});

  //  setTimeout(function () {
  //    socket.send('After 5s!');
  //  }, 5000);
    socket.on('disconnect', function () {
      delete sockets[socket.handshake.query.username];
      console.log('Socket disconnecting');
    });
    socket.on('message', function (message) {
      io.emit('message', message);
    });
  } else {
    socket.disconnect(true);
  }
});

server.listen(5000, function () {
  console.log("Server started");
});
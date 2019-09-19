let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', onConnect);

function onConnect(socket) {
  console.log('new connection made.');

  socket.on('join', function(data) {
    socket.join(data.room);
    console.log(data.user + ' joined the room : ' + data.room);
    socket.broadcast.to(data.room).emit('new-user-joined', { user: data.user, message: 'has joined this room.' });
  });

  socket.on('leave', function(data) {
    console.log(data.user + ' left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left-room', { user: data.user, message: 'has left this room.' });
    socket.leave(data.room);
  });

  socket.on('message', function(data) {
    io.in(data.room).emit('new-message', { user: data.user, message: data.message });
  });
}

server.listen(port, () => {
  console.log(`listening: ${port}`);
});

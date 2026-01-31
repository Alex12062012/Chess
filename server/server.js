const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../public')));

// Temporary storage for lobbies
const lobbies = {};

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('create', () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(code);
    socket.emit('joined', { code });
  });

  socket.on('join', ({ code }) => {
    const room = io.sockets.adapter.rooms.get(code);
    if (!room || room.size < 2) {
      socket.join(code);
      socket.to(code).emit('opponentJoined');
      if (room && room.size === 2) {
        io.to(code).emit('startGame');
      }
    } else {
      socket.emit('full');
    }
  });

  socket.on('move', (data) => {
    socket.to(data.code).emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const socket = io();

document.getElementById('createLobby').onclick = () => {
  socket.emit('create');
};

document.getElementById('joinLobby').onclick = () => {
  const code = prompt("Enter lobby code:");
  if (code) {
    socket.emit('join', { code });
  }
};

socket.on('joined', (data) => {
  alert(`Lobby created: ${data.code}`);
});

socket.on('opponentJoined', () => {
  alert('Opponent joined!');
});

socket.on('startGame', () => {
  window.location.href = '/game.html';
});

socket.on('full', () => {
  alert('Lobby is full!');
});

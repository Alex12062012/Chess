const boardEl = document.getElementById("board");
let game = new Chess();
let socket = io();

function renderBoard() {
  let html = '<table>';
  for (let r = 7; r >= 0; r--) {
    html += '<tr>';
    for (let f = 0; f < 8; f++) {
      const sq = String.fromCharCode(97+f) + (r+1);
      const piece = game.get(sq);
      let pieceSymbol = '';
      if (piece) {
        pieceSymbol = `<img src="/assets/pieces/${piece.color}${piece.type}.png" width="50">`;
      }
      html += `<td data-square="${sq}">${pieceSymbol}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  boardEl.innerHTML = html;

  document.querySelectorAll('td[data-square]').forEach(td => {
    td.onclick = () => onSquareClick(td.dataset.square);
  });
}

let selected = null;

function onSquareClick(square) {
  if (!selected) {
    selected = square;
  } else {
    socket.emit('move', { from: selected, to: square, code: 'current_lobby_code' });
    selected = null;
  }
}

socket.on('move', (data) => {
  game.move({ from: data.from, to: data.to });
  playSound();
  renderBoard();
});

function playSound() {
  const audio = new Audio('/assets/sounds/move.mp3');
  audio.play();
}

renderBoard();

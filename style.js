const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

// Function to handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.id.split('-')[1];

  if (gameBoard[cellIndex] || isGameOver) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
  } else if (gameBoard.every(cell => cell)) {
    gameStatus.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';
  gameStatus.textContent = '';
  cells.forEach(cell => cell.textContent = '');
});

// Attach event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

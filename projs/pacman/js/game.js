'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';

var CHERRY = '🍒';
var SUPER_FOOD = '🍉';

var gIntervalCreateCherries;

var superFoodsetTimeout;
var gBoard;
var gGame = {
  food: 0,
  superfoods: 4,
  score: 0,
  isOn: false
};

// Elements
var elModal = document.querySelector('.modal');

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  gIntervalCreateCherries = setInterval(createCherry, 3000);

  printMat(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 ||(j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }

    }
  }
  board[1][1] = SUPER_FOOD;
  board[SIZE - 2][1] = SUPER_FOOD;
  board[1][SIZE - 2] = SUPER_FOOD;
  board[SIZE - 2][SIZE - 2] = SUPER_FOOD;
  return board;
}

function createCherry() {
  var cherry = findRandomEmptyCell(gBoard);
  if (cherry) {

    gBoard[cherry.i][cherry.j] = CHERRY;
    renderCell(cherry);

    return cherry;
  }
}

function updateScore(value) {
  // Update both the model and the dom for the score
  if (gGame.isOn) {
    gGame.score += value;
    gGame.food += 1;
    document.querySelector('header h3 span').innerText = gGame.score;
  }
  else {
    gGame.score = 0;
    document.querySelector('header h3 span').innerText = gGame.score;
  }
}

function gameOver(text) {
  console.log('Game Over');

  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;

  clearInterval(gIntervalCreateCherries);
  gIntervalCreateCherries = null;
  showModal(text);
}

function showModal(text) {
  elModal.style.display = 'block';
  var elModalContent = document.querySelector('.modal-content');
  elModalContent.innerText = text;

}

function playAgain() {
  elModal.style.display = 'none';
  updateScore(0);

  gGame.isOn = true;
  gGame.score = 0;
  gGame.food = 0;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  gIntervalCreateCherries = setInterval(createCherry, 15000);
}


function isVictorious() {
  if (gGame.food === 54) {
    gameOver('game over Victorious');
    return;
  }
}




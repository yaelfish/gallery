
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandonNum(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  var data = gBoard[location.i][location.j];
  elCell.innerHTML = (data === GHOST)? getGhostHTML(findGhost(location)) :data ;
}


function searchForCellByValue(board , value) {
  var matchingCells = [];
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      if (cell === value) {
        var coords = { i, j };
        matchingCells.push(coords);
      }
    }
  }
  return matchingCells;
}

function findRandomEmptyCell(board) {
  var emptyCells = searchForCellByValue(board);
  if (emptyCells.length > 2) {
    var randomNum1 = getRandonNum(emptyCells.length);
    var emptyCell = emptyCells[randomNum1];
    return emptyCell;
  }
  return null;

}
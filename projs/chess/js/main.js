'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (let i = 0; i < 8; i++) {
        board.push([]);
        for (let j = 0; j < 8; j++) {
            board[i][j] = {
                piece: '',
                marked: false,
                selected: false
            };
            if (i === 1) board[i][j].piece = PAWN_BLACK;
            if (i === 6) board[i][j].piece = PAWN_WHITE;
        }

    }
    board[0][0].piece = board[0][7].piece = ROOK_BLACK
    board[0][1].piece = board[0][6].piece = KNIGHT_BLACK
    board[0][2].piece = board[0][5].piece = BISHOP_BLACK
    board[0][3].piece = QUEEN_BLACK
    board[0][4].piece = KING_BLACK

    board[3][5].piece = QUEEN_BLACK

    board[7][0].piece = board[7][7].piece = ROOK_WHITE;
    board[7][1].piece = board[7][6].piece = KNIGHT_WHITE;
    board[7][2].piece = board[7][5].piece = BISHOP_WHITE;
    board[7][3].piece = QUEEN_WHITE;
    board[7][4].piece = KING_WHITE;
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = ((j + i) % 2 === 0) ? 'white' : 'black';
            var tdId = 'cell-' + i + '-' + j;

            strHtml += `<td data-id="${tdId}" 
                            onclick="cellClicked(this)"
                            class="${className}"> ${cell.piece}</td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }
    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.dataset.id); // returns {i,j} 
    var cell = gBoard[cellCoord.i][cellCoord.j]; //{piece:''}

    var possibleCoords = [];
    switch (cell.piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord, cell.piece === PAWN_WHITE);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            // possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, cell.piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord, cell.piece === KING_WHITE);
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord, cell.piece === QUEEN_WHITE);
            break;

    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece
    var fromCoords = getCellCoord(elFromCell.dataset.id);
    var toCoords = getCellCoord(elToCell.dataset.id);

    gBoard[toCoords.i][toCoords.j].piece = gBoard[fromCoords.i][fromCoords.j].piece;

    gBoard[fromCoords.i][fromCoords.j].piece = '';
    elFromCell.innerText = ''
    elToCell.innerText = gBoard[toCoords.i][toCoords.j].piece
    // renderBoard(gBoard);
    // update the MODEl, update the DOM
}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var dataID = `cell-${coord.i}-${coord.j}`
        var elCell = document.querySelector(`[data-id="${dataID}"]`)
        elCell.classList.add('mark');
    }
    // TODO: query select them one by one and add mark 
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };

    return coord;
}

function cleanBoard() {
    var tds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < tds.length; i++) {
        tds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j].piece === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];
    var cellDirection = isWhite ? -1 : 1;
    var option = {
        i: (pieceCoord.i + cellDirection),
        j: pieceCoord.j
    }
    // TODO : is the end of the board?!
    if (!isCellTaken(option)) {
        res.push(option)
        if ((pieceCoord.i === 6 && isWhite) || (pieceCoord.i === 1 && !isWhite)) {
            option = {
                i: (pieceCoord.i + (cellDirection * 2)),
                j: pieceCoord.j
            };
            if (!isCellTaken(option)) {
                res.push(option)
            }
        }
    }
    // TODO: PAWN eats diagnional! 
    // add check if cell taken diagnoal and add to options
    // TODO: handle PAWN
    return res;
}

function isCellTaken(coords) {
    return gBoard[coords.i][coords.j].piece !== ''
}



function getAllPossibleCoordsRook(pieceCoord, isWhite) {
    var res = [];
    if(!isWhite){
        //going up
        for (var i = pieceCoord.i - 1; i >= 0; i--) {
            var position = {
                i, j: pieceCoord.j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going down
        for (var i = pieceCoord.i + 1; i < gBoard.length; i++) {
            var position = {
                i, j: pieceCoord.j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going left
        for (var j = pieceCoord.j - 1; j >= 0; j--) {
            var position = {
                i: pieceCoord.i, j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going right
        for (var j = pieceCoord.j + 1; j < 8; j++) {
            var position = {
                i: pieceCoord.i, j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }
    }
    if(isWhite){
        //going up
        for (var i = pieceCoord.i - 1; i >= gBoard.length; i--) {
            var position = {
                i, j: pieceCoord.j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going down
        for (var i = pieceCoord.i + 1; i >= 0; i++) {
            var position = {
                i, j: pieceCoord.j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going left
        for (var j = pieceCoord.j - 1; j >= 0; j--) {
            var position = {
                i: pieceCoord.i, j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }

        //going right
        for (var j = pieceCoord.j + 1; j < gBoard[i].length; j++) {
            var position = {
                i: pieceCoord.i, j
            }
            if (isEmptyCell(position)) {
                res.push(position);
            } else { break; }
        }
    }
    
    console.log(res);
    
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    // go up & right
    var i = pieceCoord.i - 1;
    for (var j = pieceCoord.j + 1; i >= 0 && j < 8; j++) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
        console.log(res);
        
    }

    // go down & right
    var i = pieceCoord.i + 1;
    for (var j = pieceCoord.j + 1; i < 8 && j < 8; j++) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // go down & left
    var i = pieceCoord.i + 1;
    for (var j = pieceCoord.j - 1; i < 8 && j >= 0; j--) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // go up & left
    var i = pieceCoord.i - 1;
    for (var j = pieceCoord.j - 1; i >= 0 && j >= 0 ; j--) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // TODO: 3 more directions - the Bishop 
    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];

    // go up & right
    var i = pieceCoord.i - 1;
    if (i >= 0 && pieceCoord.j < 8) {
        var coord = { i: i--, j: pieceCoord.j+1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go up
    var i = pieceCoord.i - 1;
    if (i >= 0) {
        var coord = { i: i--, j: pieceCoord.j };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go right
    var i = pieceCoord.i;
    if (pieceCoord.j < 8) {
        var coord = { i, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go left
    var i = pieceCoord.i;
    if (pieceCoord.j >= 0) {
        var coord = { i, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go down
    var i = pieceCoord.i + 1;
    if (i < 8) {
        var coord = { i: i++, j: pieceCoord.j };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go down & right
    var i = pieceCoord.i + 1;
    if (i < 8 && pieceCoord.j < 8) {
        var coord = { i: i++, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go down & left
    var i = pieceCoord.i + 1;
    if (i < 8 && pieceCoord.j >= 0) {
        var coord = { i: i++, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    // go up & left
    var i = pieceCoord.i - 1;
    if (i >= 0 && pieceCoord.j >= 0) {
        var coord = { i: i--, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) res.push(coord);
    }

    return res;
}

function getAllPossibleCoordsQueen(pieceCoord){
    var res = [];
    var bishopOptions = getAllPossibleCoordsBishop(pieceCoord);
    var rookOptions = getAllPossibleCoordsRook(pieceCoord);
    for (var i = 0; i < bishopOptions.length; i++) {
        var bishopOption = bishopOptions[i];
        res.push(bishopOption);
    }
    for (var i = 0; i < rookOptions.length; i++) {
        var rookOption = rookOptions[i];
        res.push(rookOption);
    }
    
    return res;
}

// function getAllPossibleCoordsKnight(pieceCoord) {
//     var res = [];

//     return res;
// }

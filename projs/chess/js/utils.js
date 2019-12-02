'use strict'

function countPiecesAround(pos, distance = 1) {
    var pieceCount = 0;
    for (var i = pos.i - 1; i <= pos.i + distance; i++) {
        // if i is out of bounderies - go to the next i 
        if (i < 0 || i >= gBoard.length) continue;  //continue to the next i 

        for (var j = pos.j - 1; j <= pos.j + distance; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j >= gBoard[0].length) continue; // continue to the next j.

            if (i === pos.i && j === pos.j) continue;
            if (gBoard[i][j] === FOOD) pieceCount++;
        }
    }
    return pieceCount;
}
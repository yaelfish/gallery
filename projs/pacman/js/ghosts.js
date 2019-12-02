var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;
var gReserveGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        color: getRandomColor(),
        prevColor: '',
        superColor: false,
        currCellContent: FOOD
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function changeGhostsColors(color) {
    for (var i = 0; i < gGhosts.length; i++) {
        ghost = gGhosts[i];
        ghost.prevColor = ghost.color;
        ghost.color = color;
    }
}

function changeGhostsColorBack() {
    for (var i = 0; i < gGhosts.length; i++) {
        ghost = gGhosts[i];
        ghost.color = ghost.prevColor;
    }
}

function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (!ghost.isDead) {
            // Create the moveDiff
            var moveDiff = getMoveDiff();
            var nextLocation = { i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j }
            // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

            // if WALL return
            if (gBoard[nextLocation.i][nextLocation.j] === WALL) return

            // if SUPERFOOD return
            if (gBoard[nextLocation.i][nextLocation.j] === SUPER_FOOD) return

            // if PACMAN - gameOver, return
            if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
                pacmanAndGhostMeet(ghost.location);
            }
            // if GHOST - give up
            if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
                return
            }

            // set back what we stepped on: update Model, DOM
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
            renderCell(ghost.location, ghost.currCellContent)

            // move the ghost
            ghost.location = nextLocation

            // keep the contnet of the cell we are going to
            ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

            // move the ghost and update model and dom
            gBoard[ghost.location.i][ghost.location.j] = GHOST
            renderCell(ghost.location, getGhostHTML(ghost))

        }
    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    if (ghost.isDead) {
        return ''
    }
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}

function findGhost(ghostPos) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (ghost.location.i === ghostPos.i && ghost.location.j === ghostPos.j) {
            return ghost;
        }
    }
    return null;
}

function killGhost(ghostPos) {
    var ghost = findGhost(ghostPos);
    ghost.isDead = true;
}


function reviveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        ghost.isDead = false;
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location)
    }
}

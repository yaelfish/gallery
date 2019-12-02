var gPacman;
const PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function eatCherry(nextLocation) {
  updateScore(10);
  changePacmanLocation(nextLocation);
}

function eatSuperFood(nextLocation) {
  gPacman.isSuper = true;
  changeGhostsColors('blue');
  changePacmanLocation(nextLocation);
  setTimeout(removeSuper, 5000);
}

function removeSuper() {
  gPacman.isSuper = false;
  changeGhostsColorBack();
  reviveGhosts();
}

function changePacmanLocation(nextLocation) {
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  renderCell(gPacman.location, EMPTY);

  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  renderCell(nextLocation, PACMAN);

  gPacman.location = nextLocation;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  switch (nextCell) {
    case WALL:
      break;
    case CHERRY:
      eatCherry(nextLocation);
      break;
    case SUPER_FOOD:
      if (!gPacman.isSuper) {
        eatSuperFood(nextLocation);
      }
      else {
        console.log('pacman is super is already work');
      }
      break;
    case FOOD:
      updateScore(1);
      changePacmanLocation(nextLocation);
      isVictorious();
      break;
    case GHOST:
      pacmanAndGhostMeet(nextLocation);
      break;
    default:
      changePacmanLocation(nextLocation);
      break;
  }
}

function pacmanAndGhostMeet(ghostLocation) {
  if (gPacman.isSuper) {
    killGhost(ghostLocation);
    changePacmanLocation(ghostLocation);
  }
  else {
    gameOver('game over :( a ghost killed you');
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    return;
  }
}


function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}


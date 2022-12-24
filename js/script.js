//imports
import { initializeBoard, gameBoardInterface } from "./init.js";
import {
  turnPrompt,
  keepScore,
  showPossibleMoves,
  gameEndDisplay,
  countOfPossibleMoves,
  displayPrompt,
  resetStopwatch,
} from "./ux.js";

import {
  getRowCol,
  canClickSpot,
  getAffectedDiscs,
  switchTurns,
  turn,
 
} from "./helpers.js";

//constants
let gameForfeited = false;

//functions
export function handleClick(evt) {
  const boxEl = evt.target;
  const [row, col] = getRowCol(boxEl);
  if (gameBoardInterface[row][col] !== 0 || canClickSpot(row, col) == false) {
    displayPrompt.textContent = `Sorry, that is not a valid move!`;
  } else if (canClickSpot(row, col) == true) {
    let affectedDiscs = getAffectedDiscs(row, col);
    flipDiscs(affectedDiscs);
    gameBoardInterface[row][col] = turn;
    switchTurns();
    renderBoard();
  }
}

export function renderBoard() {
  keepScore();
  initializeBoard();
  if (endGame() === true) {
    gameEndDisplay();
    resetStopwatch();
    gameForfeited = false;
    return;
  }
  turnPrompt();
  showPossibleMoves();
  if (countOfPossibleMoves === 0) {
    validatePass();
  }
}

export function flipDiscs(affectedDiscs) {
  for (let i = 0; i < affectedDiscs.length; i++) {
    let toBeFlipped = affectedDiscs[i];
    if (gameBoardInterface[toBeFlipped.row][toBeFlipped.col] == 1) {
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 2;
    } else {
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 1;
    }
  }
}

export function endGame() {
  let gameboardValues = [];
  gameBoardInterface.forEach(function (arr) {
    for (let i = 0; i < arr.length; i++) {
      gameboardValues.push(arr[i]);
    }
  });
  if (
    gameboardValues.indexOf(0) == -1 ||
    gameboardValues.indexOf(1) == -1 ||
    gameboardValues.indexOf(2) == -1 ||
    gameForfeited === true
  ) {
    return true;
  } else {
    return false;
  }
}

export function forfeitGame() {
  gameForfeited = true;
  renderBoard();
}

//imports
import {
  handleClick,
  renderBoard,
  forfeitGame,
} from "./script.js";

import {
  displayRulesPage,
  startTimer,
  resetStopwatch,
} from "./ux.js";

import {
  validatePass,
} from "./helpers.js";

//constants
export const endGameDisplay = document.querySelector(".endgame-display");

// event listeners
export const gameBoard = document.querySelector(".gameboard");
gameBoard.addEventListener("click", handleClick);

const resetGameButton = document.querySelector(".reset-game");
resetGameButton.addEventListener("click", resetGame);

const forfeit = document.querySelector(".forfeit");
forfeit.addEventListener("click", forfeitGame);

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", resetGame);

const passButton = document.querySelector(".pass");
passButton.addEventListener("click", validatePass);

const rulesButton = document.querySelector(".rules");
rulesButton.addEventListener("click", displayRulesPage);

//states
export let gameBoardInterface = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

window.onload = function () {
  createHTMLBoard();
  initializeBoard();
};
export function createHTMLBoard(row = 8, col = 8) {
  let counter = 0;
  for (let i = 0; i < row * col; i++) {
    let box = document.createElement("div");
    gameBoard.appendChild(box).className = "box";
  }
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j < 8; j++) {
      let boxId = document.querySelectorAll(".box")[counter];
      boxId.id = `data-${i}${j}`;
      counter++;
    }
  }
}
export function initializeBoard() {
  let boxIdx = 0;
  for (let row = 0; row < gameBoardInterface.length; row++) {
    for (let column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];
      let boxElement = document.getElementsByClassName("box")[boxIdx];
      if (valueAtGBI === 1) {
        boxElement.innerHTML = "&#9898;";
      } else if (valueAtGBI === 2) {
        boxElement.innerHTML = "&#9899;";
      }
      boxIdx++;
    }
  }
}

export function resetGame() {
  gameBoardInterface = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.lastChild);
  }
  endGameDisplay.style.display = "none";
  createHTMLBoard();
  renderBoard();
  resetStopwatch();
  startTimer();
}

//imports
import { gameBoardInterface, gameBoard, endGameDisplay } from "./init.js";
import { canClickSpot, turn, white, black } from "./helpers.js";
import { endGame } from "./script.js";

// constants
export const displayPrompt = document.querySelector(".turn");
let whiteScore = 0;
let blackScore = 0;
const whiteDiscScore = document.querySelector("#white-disc");
const blackDiscScore = document.querySelector("#black-disc");
export let countOfPossibleMoves = 0;
const endGameDisplayText = document.querySelector(".display-text");
const rulesPage = document.querySelector(".rules-page");

export function turnPrompt() {
  if (turn === white.val) {
    displayPrompt.textContent = `It's ${white.name}'s turn!`;
    blackDiscScore.style.boxShadow = "none";
    whiteDiscScore.style.boxShadow = "0 0 40px 20px #FFD700";
    displayPrompt.style.backgroundColor = "white";
    displayPrompt.style.color = "black";
    gameBoard.style.backgroundColor = "white";
    gameBoard.style.border = "5px solid white";
  } else {
    displayPrompt.textContent = `It's ${black.name}'s turn!`;
    whiteDiscScore.style.boxShadow = "none";
    blackDiscScore.style.boxShadow = "0 0 40px 20px #FFD700";
    displayPrompt.style.backgroundColor = "black";
    displayPrompt.style.color = "white";
    gameBoard.style.backgroundColor = "black";
    gameBoard.style.border = "5px solid black";
  }
}
export function keepScore() {
  let whiteCount = 0;
  let blackCount = 0;
  for (let row = 0; row < gameBoardInterface.length; row++) {
    for (let column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];

      if (valueAtGBI === 0) {
      } else if (valueAtGBI === 1) {
        whiteCount++;
      } else if (valueAtGBI === 2) {
        blackCount++;
      }
    }
  }
  whiteScore = whiteCount;
  blackScore = blackCount;
  whiteDiscScore.textContent = whiteScore;
  blackDiscScore.textContent = blackScore;
}

export function displayRulesPage() {
  rulesPage.style.display === "none"
    ? (rulesPage.style.display = "initial")
    : (rulesPage.style.display = "none");
}

export function gameEndDisplay() {
  endGameDisplay.style.display = "flex";
  whiteScore === blackScore
    ? (endGameDisplayText.innerHTML = `It's a tie! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
        startTime
      )} 
      `)
    : whiteScore > blackScore
    ? (endGameDisplayText.innerHTML = `${
        white.name
      } wins! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
        startTime
      )}`)
    : (endGameDisplayText.innerHTML = `${
        black.name
      } wins! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
        startTime
      )}`);
}

const elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];
let elapsedTimeIntervalRef;
let startTime;
export function startTimer() {
  setStartTime();
  elapsedTimeIntervalRef = setInterval(() => {
    elapsedTimeText.innerText = timeAndDateHandling.getElapsedTime(startTime);
  }, 1000);
}
export function setStartTime() {
  startTime = new Date();
}
export function resetStopwatch() {
  if (typeof elapsedTimeIntervalRef !== "undefined" || endGame() === true) {
    clearInterval(elapsedTimeIntervalRef);
    elapsedTimeIntervalRef = undefined;
  }
  elapsedTimeText.innerText = "00:00";
}
export var timeAndDateHandling = {
  getElapsedTime: function (startTime) {
    let endTime = new Date();
    let timeDiff = endTime.getTime() - startTime.getTime();
    timeDiff = timeDiff / 1000;
    let seconds = Math.floor(timeDiff % 60);
    let secondsAsString = seconds < 10 ? "0" + seconds : seconds + "";
    timeDiff = Math.floor(timeDiff / 60);
    let minutes = timeDiff % 60;
    let minutesAsString = minutes < 10 ? "0" + minutes : minutes + "";
    timeDiff = Math.floor(timeDiff / 60);
    let hours = timeDiff % 24;
    timeDiff = Math.floor(timeDiff / 24);
    let days = timeDiff;
    let totalHours = hours + days * 24;
    let totalHoursAsString =
      totalHours < 10 ? "0" + totalHours : totalHours + "";
    if (totalHoursAsString === "00") {
      return minutesAsString + ":" + secondsAsString;
    } else {
      return totalHoursAsString + ":" + minutesAsString + ":" + secondsAsString;
    }
  },
};

export function showPossibleMoves() {
  let countPossibleMoves = 0;

  for (let row = 0; row < gameBoardInterface.length; row++) {
    for (let col = 0; col < gameBoardInterface.length; col++) {
      if (canClickSpot(row, col) && gameBoardInterface[row][col] == 0) {
        let possibleMoves = document.querySelector(`#data-${row}${col}`);
        possibleMoves.style.opacity = "0.7";
        possibleMoves.classList.add("bool-true");
        countPossibleMoves++;
      }
    }
  }
  countOfPossibleMoves = countPossibleMoves;
}

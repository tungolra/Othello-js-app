// constants

const white = { val: 1, name: "Player 1" };
const black = { val: 2, name: "Player 2" };
const boardLayer = document.querySelector(".boardLayer");
const boxes = document.querySelectorAll(".box");
const whiteDiscScore = document.querySelector("#white-disc");
const blackDiscScore = document.querySelector("#black-disc");
const displayTurn = document.querySelector(".turn");
const playerOneName = document.querySelector(".player-one");
const playerTwoName = document.querySelector(".player-two");
const endGameDisplay = document.querySelector(".endgame-display");
const displayText = document.querySelector(".display-text");
const possibleMoves = document.querySelectorAll(".bool-true");
// timer
const elapsedTimeText = document.getElementsByClassName("elapsed-time-text")[0];
let elapsedTimeIntervalRef;
let startTime;

// let affectedDiscsG;

//event listeners
const gameBoard = document.querySelector(".gameboard");
gameBoard.addEventListener("click", handleClick);

const resetGameButton = document.querySelector(".reset-game");
resetGameButton.addEventListener("click", resetGame);

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", startTimer);

const passButton = document.querySelector(".pass");
// passButton.addEventListener("click", passCounter);
passButton.addEventListener("click", validatePass);

const rulesPage = document.querySelector(".rules-page");
const rulesButton = document.querySelector(".rules");
rulesButton.addEventListener("click", displayRulesPage);

//states
let gameBoardInterface = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let whiteScore = 0;
let blackScore = 0;
let turn = white.val;

function keepScore() {
  let whiteCount = 0;
  let blackCount = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (column = 0; column < gameBoardInterface.length; column++) {
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
function resetPossibleMoves() {
  let list = [];
  document.querySelectorAll(".bool-true").forEach(function (div) {
    list.push(div);
  });
  list.forEach(function (div) {
    document.getElementById(`${div.id}`).style.opacity = "1";
  });
}
function switchTurns() {
  turn === white.val ? (turn = black.val) : (turn = white.val);
  resetPossibleMoves();
}
function showPossibleMoves() {
  let countPossibleMoves = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (col = 0; col < gameBoardInterface.length; col++) {
      if (canClickSpot(row, col) && gameBoardInterface[row][col] == 0) {
        let possibleMoves = document.querySelector(`#data-${row}${col}`);
        possibleMoves.style.opacity = "0.7";
        possibleMoves.classList.add("bool-true");
        countPossibleMoves++;
      }
    }
  }
  // validatePass(countPossibleMoves);
}

// // adapted timer function from https://ralzohairi.medium.com/displaying-dynamic-elapsed-time-in-javascript-260fa0e95049
function startTimer() {
  setStartTime();
  // Every second
  elapsedTimeIntervalRef = setInterval(() => {
    // Compute the elapsed time & display
    //pass the actual record start time
    elapsedTimeText.innerText = timeAndDateHandling.getElapsedTime(startTime);
  }, 1000);
}
function setStartTime() {
  startTime = new Date();
}
function resetStopwatch() {
  // Clear interval
  if (typeof elapsedTimeIntervalRef !== "undefined" || endGame() === true) {
    clearInterval(elapsedTimeIntervalRef);
    elapsedTimeIntervalRef = undefined;
  }

  // Reset elapsed time text
  elapsedTimeText.innerText = "00:00";
}
var timeAndDateHandling = {
  /** Computes the elapsed time since the moment the function is called in the format mm:ss or hh:mm:ss
   * @param {String} startTime - start time to compute the elapsed time since
   * @returns {String} elapsed time in mm:ss format or hh:mm:ss format if elapsed hours are 0.
   */
  getElapsedTime: function (startTime) {
    // Record end time
    let endTime = new Date();

    // Compute time difference in milliseconds
    let timeDiff = endTime.getTime() - startTime.getTime();

    // Convert time difference from milliseconds to seconds
    timeDiff = timeDiff / 1000;

    // Extract integer seconds that dont form a minute using %
    let seconds = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)

    // Pad seconds with a zero if neccessary
    let secondsAsString = seconds < 10 ? "0" + seconds : seconds + "";

    // Convert time difference from seconds to minutes using %
    timeDiff = Math.floor(timeDiff / 60);

    // Extract integer minutes that don't form an hour using %
    let minutes = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds

    // Pad minutes with a zero if neccessary
    let minutesAsString = minutes < 10 ? "0" + minutes : minutes + "";

    // Convert time difference from minutes to hours
    timeDiff = Math.floor(timeDiff / 60);

    // Extract integer hours that don't form a day using %
    let hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds

    // Convert time difference from hours to days
    timeDiff = Math.floor(timeDiff / 24);

    // The rest of timeDiff is number of days
    let days = timeDiff;

    let totalHours = hours + days * 24; // add days to hours
    let totalHoursAsString =
      totalHours < 10 ? "0" + totalHours : totalHours + "";

    if (totalHoursAsString === "00") {
      return minutesAsString + ":" + secondsAsString;
    } else {
      return totalHoursAsString + ":" + minutesAsString + ":" + secondsAsString;
    }
  },
};
// // end of timer function

//initialize game
window.onload = function () {
  createHTMLBoard();
  renderBoard();
};
function createHTMLBoard(row = 8, col = 8) {
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

function renderBoard() {
  let boxIdx = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];
      let boxElement = document.getElementsByClassName("box")[boxIdx];

      if (valueAtGBI === 1) {
        boxElement.innerHTML = "&#9898";
      } else if (valueAtGBI === 2) {
        boxElement.innerHTML = "&#9899";
      }
      boxIdx++;
    }
  }
  if (turn === white.val) {
    displayTurn.textContent = `It's ${white.name}'s turn!`;
    blackDiscScore.style.boxShadow = "none";
    whiteDiscScore.style.boxShadow = "0 0 40px 20px #FFD700";
  } else {
    displayTurn.textContent = `It's ${black.name}'s turn!`;
    whiteDiscScore.style.boxShadow = "none";
    blackDiscScore.style.boxShadow = "0 0 40px 20px #FFD700";
  }
  keepScore();
  if (endGame() === true) {
    endGameDisplay.style.display = "flex";
    whiteScore === blackScore
      ? (displayText.innerHTML = `It's a tie! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
          startTime
        )} 
      `)
      : whiteScore > blackScore
      ? (displayText.innerHTML = `${
          white.name
        } wins! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
          startTime
        )}`)
      : (displayText.innerHTML = `${
          black.name
        } wins! <br> Game Duration: ${timeAndDateHandling.getElapsedTime(
          startTime
        )}`);
    resetStopwatch();
  }
  showPossibleMoves();
}

//helper functions
function validatePass() {
  // if (affectedDiscsG !== 0) {
  switchTurns();
  resetPossibleMoves();
  renderBoard();
  // } else {
  //   console.log("theres still moves left!");

  //   return;
  // }
}

function getRowCol(boxEl) {
  let rowCol = boxEl.id.replace("data-", "");
  let row = parseInt(rowCol[0]);
  let col = parseInt(rowCol[1]);
  return [row, col];
}
function canClickSpot(row, col) {
  // let clickableBoxes = -1;
  let affectedDiscs = getAffectedDiscs(row, col);
  if (affectedDiscs.length == 0 && gameBoardInterface[row][col] === 0) {
    return false;
  } else {
    // clickableBoxes++;
    // console.log(clickableBoxes);
    return true;
  }
}
// functions

function handleClick(evt) {
  const boxEl = evt.target;
  const [row, col] = getRowCol(boxEl);
  if (gameBoardInterface[row][col] !== 0) {
  } else if (canClickSpot(row, col) == true) {
    let affectedDiscs = getAffectedDiscs(row, col);
    flipDiscs(affectedDiscs);
    gameBoardInterface[row][col] = turn;
    switchTurns();
    renderBoard();
  }
}

function getAffectedDiscs(row, col) {
  //check to the right of click
  let affectedDiscs = [];
  var couldBeAffected = [];

  var columnIterator = col;
  while (columnIterator < 8) {
    columnIterator++;
    let adjacentValues = gameBoardInterface[row][columnIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: row, col: columnIterator };
      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  // check to the left
  var couldBeAffected = [];
  var columnIterator = col;
  while (columnIterator > 0) {
    columnIterator--;
    let adjacentValues = gameBoardInterface[row][columnIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: row, col: columnIterator };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  //check up
  var couldBeAffected = [];
  var rowIterator = row;
  while (rowIterator > 0) {
    rowIterator--;
    let adjacentValues = gameBoardInterface[rowIterator][col];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: col };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  //check down
  var couldBeAffected = [];
  var rowIterator = row;
  while (rowIterator < 7) {
    rowIterator++;
    let adjacentValues = gameBoardInterface[rowIterator][col];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: col };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  // diagonal (down-right) -- row and col need to be iterators
  var couldBeAffected = [];
  var rowIterator = row;
  var colIterator = col;
  while (rowIterator < 7 && colIterator < 7) {
    rowIterator++;
    colIterator++;
    let adjacentValues = gameBoardInterface[rowIterator][colIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: colIterator };
      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  // diagonal (down-left)
  var couldBeAffected = [];
  var rowIterator = row;
  var colIterator = col;
  while (rowIterator < 7 && colIterator > 0) {
    rowIterator++;
    colIterator--;
    let adjacentValues = gameBoardInterface[rowIterator][colIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: colIterator };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  // diagonal (up-left)
  var couldBeAffected = [];
  var rowIterator = row;
  var colIterator = col;
  while (rowIterator > 0 && colIterator > 0) {
    rowIterator--;
    colIterator--;
    let adjacentValues = gameBoardInterface[rowIterator][colIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: colIterator };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }

  // diagonal (up-right)
  var couldBeAffected = [];
  var rowIterator = row;
  var colIterator = col;
  while (rowIterator > 0 && colIterator < 7) {
    rowIterator--;
    colIterator++;
    let adjacentValues = gameBoardInterface[rowIterator][colIterator];
    //if value at spot is 0 or turn's colour, then stop moving right
    if (adjacentValues == 0 || adjacentValues == turn) {
      //before we break out of loop, add to affectedDiscs to be flipped
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      // if the adjacentValues is opposite colour and it's not a 0, then add to couldBeAffected
      let adjacentValuesboxElement = { row: rowIterator, col: colIterator };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  return affectedDiscs;
}

function flipDiscs(affectedDiscs) {
  for (let i = 0; i < affectedDiscs.length; i++) {
    let toBeFlipped = affectedDiscs[i];
    if (gameBoardInterface[toBeFlipped.row][toBeFlipped.col] == 1) {
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 2;
    } else {
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 1;
    }
  }
}

function resetGame() {
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
}
function endGame() {
  let gameboardValues = [];
  gameBoardInterface.forEach(function (arr) {
    for (i = 0; i < arr.length; i++) {
      gameboardValues.push(arr[i]);
    }
  });
  if (
    gameboardValues.indexOf(0) == -1 ||
    gameboardValues.indexOf(1) == -1 ||
    gameboardValues.indexOf(2) == -1
  ) {
    return true;
  } else {
    return false;
  }
}

function displayRulesPage() {
  rulesPage.style.display === "none"
    ? (rulesPage.style.display = "initial")
    : (rulesPage.style.display = "none");
}

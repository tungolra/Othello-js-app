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

//event listeners
const gameBoard = document.querySelector(".gameboard");
gameBoard.addEventListener("click", handleClick);

const resetGameButton = document.querySelector(".reset-game");
resetGameButton.addEventListener("click", resetGame);

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", resetGame);

const passButton = document.querySelector(".pass1");
passButton.addEventListener("click", passCounter);

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
function switchTurns() {
  turn === white.val ? (turn = black.val) : (turn = white.val);
}

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

      if (valueAtGBI === 0) {
      } else if (valueAtGBI === 1) {
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
    whiteScore > blackScore
      ? (displayText.textContent = `${white.name} wins!`)
      : (displayText.textContent = `${black.name} wins!`);
  }
  showPossibleMoves();
}

//helper functions
function passCounter() {
  switchTurns();
  renderBoard();
}
function getRowCol(boxEl) {
  let rowCol = boxEl.id.replace("data-", "");
  let row = parseInt(rowCol[0]);
  let col = parseInt(rowCol[1]);
  return [row, col];
}
function canClickSpot(row, col) {
  let affectedDiscs = getAffectedDiscs(row, col);

  if (affectedDiscs.length == 0) {
    return false;
  } else {
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
  if (gameboardValues.indexOf(0) == -1) {
    return true;
  } else {
    return false;
  }
}
function showPossibleMoves() {
  console.log(`i ran`);
  let playersPiece = turn.val;
  if (turn === black.val) {
    console.log(`black`);
    let whiteMoves = [];
    for (row = 0; row < gameBoardInterface.length; row++) {
      for (col = 0; col < gameBoardInterface.length; col++) {
        console.log(gameBoardInterface[row + 1][col]);
        // console.log(`i: ${gameBoardInterface[(row - 1)][(col - 1)]}`)
        if (
          gameBoardInterface[row][col] == 0 &&
          gameBoardInterface[row - 1][col - 1] !== playersPiece &&
          gameBoardInterface[row - 1][col - 1] !== 0
        ) {
          whiteMoves.push([row - 1][col - 1]);
        }
        console.log(whiteMoves);
      }
    }
  }
}

// function showPossibleMoves() {
//   let playersPiece = turn.val;
//   if (turn === white) {
//     let whiteMoves = []
//     for (row = 0; row < gameBoardInterface.length; row++) {
//       for (col = 0; col < gameBoardInterface.length; col++) {
//         let box = gameBoardInterface[row][col];
//         if (box === 0) {
//         }if (
//           (gameBoardInterface[row - 1][col - 1] !== playersPiece &&
//             gameBoardInterface[row - 1][col - 1] !== 0){
//               whiteMoves.push([row - 1][col - 1])
//             }
//           // (gameBoardInterface[row - 1][col] !== playersPiece &&
//           //   gameBoardInterface[row - 1][col] !== 0) ||
//           // (gameBoardInterface[row - 1][col + 1] !== playersPiece &&
//           //   gameBoardInterface[row - 1][col + 1] !== 0) ||
//           // (gameBoardInterface[row][col + 1] !== playersPiece &&
//           //   gameBoardInterface[row][col + 1] !== 0) ||
//           // (gameBoardInterface[row + 1][col + 1] !== playersPiece &&
//           //   gameBoardInterface[row + 1][col + 1] !== 0) ||
//           // (gameBoardInterface[row + 1][col] !== playersPiece &&
//           //   gameBoardInterface[row + 1][col] !== 0) ||
//           // (gameBoardInterface[row + 1][col - 1] !== playersPiece &&
//           //   gameBoardInterface[row + 1][col - 1] !== 0) ||
//           // (gameBoardInterface[row][col - 1] !== playersPiece &&
//           //   gameBoardInterface[row][col - 1] !== 0)

//           //have gameboardinterface[n][n] display on board
//         }

//         // starting at [0][0]

//         // if (gameBoardInterface[row][col] === adjacentPiece || gameBoardInterface[row][col + 1] === 0 || gameBoardInterface[row][col + 1] === 'undefined'){

//         // }
//       }
//     }
//   }

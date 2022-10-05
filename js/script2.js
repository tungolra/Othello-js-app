// constants

const white = 1;
const black = 2;
let turn = white;
const gameBoard = document.querySelector(".gameboard");
const boardLayer = document.querySelector(".boardLayer");
const boxes = document.querySelectorAll(".box");
gameBoard.addEventListener("click", handleClick);

//states
let whiteScore = 0;
let blackScore = 0;

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
window.onload = function () {
  createHTMLBoard();
  initializeBoard();
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

function initializeBoard() {
  let boxIdx = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];
      let boxElement = document.getElementsByClassName("box")[boxIdx];

      if (valueAtGBI === 0) {
      } else if (valueAtGBI === 1) {
        //change HTML to currentPlayer's value
        //
        createBoardPiece("white", boxElement);
      } else if (valueAtGBI === 2) {
        //change HTML to currentPlayer's value
        createBoardPiece("black", boxElement);
      }
      boxIdx++;
    }
  }
  keepScore();
}
function addToBoard(currentTurn, boxEl){
    //create HTML disc
    console.log(boxEl)
    if (currentTurn === white){
        createBoardPiece("white", boxEl)
    }
    if (currentTurn === black){
        createBoardPiece("black", boxEl)

    }
    switchTurns();
}
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
}

// functions
//when a box is clicked, create a disc in HTML
function createBoardPiece(colour, boxElement) {
  if (colour === "white") {
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.style.width = "45px";
    piece.style.height = "45px";
    piece.style.backgroundColor = "white";
    piece.style.borderRadius = "50%";
    boxElement.appendChild(piece);
  }
  if (colour === "black") {
    let piece = document.createElement("div");
    piece.style.width = "45px";
    piece.style.height = "45px";
    piece.style.backgroundColor = "black";
    piece.style.borderRadius = "50%";

    boxElement.appendChild(piece);
  }
}

function handleClick(evt) {
  //find out what was clicked
  const boxEl = evt.target;
  const [row, col] = getRowCol(boxEl);
  let currentTurn = turn
  if (gameBoardInterface[(row, col)] !== 0) {
  }
  if (canClickSpot(row, col) == true) {
    let affectedDiscs = getAffectedDiscs(row, col);
    addToBoard(currentTurn, boxEl);
    flipDiscs(affectedDiscs);
    gameBoardInterface[row][col] = turn;
    // switchTurns();
    // initializeBoard()
  }
}
function getRowCol(boxEl) {
  let rowCol = boxEl.id.replace("data-", "");
  let row = parseInt(rowCol[0]);
  let col = parseInt(rowCol[1]);
  return [row, col];
}
function switchTurns() {
  turn === white ? (turn = black) : (turn = white);
}

function canClickSpot(row, col) {
  let affectedDiscs = getAffectedDiscs(row, col);
  if (affectedDiscs.length == 0) {
    return false;
  } else {
    return true;
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
      //   if (adjacentValues == turn) {
      //     affectedDiscs = affectedDiscs.concat(couldBeAffected);
      //   }
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

    let row = toBeFlipped.row
    let col = toBeFlipped.col

    let removeOriginalPiece = document.querySelector(`#data-${row}${col}`);

    //   removeOriginalPiece.removeChild(toBeFlipped.firstElementChild);
    if (gameBoardInterface[toBeFlipped.row][toBeFlipped.col] == 1) {
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 2;
    } else {
    //   removeOriginalPiece.removeChild(toBeFlipped.firstElementChild);
      gameBoardInterface[toBeFlipped.row][toBeFlipped.col] = 1;
    }
  }
}

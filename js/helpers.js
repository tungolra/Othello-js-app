import { gameBoardInterface } from "./init.js";
import { countOfPossibleMoves, displayPrompt } from "./ux.js";

//constants
const playerOneName = document.querySelector(".player-one");
const playerTwoName = document.querySelector(".player-two");
const newNameOne = document.querySelector(".new-name-one");
playerOneName.addEventListener("click", changeName);

const newNameTwo = document.querySelector(".new-name-two");
playerTwoName.addEventListener("click", changeName);
export const white = { val: 1, name: "Player 1" };
export const black = { val: 2, name: "Player 2" };
export let turn = white.val;

//helpers
export function switchTurns() {
  turn === white.val ? (turn = black.val) : (turn = white.val);
  resetPossibleMoves();
}

export function validatePass() {
  if (countOfPossibleMoves == 0) {
    switchTurns();
    resetPossibleMoves();
    renderBoard();
  } else {
    turn === white.val
      ? (displayPrompt.innerText = `${white.name} can still go!`)
      : (displayPrompt.innerText = `${black.name} can still go!`);
  }
}

export function getRowCol(boxEl) {
  let rowCol = boxEl.id.replace("data-", "");
  let row = parseInt(rowCol[0]);
  let col = parseInt(rowCol[1]);
  return [row, col];
}

export function canClickSpot(row, col) {
  let affectedDiscs = getAffectedDiscs(row, col);
  if (affectedDiscs.length == 0 && gameBoardInterface[row][col] === 0) {
    return false;
  } else {
    return true;
  }
}

export function getAffectedDiscs(row, col) {
  let affectedDiscs = [];
  var couldBeAffected = [];
  var columnIterator = col;
  //check to the right
  while (columnIterator < 8) {
    columnIterator++;
    let adjacentValues = gameBoardInterface[row][columnIterator];
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      let adjacentValuesboxElement = { row: rowIterator, col: col };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  // diagonal (down-right)
  var couldBeAffected = [];
  var rowIterator = row;
  var colIterator = col;
  while (rowIterator < 7 && colIterator < 7) {
    rowIterator++;
    colIterator++;
    let adjacentValues = gameBoardInterface[rowIterator][colIterator];
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
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
    if (adjacentValues == 0 || adjacentValues == turn) {
      if (adjacentValues == turn) {
        affectedDiscs = affectedDiscs.concat(couldBeAffected);
      }
      break;
    } else {
      let adjacentValuesboxElement = { row: rowIterator, col: colIterator };

      couldBeAffected.push(adjacentValuesboxElement);
    }
  }
  return affectedDiscs;
}

export function resetPossibleMoves() {
  let list = [];
  document.querySelectorAll(".bool-true").forEach(function (div) {
    list.push(div);
  });
  list.forEach(function (div) {
    document.getElementById(`${div.id}`).style.opacity = "1";
  });
}
export function changeName(evt) {
  if (evt.target.id == "one") {
    newNameOne.style.display === "none"
      ? (newNameOne.style.display = "flex")
      : (newNameOne.style.display = "none");
    white.name = newNameOne.value;
    playerOneName.textContent = white.name;
  }
  if (evt.target.id == "two") {
    newNameTwo.style.display === "none"
      ? (newNameTwo.style.display = "flex")
      : (newNameTwo.style.display = "none");
    black.name = newNameTwo.value;
    playerTwoName.textContent = black.name;
  }
}


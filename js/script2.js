// constants

const white = 1;
const black = 2;
let turn = white;
const gameBoard = document.querySelector(".gameboard");
const boxes = document.querySelectorAll(".box");
gameBoard.addEventListener("click", handleClick);

// for (box = 0; box < boxes.length; box++){
//     boxes[box].setAttribute("addEventListener", "click", createDisc(parseInt(boxes[box].id))) //=> use this id (same as index of div to reference box clicked)
// }

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
window.onload = function () {
  createHTMLBoard();
  renderBoard();
};

function createHTMLBoard(col = 8, row = 8) {
  let counter = 0;
  for (let i = 0; i < row * col; i++) {
    let box = document.createElement("div");
    gameBoard.appendChild(box).className = "box";
  }
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j < 8; j++) {
      let boxId = document.querySelectorAll(".box")[counter];
      boxId.id = `data[${i}][${j}]`;
      counter++;
    }
  }
}

function renderBoard() {
  let boxIdx = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];
      let position = document.getElementsByClassName("box")[boxIdx];

      if (valueAtGBI === 0) {
      } else if (valueAtGBI === 1) {
        //change HTML to currentPlayer's value
        console.log(position, "test");
        position.textContent = white; // set textContent to style.backgroundcolor etc
        position.style.backgroundColor = "white";
        position.style.borderRadius = "50%";
      } else if (valueAtGBI === 2) {
        //change HTML to currentPlayer's value
        position.textContent = black;
        position.style.backgroundColor = "red";
        position.style.borderRadius = "50%";
      }
      boxIdx++;
    }
  }
}

//when a box is clicked, create a disc in HTML
function handleClick(evt) {
  //callback flipDiscs()
  //callback renderBoard()
  const boxEl = evt.target.id.replace("data", "");
  gameBoardInterface[boxEl] = turn;
  console.log(boxEl);
  console.log(gameBoardInterface[boxEl]);
  //   console.log(turn)
  //   console.log(gameBoardInterface)

  renderBoard();
  //find out what was clicked
  //   let boxClicked =
  // in the gameboardarray, set the value (1 or 2) on the board
  //     (boxEl.innerHTML = turn);
  //   let boxIdx = 0;
  //   for (row = 0; row < gameBoardInterface.length; row++) {
  //     for (column = 0; column < gameBoardInterface.length; column++) {
  //       let valueAtGBI = gameBoardInterface[row][column];
  //       if (valueAtGBI !== 0) {
  // turn === white ? turn = black : turn = white;
  //   }
  // }
  // boxIdx++;
  //   }
}

//     let discLayer = document.createElement("div")
//     for (let row = 0; row < 8; row ++){
//         for (let column = 0; column < 8; column++){
//             let valueAtGBI = gameBoardInterface[row][column]
//             // console.log(valueAtGBI)
//             if (valueAtGBI === 0){

//             }else if (valueAtGBI === 1){
//                 //populate HTML board white
//                 discLayer.innerHTML = 'W'
//                 let disc = document.getElementById(`${evt}`)
//                 disc.appendChild(discLayer)
//             }else if (valueAtGBI === 2){
//                 //populate HTML board black
//                 //htf?
//                 discLayer.innerHTML = 'B'
//                 let disc = document.getElementById(`${evt}`)
//                 disc.appendChild(discLayer)
//             }
//         }
//     }
//     discLayer.innerHTML = 'W'
//     let disc = document.getElementById(`${evt}`)
//     disc.appendChild(discLayer)

// }

// connect gameboard interface to gameboard HTML (render gameboard function)
//==> should populate 2's and 1's currently on board )
// for (let row = 0; row < 8; row ++){
//     for (let column = 0; column < 8; column++){
//         let valueAtGBI = gameBoardInterface[row][column]
//         // console.log(valueAtGBI)
//         if (valueAtGBI === 0){

//         }else if (valueAtGBI === 1){
//             //populate HTML board white
//         }else if (valueAtGBI === 2){
//             //populate HTML board black
//             //htf?
//         }
//     }
// }

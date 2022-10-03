// constants

const white = 1;
const black = 2;
let turn = white;
const gameBoard = document.querySelector(".gameboard");
const boxes = document.querySelectorAll(".box");
gameBoard.addEventListener("click", handleClick)

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
  for (box = 0; box < boxes.length; box++) {
    boxes[box].innerHTML = "";
    boxes[box].id = box;
  }
  renderBoard();
};

function renderBoard() {
  let boxIdx = 0;
  for (row = 0; row < gameBoardInterface.length; row++) {
    for (column = 0; column < gameBoardInterface.length; column++) {
      let valueAtGBI = gameBoardInterface[row][column];
      if (valueAtGBI === 0) {
      } else if (valueAtGBI === 1) {
        //change HTML to currentPlayer's value
        boxes[boxIdx].textContent = white; // set textContent to style.backgroundcolor etc
        boxes[boxIdx].style.backgroundColor = 'white'
        boxes[boxIdx].style.borderRadius = '50%'
      } else if (valueAtGBI === 2) {
        //change HTML to currentPlayer's value
        boxes[boxIdx].textContent = black;
        boxes[boxIdx].style.backgroundColor = ''
        boxes[boxIdx].style.borderRadius = '50%'
      }
      boxIdx++;
    }
  }
}

//when a box is clicked, create a disc in HTML
function handleClick(evt) {
    //callback flipDiscs()
    //callback renderBoard()
    const boxEl = evt.target;
    //find out what was clicked
    let boxClicked = 
    // in the gameboardarray, set the value (1 or 2) on the board
  boxEl.innerHTML = turn;
  let boxIdx = 0;
  let valueAtGBI = gameBoardInterface[row][column];
  for (row = 0; row < gameBoardInterface.length; row++) {
      for (column = 0; column < gameBoardInterface.length; column++) {
          if (valueAtGBI !== 0){

              // turn === white ? turn = black : turn = white;
              }

          }
          boxIdx++
      }
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

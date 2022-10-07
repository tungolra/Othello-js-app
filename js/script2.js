
let playerOneName = document.querySelector('.player-one')
let playerTwoName = document.querySelector('.player-two')
playerOneName.addEventListener("click", triggerChangeName)
playerTwoName.addEventListener("click", triggerChangeName)

let text1 = document.querySelector('#change-name1')
let text2 = document.getElementById('#change-name2')
text1.addEventListener("keypress", changeName)
text2.addEventListener("keypress", changeName)


function triggerChangeName () {
    if (text1.style.display = "none"){
        text1.style.display = "block"
    }else {
        text1.style.display = "none"
    }

}
function changeName(){

}

const white = { val: 1, name: "Player 1" };
const black = { val: 2, name: "Player 2" };

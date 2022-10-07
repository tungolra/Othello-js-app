let white = { val: 1, name: "Player 1" };
let black = { val: 2, name: "Player 2" };

let newName = document.querySelector(".new-name");
let playerOneName = document.querySelector(".player-one");


playerOneName.addEventListener("click", changeName);

function changeName() {
  newName.style.display === "none"
    ? (newName.style.display = "flex")
    : (newName.style.display = "none");
  white.name = newName.value
  playerOneName.textContent = white.name
  console.log(white.name)
}

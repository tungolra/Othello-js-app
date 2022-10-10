# Othello

<img src="images/othello-img.png">

### Launch Game
https://tungolra.github.io/Othello/

### Introduction

Othello is a strategy-based game held on a 8x8 grid. The objective is to have the most discs on the board by the end of the game. Players alternate turns by placing a game piece in a position where it is adjacent to their opponents piece and connects to their own piece on the other side of their opponent's piece. The game ends either when the board is filled, when neither player has any possible moves, or when either player completely overtakes the board with their pieces. 

The game begins once "Start Game" is clicked. The number of pieces on the board for each player is dynamically displayed. On the board, boxes are highlight to show possible moves. There is a display below the board that prompts whose turn it is. This is also indicated by placing a box-shadow behind the respective player's scoreboard on their turn. Additionally, the gameboard itself changes it's colour to white or black depending on whose turn it is. 

Players have the option to change their name at any point in the game by clicking on their namebox. 

Players can also pass on their turn if there are no possible moves. The display prompt will prompt the player that they can still go if they attempt to pass. 

Players also have the option to Reset the game (for when the player is facing themselves or an AI), or to forfeit the game (to be used for online multiplayer matches) which will count the pieces on the board and display who won. A win is the result of either player having more points than their opponent. A tie can occur when both players have the same score by the end of the game. 

Players can also toggle the Rules button for a brief overview of how the game works. 


### Building Othello 

##### HTML:

- [ ] header container
  - [ ] title of game
  - [ ] game timer
- [ ] options container
  - [ ] reset game, forfeit game, pass, rules buttons
- [ ] gameboard container
  - [ ] player 1/2 container
    - [ ] player name input
    - [ ] player score div
  - [ ] display prompt div
- [ ] footer container
  - [ ] have link to github repo 
  - [ ] author div
##### CSS 
- [ ] flexbox structure

##### JS:
- Constants
  - [ ] have array interface for board
  - [ ] player1/2 score selector
  - [ ] selector for display prompt
  - [ ]
  - [ ]
  - [ ]

- Event Listeners
  - [ ] add listener when each box in the HTML is clicked
  - [ ] add new game function for when game ends
  - [ ] add function to toggle rules page
  - [ ] 
  - [ ]
  - [ ]
  - [ ]

- States
  - [ ] gameboard interface with middle 4 pieces filled
  - [ ] score for white piece/score for black piece
  - [ ] set turn to white piece
  - [ ] endgame display selector
  - [ ] selector for boxes with possible move class added

- Initialize game
  - [ ] Populate gameboard div with 64 divs to render HTML board
    - [ ] give each box a class name of box and id of 'data-[div#]'
  - [ ] onload function to create HTML board and initialize board
  - [ ] initialize board to add prefilled pieces to HTML board by scanning for values != 0

- Functions
  - [ ] create handleClick function
    - [ ] pass event as parameter, parse box id with getRowCol function
    - [ ] should only change values in gameboard interface (GBI) if the value in GBI is 0 & if it's a valid move 
  - [ ] create canClickSpot helper function; create getAffectedDiscs helper function
  - [ ]
  - [ ]
  - [ ]
  - [ ]
  - [ ]
  - [ ]
  - [ ]
  - [ ]
  - [ ]

- Helper Functions
  - [ ] getRowCol function to yield array position relative to gameboard interface
  - [ ] canClickSpot function to determine if the box selection is a possible move, returns boolean; calls on getAffectedDiscs helper function
  - [ ] getAffectedDiscs function 
  - [ ] validate pass function 



##### JS Features
- [ ] highlight possible moves on board
- [ ] add forfeit button 
- [ ] add change name option 
- [ ] add timer 
- [ ] add reset game function



- [x] 
- [ ] Moves:
  - [ ] Each piece played must be laid adjacent to an opponent's piece
  - [ ] so that the opponent's piece or a row of opponent's pieces is flanked by the new piece and another piece of the player's colour.
- [ ] Move responses:
  - [ ] all the pieces in all viable directions are turned over.
- [x] winning condition:
  - [x] The goal for each player is to make pieces of their colour constitute a majority of the pieces on the board at the end of the game, by turning over as many of their opponent's pieces as possible.
  - [x] The game is over when neither player has a legal move (i.e. a move that captures at least one opposing piece) or when the board is full.

functions

- [ ] initialize function to set first four pieces on board in the array
- [ ] handleClick function to:
  - [ ] possible moves in the array
    - [ ] boxes not clicked && selection is adjacent to opponent's piece
  - [ ] switch players
  - [ ] value of tokens must change
- [ ] check status function
  - [ ] runs every single play to see if there's no more options
  - [ ] or if board is filled

next steps

- [ ] Readme.md
  - [ ] edit pseudocode
- [ ] JS

  - [x] add scoreboard
  - [x] make visible possible moves
  - [x] display turn
  - [x] add pass function
    - [x] turn display should change
    - [x] should only be able to pass if no possible moves available
  - [x] add reset game function (to go in game results display)
  - [x] add endgame function
  - [x] allow players to change name
  - [ ] streamline getAffectedDiscs function
  - [x] replace reset game with forfeit game
  - [ ] disable event listeners on game end / enable event listens on game start

- [ ] CSS

  - [x] add header
  - [x] center board
  - [ ] change cursor at turn
  - [x] add pop up text for rules
  - [ ] make mobile-friendly/ redo css with mobile-first approach

- [ ] HTML

  - [x] static button to start new game (calls on reset game function)
  - [x] button to reset game
  - [x] scoreboard div
  - [x] add rules text
  - [x] add footer
  - [x] button for pass function
  - [x] add display board for game results
  - [x] add github link
  - [ ] add linkedin link

- [ ] Extras
  - [x] animate flipping of discs
  - [x] option to add own name
  - [ ] option to choose avatar
  - [ ] add fullscreen option
  - [ ] add AI
  - [x] display timer
  - [x] set up github page

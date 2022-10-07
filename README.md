# Othello

Board:
HTML:

- [x] eight-by-eight square grid
  JS:
- [x] have array interface for board
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
    - [ ] should only be able to pass if no possible moves available
  - [x] add reset game function (to go in game results display)
  - [x] add endgame function
  - [ ] allow players to change name
  - [ ] streamline getAffectedDiscs function

- [ ] CSS

  - [x] add header
  - [x] center board
  - [ ] change cursor at turn
  - [x] add pop up text for rules

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
- [ ] animate flipping of discs
- [ ] option to add own name
- [ ] option to choose avatar
- [ ] add fullscreen option
- [ ] add AI 
- [ ] display timer



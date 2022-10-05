# Othello

Board:
HTML:

- eight-by-eight square grid
  JS:
- have array interface for board
  Rules
- Moves:
  - Each piece played must be laid adjacent to an opponent's piece
  - so that the opponent's piece or a row of opponent's pieces is flanked by the new piece and another piece of the player's colour.
- Move responses:
  - all the pieces in all viable directions are turned over.
- winning condition:
  - The goal for each player is to make pieces of their colour constitute a majority of the pieces on the board at the end of the game, by turning over as many of their opponent's pieces as possible.
  - The game is over when neither player has a legal move (i.e. a move that captures at least one opposing piece) or when the board is full.

functions

- initialize function to set first four pieces on board in the array
- handleClick function to:
  - possible moves in the array
    - boxes not clicked && selection is adjacent to opponent's piece
    -
  - switch players
  - value of tokens must change
- check status function
  - runs every single play to see if there's no more options
  - or if board is filled

next steps

- ReadMe

  - add pseudocode

- JS

  - add scoreboard
  - make visible possible moves
  - display turn
  - add pass function
  - add reset game function (to go in game results display)

- CSS

  - add header
  - center board

- HTML

  - static button to start new game (calls on reset game function)
  - button to reset game
  - scoreboard div
  - add rules page
  - add footer
  - add link to github
  - button for pass function
  - add display board for game results

- Extras
- animate flipping of discs
- option to add own name
- option to choose avatar
- add fullscreen option

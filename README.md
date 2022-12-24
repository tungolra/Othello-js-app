# Othello

<img src="images/othello-img.png">

### Launch Game
https://tungolra.github.io/Othello/

### About 

This application was built in 7 days, completed in Sep 2022. Being my very first project with General Assembly, I built this browser-based game using a simple webstack with JavaScript, CSS, and HTML. The purpose of this assignment was to familiarize with callback functions, DOM manipulation, functional programming, and applying pure CSS techniques. 

### Reflections
3 months after completing this project, there are many things I'd do differently. 

First, I would modularize my JS files through ES6 and babel-loader. I'd create separate files for my main functions that run the game, helper functions, and event listeners/constants. 

Second, I'd build the app with a mobile-first approach. Having initially styled the app for desktop, the process became convoluted when making it responsive for mobile and tablet views. 

Third, I'd build the app from a TDD approach. There were many times I would create a new UX function that would crash the game. Manually tracing the errors was time-consuming and arduous. For a beginner programmer, applying these practices ahead of time would likely have aided in my learning, rather than being stuck on preventable, minute problems. That said, it was an experience that had good take-aways. 

### Introduction

Othello is a strategy-based game held on a 8x8 grid. The objective is to have the most discs on the board by the end of the game. Players alternate turns by placing a game piece in a position where it is adjacent to their opponents piece and connects to their own piece on the other side of their opponent's piece. The game ends either when the board is filled, when neither player has any possible moves, or when either player completely overtakes the board with their pieces. 

The game begins once "Start Game" is clicked. The number of pieces on the board for each player is dynamically displayed. On the board, boxes are highlight to show possible moves. There is a display below the board that prompts whose turn it is. This is also indicated by placing a box-shadow behind the respective player's scoreboard on their turn. Additionally, the gameboard itself changes it's colour to white or black depending on whose turn it is. 

Players have the option to change their name at any point in the game by clicking on their namebox. 

Players can also pass on their turn if there are no possible moves. The display prompt will prompt the player that they can still go if they attempt to pass. 

Players also have the option to Reset the game (for when the player is facing themselves or an AI), or to forfeit the game (to be used for online multiplayer matches) which will count the pieces on the board and display who won. A win is the result of either player having more points than their opponent. A tie can occur when both players have the same score by the end of the game. 

Players can also toggle the Rules button for a brief overview of how the game works. 

### Technologies
- JavaScript
- HTML 
- CSS 

### Contact

Ralph Tungol [rarttungol@gmail.com]()
Project Link: [Ralph Tungol Portfolio](https://ralphtungol.herokuapp.com/)
Repo: [GitHub](https://github.com/tungolra/portfolio)
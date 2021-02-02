// 2D Array Assignment (Tic-Tac-Toe Game)
// Jinny Kim
// 01. 27. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//NOTE TO SELF: 
//NEXT THINGS TO WORK ON: //FIX THE VICTORY SCREENS????????????
//                        -talley scores
//                        -UI (menu, buttons, particular victory screens)
//                        -add music + sound effects



//GLOBAL VARIABLES
let grid;
let rows, cols, cellSize;
let xImg, oImg, victoryScreenImg;

let yourTurn;
let waitTime = 2000;
let lastSwitchTime = 0;

let randomX, randomY;
let blanks;
let victoryScreen, otherVictoryScreenImg, drawScreenImg;

let gameMode;

//PRELOAD + SETUP
function preload() {
  xImg = loadImage("assets/x.png");
  oImg = loadImage("assets/o.png");

  victoryScreenImg = loadImage("assets/tempVictory.png");
  otherVictoryScreenImg = loadImage("assets/otherVictoryTemp.png");
  drawScreenImg = loadImage("assets/tempDraw.png");

}

function setup() {
  //makes sure canvas is square no matter the window's dimensions
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }
  
  grid = createEmptyBoard();
  
  rows = grid.length;
  cols = grid[0].length;
  cellSize = width / cols;
  
  victoryScreen = false;
  yourTurn = true;

  blanks = 9;
}

//INTERACTIVE CONTROLS
function keyPressed() {
  if (key === "1") {
    gameMode = "comp";
  }
  if (key === "2") {
    gameMode = "pvp";
  }
  if (key === "c") {
    setup();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  if (yourTurn && grid[y][x] === 0) { //o
    grid[y][x] = 2;
    yourTurn = !yourTurn;
    lastSwitchTime = millis();
  
  }
  if (gameMode === "pvp" && !yourTurn && grid[y][x] === 0) {
    grid[y][x] = 1;
    yourTurn = !yourTurn;
  }

  blanks--;

}

//FUNCTIONS FOR THE BOARD ITSELF
function createEmptyBoard() {
  let emptyBoard = [];
  
  for (let y = 0; y < 3; y++) {
    emptyBoard.push([]);
    for (let x = 0; x < 3; x++) {
      emptyBoard[y].push(0);
    }
  }
  return emptyBoard;
}

function displayBoard() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
        rect(x*cellSize, y*cellSize, cellSize, cellSize); //blank space
      }
      else if (grid[y][x] === 1) {
        image(xImg, x*cellSize, y*cellSize, cellSize, cellSize); //X
      }
      else if (grid[y][x] === 2) {
        image(oImg, x*cellSize, y*cellSize, cellSize, cellSize); //O
      }
    }
  }
}

//FUNCTIONS CONTROLLING COMPUTER PLAYER
function computerTurn() {
  if (gameMode === "comp" && yourTurn === false && millis() - lastSwitchTime > waitTime) {
    randomX = int(random(3));
    randomY = int(random(3));

    //place X where COMPUTER might win (prioritize its own victory)
    if (grid[0][0] === 1 && grid[0][1] === 1 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }
    else if (grid[0][0] === 1 && grid[0][2] === 1 && grid[0][1] === 0) {
      grid[0][1] = 1;
    }
    else if (grid[0][1] === 1 && grid[0][2] === 1 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //middle row-- across
    else if (grid[1][0] === 1 && grid[1][1] === 1 && grid[1][2] === 0) {
      grid[1][2] = 1;
    }
    else if (grid[1][0] === 1 && grid[1][2] === 1 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 1 && grid[1][2] === 1 && grid[1][0] === 0) {
      grid[1][0] = 1;
    }

    //bottom row-- across
    else if (grid[2][0] === 1 && grid[2][1] === 1 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[2][0] === 1 && grid[2][2] === 1 && grid[2][1] === 0) {
      grid[2][1] = 1;
    }
    else if (grid[2][1] === 1 && grid[2][2] === 1 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }

    //1st column-- down
    else if (grid[0][0] === 1 && grid[1][0] === 1 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }
    else if (grid[0][0] === 1 && grid[2][0] === 1 && grid[1][0] === 0) {
      grid[1][0] = 1;
    }
    else if (grid[1][0] === 1 && grid[2][0] === 1 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //2nd column-- down
    else if (grid[0][1] === 1 && grid[1][1] === 1 && grid[2][1] === 0) {
      grid[2][1] = 1;
    }
    else if (grid[0][1] === 1 && grid[2][1] === 1 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 1 && grid[2][1] === 1 && grid[0][1] === 0) {
      grid[0][1] = 1;
    }

    //3rd column-- down
    else if (grid[0][2] === 1 && grid[1][2] === 1 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[0][2] === 1 && grid[2][2] === 1 && grid[1][2] === 0) {
      grid[1][2] = 1;
    }
    else if (grid[1][2] === 1 && grid[2][2] === 1 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }

    //top left to bottom right diagonal
    else if (grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[0][0] === 1 && grid[2][2] === 1 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 1 && grid[2][2] === 1 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //top right to bottom left diagonal
    else if (grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }
    else if (grid[0][2] === 1 && grid[2][0] === 1 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[2][0] === 1 && grid[1][1] === 1 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }

    //place X where PLAYER might win
    //top row-- across
    else if (grid[0][0] === 2 && grid[0][1] === 2 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }
    else if (grid[0][0] === 2 && grid[0][2] === 2 && grid[0][1] === 0) {
      grid[0][1] = 1;
    }
    else if (grid[0][1] === 2 && grid[0][2] === 2 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //middle row-- across
    else if (grid[1][0] === 2 && grid[1][1] === 2 && grid[1][2] === 0) {
      grid[1][2] = 1;
    }
    else if (grid[1][0] === 2 && grid[1][2] === 2 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 2 && grid[1][2] === 2 && grid[1][0] === 0) {
      grid[1][0] = 1;
    }

    //bottom row-- across
    else if (grid[2][0] === 2 && grid[2][1] === 2 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[2][0] === 2 && grid[2][2] === 2 && grid[2][1] === 0) {
      grid[2][1] = 1;
    }
    else if (grid[2][1] === 2 && grid[2][2] === 2 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }

    //1st column-- down
    else if (grid[0][0] === 2 && grid[1][0] === 2 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }
    else if (grid[0][0] === 2 && grid[2][0] === 2 && grid[1][0] === 0) {
      grid[1][0] = 1;
    }
    else if (grid[1][0] === 2 && grid[2][0] === 2 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //2nd column-- down
    else if (grid[0][1] === 2 && grid[1][1] === 2 && grid[2][1] === 0) {
      grid[2][1] = 1;
    }
    else if (grid[0][1] === 2 && grid[2][1] === 2 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 2 && grid[2][1] === 2 && grid[0][1] === 0) {
      grid[0][1] = 1;
    }

    //3rd column-- down
    else if (grid[0][2] === 2 && grid[1][2] === 2 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[0][2] === 2 && grid[2][2] === 2 && grid[1][2] === 0) {
      grid[1][2] = 1;
    }
    else if (grid[1][2] === 2 && grid[2][2] === 2 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }

    //top left to bottom right diagonal
    else if (grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 0) {
      grid[2][2] = 1;
    }
    else if (grid[0][0] === 2 && grid[2][2] === 2 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[1][1] === 2 && grid[2][2] === 2 && grid[0][0] === 0) {
      grid[0][0] = 1;
    }

    //top right to bottom left diagonal
    else if (grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 0) {
      grid[2][0] = 1;
    }
    else if (grid[0][2] === 2 && grid[2][0] === 2 && grid[1][1] === 0) {
      grid[1][1] = 1;
    }
    else if (grid[2][0] === 2 && grid[1][1] === 2 && grid[0][2] === 0) {
      grid[0][2] = 1;
    }

    //random placing
    else {
      while (grid[randomY][randomX] !== 0) {
        randomX = int(random(3));
        randomY = int(random(3));
      }
      if (grid[randomY][randomX] === 0) {
        grid[randomY][randomX] = 1;
      }
    }

    blanks--;
    yourTurn = !yourTurn;
  }
}


//VICTORY CONDITIONS
function winCheck(oOrX, whoseVictory) {
  
  //across, down, zigzag from top left
  if (grid[0][0] === oOrX && grid[0][0] === grid[0][1] && grid[0][0] === grid[0][2]) {
    victoryScreen = whoseVictory;
  }
  else if (grid[0][0] === oOrX && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    victoryScreen = whoseVictory;
  }
  else if (grid[0][0] === oOrX && grid[0][0] === grid[1][0] && grid[0][0] === grid[2][0]) {
    victoryScreen = whoseVictory;
  }
  
  //across horizontal middle
  else if (grid[1][0] === oOrX && grid[1][0] === grid[1][1] && grid[1][0] === grid[1][2]) { 
    victoryScreen = whoseVictory;
  }
  
  //down vertical middle
  else if (grid[0][1] === oOrX && grid[0][1] === grid[1][1] && grid[0][1] === grid[2][1]) {
    victoryScreen = whoseVictory;
  }
  
  //down vertical right
  else if (grid[0][2] === oOrX && grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2]) {
    victoryScreen = whoseVictory;
  }
  
  //across, zigzag from bottom left
  else if (grid[2][0] === oOrX && grid[2][0] === grid[2][1] && grid[2][0] === grid[2][2]) {
    victoryScreen = whoseVictory;
  }
  else if (grid[2][0] === oOrX && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    victoryScreen = whoseVictory;
  }

  else if (noBlanks()) {
    victoryScreen = "draw";
  }


}

//DISPLAY UI
function displayVictoryScreen() {
  if (victoryScreen === "other player win") { 
    image(otherVictoryScreenImg, 0, 0, width, height); //other player win!
  }
  else if (victoryScreen === "main player win") {
    image(victoryScreenImg, 0, 0, width, height); //main player win!
  }
  else if (victoryScreen === "draw") {
    image(drawScreenImg, 0, 0, width, height); //draw screen
  }
}

function noBlanks() {
  return blanks === 0;
}

//DRAW LOOP (PUT EVERYTHING TOGETHER!)
function draw() {
  background("white");
  computerTurn();
  displayBoard();
  winCheck(1, "other player win");
  winCheck(2, "main player win");
  displayVictoryScreen();
}
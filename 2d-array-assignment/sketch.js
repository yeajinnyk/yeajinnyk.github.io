// 2D Array Assignment (Tic-Tac-Toe Game)
// Jinny Kim
// 01. 27. 2021
//
// Extra:
// - added sound, UI, slightly smart computer player, a portion of code 
//  to keep the canvas square, added a slight delay before computer
//  makes decision to make it look less rushed and instant.


//NOTE TO SELF: 
//NEXT THINGS TO WORK ON: 
//                        -talley scores?
//                        -UI (menu, buttons, particular victory screens)



//GLOBAL VARIABLES
let grid;
let rows, cols, cellSize;
let xImg, oImg;
let victoryScreen, victoryScreenImg, otherVictoryScreenImg, drawScreenImg;

let yourTurn;
let waitTime = 2000;
let lastSwitchTime = 0;

let randomX, randomY;
let blanks; //to count how many tiles are empty (for a draw situation)

let bgMusic, playerClick, otherClick;

let gameMode; //pvp or player vs comp

//PRELOAD + SETUP
function preload() {
  //sound preload
  bgMusic = loadSound("assets/bgMusic.ogg");
  playerClick = loadSound("assets/playerSound.wav");
  otherClick = loadSound("assets/otherPlayerSound.wav");

  //X and O image preload
  xImg = loadImage("assets/x.png");
  oImg = loadImage("assets/o.png");

  //end game screen image preload
  victoryScreenImg = loadImage("assets/tempVictory.png");
  otherVictoryScreenImg = loadImage("assets/otherVictoryTemp.png");
  drawScreenImg = loadImage("assets/tempDraw.png");

}

function setup() {
  bgMusic.stop(); //put stop at the beginning so when setup is called again, the songs don't layer on top
  bgMusic.loop();

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
    playerClick.play();

    grid[y][x] = 2;
    yourTurn = !yourTurn;
    lastSwitchTime = millis();
  
  }
  if (gameMode === "pvp" && !yourTurn && grid[y][x] === 0) {
    otherClick.play();

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
    otherClick.play();
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

  //no one wins
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

//if all tiles are filled, return true
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
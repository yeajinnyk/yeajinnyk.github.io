// 2D Array Assignment
// Jinny Kim
// 01. 27. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//global variables
let grid;
let rows, cols, cellSize;
let xImg, oImg, victoryScreenImg;

let yourTurn;
let waitTime = 2000;
let lastSwitchTime = 0;

let computerFirstTurn;
let victoryScreen;

let gameMode;


function preload() {
  xImg = loadImage("assets/x.png");
  oImg = loadImage("assets/o.png");
  victoryScreenImg = loadImage("assets/tempVictory.png");
}

function setup() {
  //make sure canvas is square no matter the window's dimensions
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
}

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

function draw() {
  background("white");
  computerTurn();
  displayBoard();
  winCheck();
  displayVictoryScreen();
}

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

}

function computerTurn() {
  if (gameMode === "comp" && yourTurn === false && millis() - lastSwitchTime > waitTime) {
    //computer takes its turn

    console.log("x");
    yourTurn = !yourTurn;
  }
}

function winCheck() {

  //across, down, zigzag from top left
  if (grid[0][0] !== 0 && grid[0][0] === grid[0][1] && grid[0][0] === grid[0][2]) {
    victoryScreen = true;
  }
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    victoryScreen = true;
  }
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][0] && grid[0][0] === grid[2][0]) {
    victoryScreen = true;
  }

  //across horizontal middle
  if (grid[1][0] !== 0 && grid[1][0] === grid[1][1] && grid[1][0] === grid[1][2]) { 
    victoryScreen = true;
  }

  //down vertical middle
  if (grid[0][1] !== 0 && grid[0][1] === grid[1][1] && grid[0][1] === grid[2][1]) {
    victoryScreen = true;
  }

  //down vertical right
  if (grid[0][2] !== 0 && grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2]) {
    victoryScreen = true;
  }

  //across, zigzag from bottom left
  if (grid[2][0] !== 0 && grid[2][0] === grid[2][1] && grid[2][0] === grid[2][2]) {
    victoryScreen = true;
  }
  if (grid[2][0] !== 0 && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    victoryScreen = true;
  }
}

function displayVictoryScreen() {
  if (victoryScreen) {
    image(victoryScreenImg, 0, 0, width, height);
    
  }
}
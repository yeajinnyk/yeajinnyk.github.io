// 2D Array Assignment
// Jinny Kim
// 01. 27. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = createEmptyBoard();
let rows, cols, cellSize;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowWidth, windowHeight);
  }

  rows = grid.length;
  cols = grid[0].length;
}

function windowResized() {
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }
  else if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowWidth, windowHeight);
  }  
}

function draw() {
  background(220);
  displayBoard();
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
        console.log("O");
      }
      if (grid[y][x] === 1) {
        console.log("X");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
// Perlin Noise
// Jinny Kim
// 01. 20. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectHeights;
let bikeLocation = 0;
let generateHowMany = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectHeights = generateHeights();
}

function draw() {
  background(220);

  let howMany = width;
  
  for (let i = bikeLocation; i < bikeLocation + howMany; i++) {
    let rectWidth = width / howMany;
    rect(rectWidth * (i - bikeLocation), height - rectHeights[i], rectWidth, rectHeights[i]);
  }

  if (keyIsPressed) {
    if (key === "d") {
      bikeLocation += 5;
    }
    if (key === "a" && bikeLocation > 0) {
      bikeLocation -= 5;
    }
  }
  
}

function generateHeights() {
  let theHeights = [];
  for (let i = 0; i < generateHowMany; i++) {
    let rectHeight = noise(i * 0.001) * height; 
    theHeights.push(rectHeight);
  }
  return theHeights;
}
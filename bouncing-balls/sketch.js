// Bouncing Balls (Array Demo)
// Jinny Kim
// 01. 19. 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBouncingBalls = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  moveBall();
  displayBall();
}

function mousePressed() {
  let ball = {
    x: mouseX,
    y: mouseY,
    diameter: random(25, 100),
    dx: random(-5, 5),
    dy: (random -5, 5),
    theColor: color(random(255), random(255), random(255), random(255)), //4th value is opacity
  };
  theBouncingBalls.push(ball);
}

function moveBall() {
  for (let ball of theBouncingBalls) { //*** 
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    //check for bounce
    if (ball.x + ball.diameter/2 >= width ||
      ball.x - ball.diameter/2 <= 0) {
      ball.dx *= -1;
    }
    if (ball.y + ball.diameter/2 >= height ||
      ball.y - ball.diameter/2 <= 0) {
      ball.dy *= -1;
    }
  }
}

function displayBall() {
  for (let i = 0; i < theBouncingBalls.length; i++) { //***for loops can interchange. they do the same thing
    noStroke();
    fill(theBouncingBalls[i].theColor);
    ellipse(theBouncingBalls[i].x, theBouncingBalls[i].y, theBouncingBalls[i].diameter, theBouncingBalls[i].diameter);
  }
}

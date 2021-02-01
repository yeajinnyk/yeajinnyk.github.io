// OOP Walkers (Arrays)
// Jinny Kim
// 02. 01. 2021

let theWalkers = [];
let colorOptions = ["red", "orange", "yellow", "green", "blue", "cyan", "purple", "white", "pink"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

}

function draw() {
  for (let i = 0; i < theWalkers.length; i++) {
    theWalkers[i].move();
    theWalkers[i].display();
  }
}

function mousePressed() {
  let someWalker = new Walker(mouseX, mouseY, random(colorOptions));
  theWalkers.push(someWalker);
}

class Walker { //everything in a class is a function
  constructor(x, y, theColor) {
    this.x = x; //x value you passed in
    this.y = y; //y value you passed in
    this.color = theColor; //the color value you passed in
    this.speed = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 3, 3);
  }

  move() {
    let choice = random(100);

    if (choice < 25) {
      this.x += this.speed;
    }
    else if (choice < 50) {
      this.x -= this.speed;
    }
    else if (choice < 75) {
      this.y += this.speed;
    }
    else {
      this.y -= this.speed;
    }

  }
}
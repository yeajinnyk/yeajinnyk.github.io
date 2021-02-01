// OOP Walker
// Jinny Kim
// 02. 01. 2021

let amy, noah;

function setup() {
  createCanvas(windowWidth, windowHeight);
  amy = new Walker(width/2, height/2, "purple"); //new copy of object
  noah = new Walker(width/2, height/2, "green"); //when calling "new", you are calling "constructor"

  background("black");

}

function draw() {
  amy.move();
  noah.move();
  amy.display();
  noah.display();
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
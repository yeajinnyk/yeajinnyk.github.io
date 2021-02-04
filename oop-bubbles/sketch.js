// Bubble OOP Demo
// Jinny Kim
// 02. 04. 2021

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(spawnBubble, 500); //runs the function every 500 milliseconds (half a second)
}

function draw() {
  background("black");
  for (let i = theBubbles.length - 1; i >= 0; i--) {
    if (theBubbles[i].isPopped) {
      theBubbles.splice(i, 1);
    }
    else {
      theBubbles[i].move();
      theBubbles[i].display();
    }
    
  }
}

function spawnBubble() {
  let someBubble = new Bubble();
  theBubbles.push(someBubble);

}

class Bubble {
  constructor() {
    this.x = random(width);
    this.y = height + 100;
    this.dx = 0;
    this.dy = -3;
    this.radius = random(20, 40);
    this.theta = 0;
    this.isAlive = true;
    this.whenIDied = 0;
    this.waitTime = 1000;
    this.isPopped = false;

  }

  move() {
    if (this.y - this.radius > 0) {
      //basic movement
      this.x += this.dx;
      this.y += this.dy;
  
      //random move left/right
      this.dx = map(noise(this.theta), 0, 1, -5, 5);
      this.theta += 0.01;

    }
    //when it hits the top
    else if (this.isAlive) {
      this.isAlive = false;
      this.whenIDied = millis();
    }
    //stuck on the top
    else {
      if (millis() > this.whenIDied + this.waitTime) {
        this.isPopped = true;
      }
    }
  }

  display() {
    if (!this.isPopped) {
      noStroke();
      fill("cyan");
      ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }
  }
}
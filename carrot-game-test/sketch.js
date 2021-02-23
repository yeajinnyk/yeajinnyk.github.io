// Carrot Game Draft
// Jinny kim
// 02. 17. 2021

//NEXT TO WORK ON: 
// - fix interval of spawning carrots (ask mr. schellenberg)
// - incorporate death screen
// - incorporation back button

let carrotImg, carrotGameBg, basketImg;
let basketWidth, basketHeight;
let basketX, basketY;
let basketdX = 3;
let carrotSize = 40;

let carrots = [];

let fullHealthImg, twoHeartsImg, oneHeartImg, deadImg;
let healthBarWidth, healthBarHeight, healthBarX, healthBarY;

let health, score, points;
let carrotGamePlaying = true;

class Carrot {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.dx = 0;
    this.dy = random(5, 10);
    this.size = carrotSize;
  }

  notCaught() {
    if (this.x > basketX && this.x < basketX + basketWidth && this.y + this.size > basketY && this.y < basketY + basketHeight) {
      return false;
    }
    else {
      return true;
    }
  }

  move() {
    if (this.y + this.size < height && this.notCaught()) {
      this.y += this.dy;
    }
  }

  display() {
    if (this.notCaught() && this.onScreen()) {
      image(carrotImg, this.x, this.y, this.size, this.size);
    }
  }

  onScreen() {
    return this.y + this.size < height;
  }
  
}

function spawnCarrot() {
  let someCarrot = new Carrot();
  carrots.push(someCarrot);
}

function dropCarrot() {
  for (let i = carrots.length - 1; i >= 0; i--) {
    if (!carrots[i].notCaught()) { //caught!
      carrots.splice(i, 1);
      points++;
    }
    else if (!carrots[i].onScreen()) { //missed carrot
      carrots.splice(i, 1);
      health--;
    }
    else {
      carrots[i].move();
      carrots[i].display();
    }
  }
}

function preload() {
  carrotImg = loadImage("assets/good-carrot.png");
  carrotGameBg = loadImage("assets/carrot-game-bg.png");
  basketImg = loadImage("assets/basket.png");

  fullHealthImg = loadImage("assets/threeHearts.png");
  twoHeartsImg = loadImage("assets/twoHearts.png");
  oneHeartImg = loadImage("assets/oneHeart.png");
  deadImg = loadImage("assets/noHearts.png");
}

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

  basketWidth = basketImg.width * 0.3;
  basketHeight = basketImg.height * 0.3;

  basketX = width/2;
  basketY = height * 0.65;

  healthBarWidth = fullHealthImg.width * 0.5;
  healthBarHeight = fullHealthImg.height * 0.5;
  healthBarX = width * 0.7;
  healthBarY = height * 0.9;

  points = 0;
  health = 3;

  window.setInterval(spawnCarrot, 1500); //use something else
}

function carrotScore() {
  score = "Score: " + points;
  fill("black");
  textSize(20);
  textFont("VERDANA");
  textAlign(CENTER);
  text(score, width/2, height * 0.96);
}

function displayHealthBar() {
  if (health === 3) {
    image(fullHealthImg, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  }
  else if (health === 2) {
    image(twoHeartsImg, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  }
  else if (health === 1) {
    image(oneHeartImg, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  }
  else {
    image(deadImg, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    carrotGamePlaying = false;
  }
}

function displayLossScreen() {
  if (!carrotGamePlaying) {
    background("pink"); //temp
  }
}

function displayCarrotGameBg() {
  image(carrotGameBg, 0, 0, width, height);
}

function displayBasket() {
  image(basketImg, basketX, basketY, basketWidth, basketHeight);
}

function controlBasket() {
  if (keyIsDown(65)) {
    basketX -= basketdX;
  }
  if (keyIsDown(68)) {
    basketX += basketdX;
  }
}

function keepBasketIn() {
  if (basketX < 0) {
    basketX = 0;
  }
  if (basketX + basketWidth > width) {
    basketX = width - basketWidth;
  }
}

function draw() {
  displayCarrotGameBg();

  displayBasket();
  controlBasket();
  keepBasketIn();

  dropCarrot();

  displayHealthBar();
  carrotScore();
  displayLossScreen();
}
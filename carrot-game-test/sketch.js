// Carrot Game Draft
// Jinny kim
// 02. 17. 2021

//NEXT TO WORK ON: 
// - incorporate proper death screen
// - incorporation back button
// - move to main project


//GLOBAL VARIABLES
//carrot + basket 
let carrotImg, carrotGameBg, basketImg;
let basketWidth, basketHeight;
let basketX, basketY;
let basketdX = 5;
let carrotSize = 40;

let carrots = [];

//health bar + score
let fullHealthImg, twoHeartsImg, oneHeartImg, deadImg;
let healthBarWidth, healthBarHeight, healthBarX, healthBarY;
let carrotDeathScreen;

let health, score, points;

//carrot game state
let carrotGamePlaying;

let timer;

//CLASSES
//carrots
class Carrot {
  constructor() {
    this.size = carrotSize;
    this.x = random(width - this.size);
    this.y = 0;
    this.dx = 0;
    this.dy = random(5, 10);
  }

  //check if carrot has been caught by the player
  notCaught() {
    if (this.x < basketX + basketWidth && this.x > basketX && this.y + this.size > basketY && this.y < basketY + basketHeight) {
      return false;
    }
    else if (this.x + this.size < basketX + basketWidth && this.x + this.size > basketX && this.y + this.size > basketY && this.y < basketY + basketHeight) {
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

  //check if the carrot has reached the bottom (player has missed the carrot)
  onScreen() {
    return this.y + this.size < height;
  }
  
}

//timer for spawning carrots
class Timer {
  constructor() {
    this.interval = 1500;
    this.lastSpawn = 0;
  }

  spawnCarrot() {
    if (millis() - this.lastSpawn > this.interval && carrotGamePlaying) { //doesn't spawn carrots while in loss screen
      let someCarrot = new Carrot();
      carrots.push(someCarrot);
      
      this.lastSpawn = millis();
    }
  }
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

//PRELOAD 
function preload() {
  //images
  carrotImg = loadImage("assets/good-carrot.png");
  carrotGameBg = loadImage("assets/carrot-game-bg.png");
  basketImg = loadImage("assets/basket.png");

  fullHealthImg = loadImage("assets/threeHearts.png");
  twoHeartsImg = loadImage("assets/twoHearts.png");
  oneHeartImg = loadImage("assets/oneHeart.png");
  deadImg = loadImage("assets/noHearts.png");

  carrotDeathScreen = loadImage("assets/loss-screen.png");
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
  
  carrotGamePlaying = true;

  timer = new Timer();
}

//displaying the player's score
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
    carrotGamePlaying = false; //signal to display the loss screen
  }
}

function displayLossScreen() {
  if (!carrotGamePlaying) {
    image(carrotDeathScreen, 0, 0, width, height); 
  }
}

function displayCarrotGameBg() {
  image(carrotGameBg, 0, 0, width, height);
}

function displayBasket() {
  image(basketImg, basketX, basketY, basketWidth, basketHeight);
}

function controlBasket() {
  if (carrotGamePlaying) {
    if (keyIsDown(65)) { //a
      basketX -= basketdX;
    }
    if (keyIsDown(68)) { //d
      basketX += basketdX;
    }
  }
}

function keyPressed() {
  if (key === "c") { //temporary clear button
    setup();
  }
}

//keep the basket inside the screen
function keepBasketIn() {
  if (basketX < 0) {
    basketX = 0;
  }
  if (basketX + basketWidth > width) {
    basketX = width - basketWidth;
  }
}

//putting everything together!
function draw() {
  
  timer.spawnCarrot();

  displayCarrotGameBg();

  displayBasket();
  controlBasket();
  keepBasketIn();

  dropCarrot();

  displayHealthBar();
  carrotScore();
  displayLossScreen();
}
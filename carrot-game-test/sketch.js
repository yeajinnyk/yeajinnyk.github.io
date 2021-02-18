// Carrot Game Draft
// Jinny kim
// 02. 17. 2021

//NEXT TO WORK ON: 
// - catching carrots
// - fix interval of spawning carrots
// - incorporate health system (hearts)
// - scoring?

//Amy's game: https://editor.p5js.org/3802012/sketches/7BIZxrCEL

let carrotImg, carrotGameBg, basketImg;
let basketWidth, basketHeight;
let basketX, basketY;
let basketdX = 3;
let carrotSize = 40;

let carrots = [];

class Carrot {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.dx = 0;
    this.dy = random(5, 10);
    this.notCaught = true;
    this.size = carrotSize;
    
  }

  move() {
    if (this.y + carrotSize < height) {
      this.y += this.dy;
    }
    else if (this.notCaught) {
      this.notCaught = false;
    }
  }

  display() {
    if (this.notCaught) {
      image(carrotImg, this.x, this.y, this.size, this.size);
    }
  }
}

function spawnCarrot() {
  let someCarrot = new Carrot();
  carrots.push(someCarrot);
}

function dropCarrot() {
  for (let i = carrots.length - 1; i >= 0; i--) {
    if (!carrots[i].notCaught) {
      carrots.splice(i, 1);
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

  window.setInterval(spawnCarrot, 1500); //use something else
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
}
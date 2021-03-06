// Interactive Scene
// Jinny Kim
// 01. 16. 2021
//
// Extra for Experts:
// - added background music (but haven't figured out how to make it loop cleanly yet)

//NOTE TO SELF: link different js files (e.g. global variable sketch file) in the html before the sketch.js (opt.)
//NEXT STEPS (Hopefully): loop bg music cleanly + code in the fishing mini game!

//NOTE TO MR. SCHELLENBERG: the code at this time can only play background music, go past the starting menu with the enter button,
// and move back and forth between the fishing game background by clicking the icons.



//GLOBAL VARIABLES

//audio 
let bgMusic;
let mute = true;

//cats
let cats;
let commonCat;

//x, y, width, height
let catX;
let catY;
let catWidth;
let catHeight;

let gameWindowSize = 500;
let settingButtonWidth;
let settingButtonHeight;
let settingButtonX;
let settingButtonY;

let howToPlayButtonX;
let howToPlayButtonY;

let exitButtonWidth;
let exitButtonHeight;
let exitButtonX;
let exitButtonY;

let iconSize;

let fishingGameIconX;
let fishingGameIconY;

let ticTacToeGameIconX;
let ticTacToeGameIconY;

let audioIconSize;
let audioIconX;
let audioIconY;

//menus and settings
let menu = {
  displayStart: true,
  displayFishingGame: false,
  displayTicTacToeGame: false,
  displayLobby: false,
}

//(haven't incorporated them in yet)
//fishing game variables (potential. may change depending)
let roundEnd; //resets once something is caught 
let timeToWait; //random number of seconds to wait
let amountfishCaught = 0; //number of fish caught
let didCatch; //if player reeled catch in on time (true/false)
let isFish; //what player catches could potentially not be fish, thus no points.
let requiredReactionTime; 

  //NOTE TO SELF: fishing game where player waits until the cat randomly reacts, indicating something has been caught. fish = good, other junk = bad. once the recent catch is recorded, the round restarts for more fishing until the player exits out of the mini game.


//PRELOADING
function preload() {
  
  //music: instrumental ver. "Flowering" by LUCY
  bgMusic = loadSound("lucyFloweringMusic.mp3");
  
  //cat images
  commonCat = loadImage("commonCat.png");
  
  //menu + button images
  startingMenu = loadImage("startingMenu.png");
  buttonHowToPlay = loadImage("howToPlayButton.png");
  buttonSettings = loadImage("settings.png");
  buttonExit = loadImage("exit.png");  
  
  //fishing game images
  exclamationBubble = loadImage("exclamationBubble.png");
  fishingFish = loadImage("fishingFish.png");
  fishingGameIcon = loadImage("fishingGameIcon.png");
  fishingJunk = loadImage("fishingJunk.png");
  fishingMissed = loadImage("fishingMissed.png");
  fishingReel = loadImage("fishingReel.png");
  fishingWaitingOne = loadImage("fishingWaitingOne.png");
  fishingWaitingTwo = loadImage("fishingWaitingTwo.png");
  buttonPlayAgain = loadImage("playAgain.png");

}

//AUDIO
function playMusic() {
  bgMusic.play();
 
}

//IMAGES

function displayCat() {
  if (menu.displayLobby) {
    image(commonCat, catX, catY, catWidth, catHeight);
  }
}

function displaySettingButton() {
  if (menu.displayStart) {
    image(buttonSettings, settingButtonX, settingButtonY, settingButtonWidth, settingButtonHeight);
  }
}

function displayHowToPlayButton() {
  if (menu.displayStart) {
    image(buttonHowToPlay, howToPlayButtonX, howToPlayButtonY, howToPlayButtonWidth, howToPlayButtonHeight)
  }
}

function displayMenu() {
  if (menu.displayStart === true) {
    image(startingMenu, 0, 0, gameWindowSize, gameWindowSize);
  }
}

function displayMainGame() {
  if (menu.displayStart === false && menu.displayLobby) {
    background(220);
  }
}

//tic tac toe game
function displayTicTacToeGame() {
  if (menu.displayTicTacToeGame) {
    background("pink");
  }
}

function displayTicTacToeGameIcon() {
  if (menu.displayLobby) {
    rect(ticTacToeGameIconX, ticTacToeGameIconY, iconSize, iconSize);
  }
}

//fishing game images
function displayFishingGameIcon() {
  if (menu.displayLobby) {
    image(fishingGameIcon, fishingGameIconX, fishingGameIconY, iconSize, iconSize);
  }
}

function displayExitButton() {
  if (menu.displayFishingGame || menu.displayTicTacToeGame) {
    image(buttonExit, exitButtonX, exitButtonY, exitButtonWidth, exitButtonHeight);
  }
}

function displayFishingGame() {
  if (menu.displayFishingGame) {
    image(fishingWaitingOne, 0, 0, gameWindowSize, gameWindowSize);
  }
}


function displayButtonMusic() {
  rect(audioIconX, audioIconY, audioIconSize, audioIconSize);
}


//CONTROLS
function keyPressed() {
  if (keyCode === 13 && menu.displayStart) { //move past starting menu
    menu.displayStart = false;
    menu.displayLobby = true;
  }
}

function mousePressed() {
  //clicking on cats to interact in the future
  for (let cat of cats) {
    if ((mouseX > cat.x && mouseX < cat.x + cat.width && mouseY > cat.y && mouseY < cat.y + cat.height) && menu.displayLobby) {
      console.log(cat.name);
    }
  }
  
  //fishing game icon --> fishing game
  if ((mouseX > fishingGameIconX && mouseX < fishingGameIconX + iconSize && mouseY > fishingGameIconY && mouseY < fishingGameIconY + iconSize) && menu.displayLobby) {
    menu.displayFishingGame = true;
    menu.displayLobby = false;
  }
  
  //leave mini games
  if ((mouseX > exitButtonX && mouseX < exitButtonX + exitButtonWidth && mouseY > exitButtonY && mouseY < exitButtonY + exitButtonHeight) && (menu.displayFishingGame || menu.displayTicTacToeGame)) {
    menu.displayFishingGame = false;
    menu.displayTicTacToeGame = false;
    menu.displayLobby = true;
  }

  //tic tac toe game icon --> tic tac toe game
  if ((mouseX > ticTacToeGameIconX && mouseX < ticTacToeGameIconX + iconSize && mouseY > ticTacToeGameIconY && mouseY < ticTacToeGameIconY + iconSize) && menu.displayLobby) {
    menu.displayTicTacToeGame = true;
    menu.displayLobby = false;
  }

  //audio button
  if (mouseX > audioIconX && mouseX < audioIconX + audioIconSize && mouseY > audioIconY && mouseY < audioIconY + audioIconSize) {
    mute = !mute;
    if (mute) {
      bgMusic.stop();
    }
    else if (mute === false) {
      playMusic();
    }
  }
}



//SETUP & DRAW
function setup() {
  createCanvas(gameWindowSize, gameWindowSize);
  
  catX = gameWindowSize / 5;
  catY = gameWindowSize / 2;
  
  catWidth = commonCat.width * 0.5;
  catHeight = commonCat.height * 0.5;
  
  settingButtonWidth = buttonSettings.width * 0.6;
  settingButtonHeight = buttonSettings.height * 0.6;
  settingButtonX = gameWindowSize * 0.6;
  settingButtonY = gameWindowSize * 0.5;
  
  howToPlayButtonWidth = buttonHowToPlay.width * 0.6;
  howToPlayButtonHeight = buttonHowToPlay.height * 0.6;
  howToPlayButtonX = gameWindowSize * 0.6;
  howToPlayButtonY = gameWindowSize * 0.67;
  
  exitButtonWidth = buttonExit.width * 0.8;
  exitButtonHeight = buttonExit.height * 0.8;
  exitButtonX = gameWindowSize * 0.8;
  exitButtonY = gameWindowSize * 0.05;
  
  iconSize = gameWindowSize * 0.08;

  audioIconSize = iconSize * 0.7;
  audioIconX = gameWindowSize * 0.03;
  audioIconY = gameWindowSize * 0.92;

  ticTacToeGameIconX = gameWindowSize * 0.85;
  ticTacToeGameIconY = gameWindowSize * 0.3;

  fishingGameIconX = gameWindowSize * 0.85;
  fishingGameIconY = gameWindowSize * 0.2;

  cats = [ 

  { name: "Common Cat",
   likes: "fish, string",
   dislikes: "baths, dogs", 
   friendshipLevel: 0,
   x: catX,
   y: catY,
   width: catWidth,
   height: catHeight,
   
  },
  
  //not filled in yet. (for future cats!)
    { name: "blank",
   likes: "blank",
   dislikes: "blank", 
   friendshipLevel: 0,  
  },
  
    { name: "blank",
   likes: "blank",
   dislikes: "blank", 
   friendshipLevel: 0,  
  },
  
];
  
}

function draw() {
  displayMenu();
  
  displaySettingButton();
  displayHowToPlayButton();
  displayMainGame();
  displayFishingGameIcon();
  displayTicTacToeGameIcon();
  
  displayCat();
  
  displayFishingGame();
  displayButtonMusic();
  
  displayTicTacToeGame();

  displayExitButton();
}


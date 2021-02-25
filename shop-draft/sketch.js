// Shop Draft
// Jinny Kim
// 02. 24. 2021

// NOTE TO SELF:
// NEXT TO WORK ON:
//        - Make the purchasing action work
//        - (program should know item belongs to player now)
//        - Add more purchasables
//        - More pages of items in the menu (arrow keys to click?)

//GLOBAL VARIABLES
let shopBgImg, shopMenuImg, shopKeeperMessageOne;

let carrotDollImg, determinedFaceImg, droopyFaceImg, excitedFaceImg;
let eyeMaskImg, headBowImg, royalOutfitImg, scarfImg, yellowHoodieImg;

let wallet = 0;

let gameState = "shop";

let shopMenuX, shopMenuY, shopMenuWidth, shopMenuHeight;
let shopMsgWidth, shopMsgHeight, shopMsgX, shopMsgY;

let txtSize = 15;

//CLASSES
class ShopItem {
  constructor(name, img, desc, price, y) {
    this.itemImg = img;
    this.item = name;

    this.price = price;
    this.desc = desc;
    this.bought = false;

    this.width = this.itemImg.width * 0.2;
    this.height = this.itemImg.height * 0.2;
 
    this.x = width * 0.62;
    this.y = y;

    this.selectionWidth = this.x + 160;
    this.selectionHeight = this.y + this.height;
    
    this.text = this.item + "\nCost: " + str(this.price) + "\n" + this.desc;
  }

  display() {
    noStroke();
    rect(this.x + this.width + 10, this.y, 160, this.height);
    image(this.itemImg, this.x, this.y, this.width, this.height);

    textAlign(LEFT, CENTER);
    fill("black");
    textSize(txtSize);
    text(this.text, this.x + this.width + 20, this.y + 45);

    if (this.bought) {
      fill(0, 0, 0, 175);
      rect(this.x, this.y, 40, this.height);
    }
  }

  buy() {
    if (wallet >= this.price && !this.bought) {
      this.bought = true;
    }
  }
}

function preload() {
  shopBgImg = loadImage("assets/shop-bg.png");
  shopMenuImg = loadImage("assets/shop-menu.png");

  shopKeeperMessageOne = loadImage("assets/shop-keeper-msg1.png");

  carrotDollImg = loadImage("assets/carrot-doll.png");
  determinedFaceImg = loadImage("assets/determined-face.png");
  droopyFaceImg = loadImage("assets/droopy-eyes.png");
  excitedFaceImg = loadImage("assets/excited-face.png");
  eyeMaskImg = loadImage("assets/eye-mask.png");
  headBowImg = loadImage("assets/head-bow.png");
  royalOutfitImg = loadImage("assets/royal-outfit.png");
  scarfImg = loadImage("assets/scarf.png");
  yellowHoodieImg = loadImage("assets/yellow-hoodie.png");

}

function setup() {
  createCanvas(657, 657);

  shopMenuWidth = shopMenuImg.width * 1.3;
  shopMenuHeight = shopMenuImg.height * 1.3;
  shopMenuX = width * 0.6;
  shopMenuY = height * 0.05;

  shopMsgWidth = shopKeeperMessageOne.width * 0.5;
  shopMsgHeight = shopKeeperMessageOne.height * 0.5;
  shopMsgX = width * 0.025;
  shopMsgY = height * 0.15;

}

function draw() {
  displayShop();
  displayWallet();
  displayShopMessages();
  
  let royalOutfit = new ShopItem("Royal Outfit", royalOutfitImg, '"Fits just right. \nYou are worthy!"', 50, 40);
  royalOutfit.display();
  royalOutfit.buy();
}

function displayShop() {
  if (gameState === "shop") {
    image(shopBgImg, 0, 0, width, height);
    image(shopMenuImg, shopMenuX, shopMenuY, shopMenuWidth, shopMenuHeight);
  }
}

function displayWallet() {
  if (gameState !== "start") {
    if (gameState === "shop") {
      fill("white");
    }
    else {
      fill("black");
    }

    textSize(20);
    textFont("VERDANA");
    textAlign(CENTER);

    text("Coins: " + wallet, width * 0.1, height * 0.05);
  }
}

function displayShopMessages() {
  image(shopKeeperMessageOne, shopMsgX, shopMsgY, shopMsgWidth, shopMsgHeight);
}

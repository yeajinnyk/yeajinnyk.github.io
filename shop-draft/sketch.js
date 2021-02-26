// Shop Draft
// Jinny Kim
// 02. 24. 2021

// NOTE TO SELF:
// NEXT TO WORK ON:
//        - (program should know item belongs to player now) --> Add to storage system
//        - Add more purchasables?
//        - Arrow key UI

//GLOBAL VARIABLES
let shopBgImg, shopMenuImg, shopKeeperMessageOne;

let carrotDollImg, determinedFaceImg, droopyFaceImg, excitedFaceImg;
let eyeMaskImg, headBowImg, royalOutfitImg, scarfImg, yellowHoodieImg;

let wallet = 0;

let gameState = "shop";

let shopMenuX, shopMenuY, shopMenuWidth, shopMenuHeight;
let shopMsgWidth, shopMsgHeight, shopMsgX, shopMsgY;

let txtSize = 15;

let mouseIsClicked;
let royalOutfit, hoodie, carrotDoll, eyeMask, scarf, determinedLook, droopyEyes, excitedFace, headBow;

let arrowY, arrowSize, leftArrowX, rightArrowX;

let shopList = [];
let menuPage;

//per page
let firstItemY = 50;
let secondItemY = 160;
let thirdItemY = 270;
let fourthItemY = 380;
let fifthItemY = 490;


//CLASSES
class ShopItem {
  constructor(name, img, desc, price, y, page) {
    this.itemImg = img;
    this.item = name;

    this.price = price;
    this.desc = desc;
    this.bought = false;

    this.width = this.itemImg.width * 0.2;
    this.height = this.itemImg.height * 0.2;
 
    this.x = width * 0.62;
    this.y = y;

    this.page = page;
    
    this.text = this.item + "\nCost: " + str(this.price) + "\n" + this.desc;
  }

  display() {
    if (gameState === "shop") {
      if (menuPage === this.page) {
        noStroke();
        fill("white");
        rect(this.x + this.width + 10, this.y, 160, this.height);
        image(this.itemImg, this.x, this.y, this.width, this.height);
    
        textAlign(LEFT, CENTER);
        fill("black");
        textSize(txtSize);
        text(this.text, this.x + this.width + 20, this.y + 45);
    
        //when bought, gray it out to let player know it's been purchased
        if (this.bought) {
          fill(0, 0, 0, 150);
          rect(this.x, this.y, this.width + 170, this.height);

          fill("white");
          textAlign(LEFT, CENTER);
          textSize(txtSize + 20);
          text("BOUGHT", this.x + 40, this.y + 45);
        }
      }
    }

  }

  buy() {
    if (gameState === "shop") {
      if (menuPage === this.page) {
        if (mouseX > this.x && mouseX < this.x + this.width + 170 && mouseY > this.y && mouseY < this.y + this.height) {
          if (wallet >= this.price && !this.bought) {
            this.bought = true;
            wallet -= this.price;
            mouseIsClicked = false;
          }
        }
      }
    }
  }

  //used to detect page location
  pageNumber() {
    return this.page;
  }

  //will be used to detect whether an item should appear in the storage/closet later
  playerOwns() {
    return this.bought;
  }
}

function mousePressed() {
  if (gameState === "shop") {
    //purchase action
    for (let item of shopList) {
      item.buy();
    }

    //arrow keys for shop menu
    if (mouseX > rightArrowX && mouseX < rightArrowX + arrowSize && mouseY > arrowY && mouseY < arrowY + arrowSize) {
      menuPage++;
    }
    else if (menuPage > 1 && mouseX > leftArrowX && mouseX < leftArrowX + arrowSize && mouseY > arrowY && mouseY < arrowY + arrowSize) {
      menuPage--;
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

  arrowY = height * 0.91;
  arrowSize = 30;
  leftArrowX = width * 0.625;
  rightArrowX = width * 0.93;

  //set shop item objects in setup. Display and buy functions of the objects are in draw.
  createShopObjects();

  //put into a list so i can use for loops to run display() and buy() on each item efficiently
  shopList = [royalOutfit, hoodie, carrotDoll, eyeMask, scarf, determinedLook, droopyEyes, excitedFace, headBow];

  menuPage = 1;
}

function createShopObjects() {
  //page 1
  royalOutfit = new ShopItem("Royal Outfit", royalOutfitImg, '"Fits just right. \nYou are worthy!"', 800, firstItemY, 1);
  hoodie = new ShopItem("Yellow Hoodie", yellowHoodieImg, '"So comfortable!"', 100, secondItemY, 1);
  carrotDoll = new ShopItem("Carrot Doll", carrotDollImg, '"Can and will \nbecome your best \nfriend!"', 150, thirdItemY, 1);
  eyeMask = new ShopItem("Eye Mask", eyeMaskImg, '"Perfect for the \nperfect nap!"', 80, fourthItemY, 1);
  scarf = new ShopItem("Red Scarf", scarfImg, '"I feel pretty \nadventurous!"', 80, fifthItemY, 1);

  //page 2
  determinedLook = new ShopItem("Determined", determinedFaceImg, '"Determined as \never!"', 50, firstItemY, 2);
  droopyEyes = new ShopItem("Droopy", droopyFaceImg, '"Is it nap time \nyet?"', 50, secondItemY, 2);
  excitedFace = new ShopItem("Excited", excitedFaceImg, '"WOW! So excited!"', 50, thirdItemY, 2);
  headBow = new ShopItem("Blue Bow", headBowImg, '"Blue like the sky! \nWill carrots fall \nfrom here too?"', 80, fourthItemY, 2);


}

function displayItems() {
  for (let item of shopList) {
    if (item.pageNumber() === menuPage) {
      for (let i = 0; i < shopList.length; i++) {
        shopList[i].display();
      }
    }
  }
}

function draw() {
  displayShop();
  displayWallet();
  displayShopMessages();

  displayItems();
  displayArrowKeys();

}

function displayShop() {
  if (gameState === "shop") {
    image(shopBgImg, 0, 0, width, height);
    image(shopMenuImg, shopMenuX, shopMenuY, shopMenuWidth, shopMenuHeight);
  }
}

function displayArrowKeys() {
  if (gameState === "shop") {
    if (menuPage >= 1) {
      fill("black");

      rect(rightArrowX, arrowY, arrowSize, arrowSize);
    }
    if (menuPage > 1) {
      rect(leftArrowX, arrowY, arrowSize, arrowSize);
    }
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
    textAlign(LEFT);

    text("Coins: " + wallet, width * 0.05, height * 0.05);
  }
}

function displayShopMessages() {
  if (gameState === "shop") {
    image(shopKeeperMessageOne, shopMsgX, shopMsgY, shopMsgWidth, shopMsgHeight);
  }
}

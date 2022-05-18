var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

function preload() {

   fundoImg = loadImage("fundo.webp");
   ufoImg = loadImage("ufo.png");
   fogueteImg = loadAnimation("foguete.png");
   coinImg = loadImage("coin.png");
   explosaoImg = loadAnimation("explosao.png");

}


function setup() {
  createCanvas(800,800);

  fundo = createSprite(400, 400);
  fundo.addImage(fundoImg);
  fundo.scale = 1.8;
  
  foguete = createSprite(400, 580);
  foguete.addAnimation("foguete", fogueteImg);
  foguete.addAnimation("explosao", explosaoImg);
  foguete.scale = 0.1;

  coinGroup = new Group();
  ufoGroup = new Group();
}

function draw() {
  background(0);

  drawSprites();
  
  textSize(25);
  fill("white");
  text("Vidas: " + life, 60, 100);

  textSize(25);
  fill("white");
  text("Score: " + score, 60, 150);

  if(gameState == "play")
  {
    fundo.velocityY = 4;

    if (fundo.y > 800) {
     fundo.y = 400;
    }
  
    if (keyDown("LEFT_ARROW")){
      foguete.x = foguete.x - 5;
    }
  
    if (keyDown("RIGHT_ARROW")){
      foguete.x = foguete.x + 5;
    }
  
    removeLife();
    removeCoins();
  
    spawnAliens();
    spawnCoins();
    
    if(life == 0){
      gameState = "end"
    }
  }


  if(gameState == "end")
  {
    //remover os grupos 
    ufoGroup.destroyEach();
    coinGroup.destroyEach(); 
    //mudar a animação do foguete para explosão

    fundo.velocityY = 0;
    foguete.velocityX = 0;
    foguete.changeAnimation("explosao", explosaoImg);

    //exibir mensagem de fim de jogo                                  

    textSize(25);
    fill("white");
    text("Fim de jogo! ", 300, 400);
  }

 
  
}

function spawnAliens() {
  if(frameCount % 60 == 0){
    ufo = createSprite(random(30, 770), random(10, 500));
    ufo.addImage(ufoImg);
    ufo.velocityY = 3;
    ufo.scale = 0.2;
    ufo.lifeTime = 800;
    ufoGroup.add(ufo);

  }
}

function spawnCoins() {
  if(frameCount % 60 == 0){
    coin = createSprite(random(10, 790), random(10, 500));
    coin.addImage(coinImg);
    coin.velocityY = 3;
    coin.scale = 0.1;
    coin.lifeTime = 800;
    coinGroup.add(coin);
  }
 
}

function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  foguete.overlap(ufoGroup, function(collector, collected){
    life -= 1; 
    collected.remove();
  })
 }
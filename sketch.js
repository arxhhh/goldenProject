var bike,biker;
var bgImg;
var ground;
var waterImg,energyImg,potholeImg;
var waterBottle,energyBar,potHole,breaker;
var coinImg,coins,stoneImg,stone;
var invisibleRoad;
var energyGrp,waterGrp,potHoleGrp,stoneGrp,coinGrp;
var gameOverImg,gameOver;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  bike=loadAnimation("images/c1.png","images/c2.png","images/c3.png","images/c4.png","images/c5.png","images/c6.png");
  bgImg=loadAnimation("images/bg5.jpg");
  energyImg=loadImage("images/energy2.o.png");
  waterImg=loadImage("images/water.png");
  potholeImg=loadImage("images/pothole.png");
  stoneImg=loadImage("images/stone.png");
  coinImg=loadImage("images/coins.png");
  gameOverImg=loadImage("images/gameOver.jpg")
}
function setup(){
 createCanvas(1200,600);

 ground=createSprite(600,300);
 ground.addAnimation("background",bgImg);
 ground.scale=3.5;
 ground.velocityX=-7;

 biker=createSprite(130,450);
 biker.addAnimation("bike_running",bike);
 biker.scale=1.75;
 
 invisibleRoad=createSprite(600,520,1200,5);
 invisibleRoad.visible=false;

 gameOver=createSprite(600,300);
 gameOver.addImage("gameover",gameOverImg);
 gameOver.scale=4;
 gameOver.visible=false;

 energyGrp=new Group();
 waterGrp=new Group();
 potHoleGrp=new Group();
 coinGrp=new Group();
 stoneGrp=new Group();
}

function draw(){
 background("black");
 textSize(15);
 stroke("white")
 text("SCORE :"+score,600,300);

 if(gameState===PLAY){
   //scrolling ground 
     if(ground.x<(ground.width)/2){
    ground.x=ground.width;
  }
  //making biker jump with space key

  if(keyDown("space")&& biker.y>=300){
   biker.velocityY=-4;
  }
  biker.velocityY+=0.8;

  if(biker.overlap(potHoleGrp)||biker.overlap(stoneGrp)){
      
      gameState=END;
     
  }
  spawnObjects();

  //check collision between biker and coin
  if(biker.overlap(coinGrp)){
  score+=1;
  }

 }
 else if(gameState===END){
  ground.velocityX=0; 
  biker.velocityX=0;
  potHoleGrp.setVelocityXEach(0);
  energyGrp.setVelocityXEach(0);
  waterGrp.setVelocityXEach(0);
  coinGrp.setVelocityXEach(0);
  stoneGrp.setVelocityXEach(0);

  potHoleGrp.setLifetimeEach(-1);
  energyGrp.setLifetimeEach(-1);
  waterGrp.setLifetimeEach(-1);
  coinGrp.setLifetimeEach(-1);
  stoneGrp.setLifetimeEach(-1);

  gameOver.visible=true;
  
 }

  //colliding with obstacles
  biker.collide(invisibleRoad);

 drawSprites();
}

function spawnObjects(){
  if(frameCount%400===0)
  {
    potHole=createSprite(1220,520);
    potHole.addImage(potholeImg);
    potHole.scale=0.5;
    potHole.velocityX=-7;

    potHole.lifetime=1150; 
    potHoleGrp.add(potHole);
    potHole.depth=biker.depth;
  }
  if(frameCount%623===0)
  {
    energyBar=createSprite(1220,430);
    energyBar.addImage(energyImg);
    energyBar.scale=0.5;
    energyBar.velocityX=-7;
    energyBar.lifetime=1150;
    energyGrp.add(energyBar);
    energyBar.depth=biker.depth;
    biker.depth=+1;
  }

  if(frameCount%853===0)
  {
    waterBottle=createSprite(1220,430);
    waterBottle.addImage(waterImg);
    waterBottle.scale=0.15;
    waterBottle.velocityX=-7;
    waterBottle.lifetime=1150;
    waterGrp.add(waterBottle);
    waterBottle.depth=biker.depth;
    biker.depth=+1;
  }

  if(frameCount%199===0)
  {
    coins=createSprite(1220,430);
    coins.addImage(coinImg);
    coins.scale=0.25;
    coins.velocityX=-7;
    coinGrp.add(coins);
    coins.lifetime=1150;
    coins.depth=biker.depth;
    
  }

  if(frameCount%689===0)
  {
    stone=createSprite(1220,455);
    stone.addImage(stoneImg);
    stone.scale=0.25;
    stone.velocityX=-7;
    stoneGrp.add(stone);
    stone.lifetime=1150;
    stone.depth=biker.depth;
    
  }
  
 

}

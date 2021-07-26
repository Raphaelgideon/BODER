var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var heli1Img,heli1 ;
var heli2Img,heli2Groups,heli2;
var score = 0;
var background1,bg1;
var fireball,fbGroups,fb;
var gameOver, gameOverImg;
var target;

function preload(){
 heli1Img= loadImage("heli-1.png");
  heli2Img=loadImage("heli-2.png");
    background1=loadImage("background1.jpg");
     fireball=loadImage("fireball.jpg");
      gameOverImg=loadImage("reset.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight)
 
 bg1=createSprite(width/2,height,width,2);
 bg1.addImage(background1);
 bg1.velocityX=-3;
 bg1.scale=5.9 ;
 
  
 heli1  = createSprite(65,60);
 heli1.addAnimation("heli-1.png",heli1Img);
 heli1.scale=0.3 ;
 
  
 gameOver = createSprite(260,150)
 gameOver.addImage(gameOverImg); 
 gameOver.scale=1; 
 heli2Groups = new Group();
 fbGroups = new Group(); 
  
}

function draw() 
{
  background("bg1");
  textSize(25);
  text("Score: "+ score,150,30);

  fill(225)
   createEdgeSprites();
  bg1.velocityX = -(6 + 3*score/6 );
  
  
  if(gameState===PLAY){
   if (bg1.x < 0){
      bg1.x = bg1.width/2;
    }
    heli1.y = World.mouseY;
  
   if (keyDown("space")){
     createfb();
    }
    
    
   if (fbGroups.isTouching(heli2Groups)){
      heli2Groups.destroyEach();
     score = score+1;
   }
  if (heli1.isTouching(heli2Groups)){
    gameState=END;
  }
    gameOver.visible=false;
  edges= createEdgeSprites();
  heli1.collide(edges);
      spawnEnemy();
    
    if( keyDown("SPACE")) {      
      reset();
      
    }
 
  }
  
  
  //code to reset the background
  else if(gameState === END){
         
    bg1.velocityX= 0;
    heli1.velocityX= 0;
    heli2Groups.setVelocityXEach(0);
    heli2Groups.setLifetimeEach(-1);
    gameOver.visible=true;
    if(keyDown("space")){
      reset();
      score=0;
    }
  }
 
  drawSprites();
}
function spawnEnemy(){
  if(frameCount % 60===0){
    var heli2 = createSprite(600,300,40,10);
    heli2.y= Math.round(random(100,400)) ;
    heli2.addImage(heli2Img);
    heli2.scale = 0.4;
    heli2.velocityX = -4  ;
    heli2.lifetime=400;
    heli2Groups.add(heli2);
  } 
}

function createfb() {
  var fb= createSprite(100, 100, 60, 10);
  fb.addImage(fireball);
  fb.x = 360;
  fb.y=heli1.y;
  fb.velocityX = 40;
  fb.lifetime = 100;
  fb.scale = 0.01;
  fbGroups.add(fb);
}
function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  heli2Groups.destroyEach();
  bg1.velocityX=-3;
}
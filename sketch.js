var PLAY = 1;
var END = 0;
var gameState = PLAY;
var n,nImg;
var king,kImg;
var kunai;

var jungle, invisiblejungle,groundImg;
var insivibleGround;

var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;



function preload(){
 
  nImg= loadAnimation("ninja.png","ninja.png","ninja.png","ninja2.png","ninja2.png","ninja2.png");
  jungleImage = loadImage("bg.png");
  kImg=loadImage("king.png");
  kunaiImage=loadImage("kunai knife.png");
  obstacle1 = loadImage("samurai.png");
  obstacle2 = loadImage("samurai1.png");

  gameOverImg = loadImage("game-over.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 jungle = createSprite(300,100,800,400);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.7

 n= createSprite(270,height-150,10,50);
 n.addAnimation("running",nImg);
 n.scale=0.6;

 kunai= createSprite(380,height-150,10,50);
 kunai.addImage("throwing",kunaiImage);
 kunai.scale=0.1;
 
 king= createSprite(90,height-150,50,50);
 king.addImage("running",kImg);
 king.scale=0.5;

 invisibleGround = createSprite(350,windowHeight,1600,10);
 invisibleGround.visible = true;

  gameOver = createSprite(450,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(450,150);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;
  

  obstaclesGroup = new Group();
  
  score = 0;
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    kunai[kunai.length - 1].shoot();
  }
}


function draw(){

  background(0);
  jungle.velocityX=-0.4;
  if(jungle.x<250)
    {
       jungle.x=400
    }
    
     spawnObstacles();
    drawSprites();
  


    fill("#6d4c41");
    textSize(40);
    text(`Score:${score}`, width - 200, 50)
}
 


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth,height-150,10,50);

     obstacle.velocityX = -(6 + 3*score/100);
    
     var rand = Math.round(random(1,2));
     switch(rand){
     case 1: obstacle.addImage( obstacle1);
     break;
     case 2: obstacle.addImage(obstacle2);
     break;
     default:break;

    }
            
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

if(){
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "restart"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}



if(obstaclesGroup.isTouching(king)){
  gameState = END;
}

else if (gameState === END) {
gameOver.visible = true;
restart.visible = true;

ground.velocityX = 0;
obstaclesGroup.setVelocityXEach(0);

obstaclesGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
reset();
}
drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 
  score = 0;
  
}
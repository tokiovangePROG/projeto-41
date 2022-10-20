/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisibleJungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

var shrub1,shrub2,shrub3, shrubsGroup;

function preload(){
  kangaroo_running =   loadAnimation("kangaroo1.png","kangaroo2.png","kangaroo3.png");
  kangaroo_collided = loadAnimation("kangaroo1.png");
  jungleImage = loadImage("bg.png");

  shrub1 = loadImage("shrub1.png");
  shrub2 = loadImage("shrub2.png");
  shrub3 = loadImage("shrub3.png");

  obstacle1 = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(50,300,20,50);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.15;
  kangaroo.setCollider("circle",0,0,300)

  invisibleJungle = createSprite(600,360,1600,20);
  invisibleJungle.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  //depure o código abaixo
  kangaroo.x = camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(kangaroo.y)
    if(keyDown("space")&& kangaroo.y>270) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();
    kangaroo.collide(invisibleJungle);
    
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    //defina a velocidade de cada objeto do jogo para 0
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    //mudar a animação do trex
    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    //definir a vida útil dos objetos do jogo para que nunca sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
  }

  
  drawSprites();


}

function spawnShrubs() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 150 === 0) {

    //encontre o bug no código abaixo
    var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      //encontre o bug
      case 1: shrub.addImage(shrub1);
       break;
        case 2: shrub.addImage(shrub2);
          break;
            case 3: shrub.addImage(shrub3);
              break;
                default: break;
    }
    
    //atribuir escala e vida ao arbusto         
    shrub.scale = 0.05;
     //atribuir vida útil à variável
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    //adicione cada nuvem ao grupo
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;
    //atribuir escala e vida ao obstáculo          
 
    obstacle.lifetime = 400;
    //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
    
  }
}
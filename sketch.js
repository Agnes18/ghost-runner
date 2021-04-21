var tower,ghost,door,climber,invisibleBlock;
var towerImg,ghostImg,climberImg,doorImg;
var gameState = "play";

var doorsGroup,climbersGroup , invisibleBlocksGroup;

function preload()
{
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav")
}


function setup()
{
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
}

function draw()
{
  background(0);
  if (gameState ==="play")
  {
    if(tower.y>400)
    {
      tower.y = 300;
    }
    
    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x-3;
    }
    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x+3;
    }
    if(keyDown("space"))
    {
      ghost.velocityY=-10;
    }
    ghost.velocityY = ghost.velocityY+0.8;
    
    spawnDoors();
    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
    if(ghost.y>600||invisibleBlockGroup.isTouching(ghost))
    {
      ghost.destroy();
      gameState = "end";
    }
    spookySound.play();
    
    drawSprites();
  }
  if (gameState==="end")
  {
     fill("lightgreen");
    textSize(23);
    text("GAME OVER",200,200);
  }
}
function spawnDoors()
{
   if(frameCount%240===0)
   {
     door = createSprite(200,-50);
     climber = createSprite(200,10);
     invisibleBlock = createSprite(200,15);
     door.addImage(doorImg);
     climber.addImage(climberImg);
     
     door.x = Math.round(random(120,400));
     climber.x = door.x;
     invisibleBlock.x = door.x;
     
     invisibleBlock.width = climber.width
     invisibleBlock.height =  2;
     
     door.velocityY = 1;
     climber.velocityY = 1;
     invisibleBlock.velocityY = 1;
     
     ghost.depth = door.depth;
     ghost.depth += 1;
     
     doorsGroup.add(door);
     climbersGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
   }
  
}








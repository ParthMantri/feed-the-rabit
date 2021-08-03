var garden,rabbit,h_holder;
var gardenImg,rabbitImg;
var i = 1;
var health = 200;
const ding = new Audio("ring.mp3");
var game_state;
//hel = 200
//window.health = hel


function preload()
{
  heart = loadImage("love.jpg")
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  apple_img = loadImage("apple.png");
  leaf_img = loadImage("leaf.png");
  

  const audio = new Audio("Birds-chirping-sound-effect.mp3");
  audio.play();
  audio.loop =true;  
}


function setup()
{
  createCanvas(400,400);
  
//var holder = createSprite(350,350,100,100)
//holder.depth = background.depth + 1


// Moving background
  garden=createSprite(200,200);
  garden.addImage(gardenImg);
  //garden.scale = 0.8
  

  //creating the health bar
  bar = createSprite(200,5,400,10);
  bar.shapeColor = "black";
  health_bar = createSprite(health/2,5,health,10)
  health_bar.shapeColor = "blue";

  //creating rabbit running
  rabbit = createSprite(180,340,10,10);
  rabbit.scale =0.035;
  rabbit.addImage(rabbitImg);

  //creating the ground
  g1 = createSprite(200,340,400,10)
  g1.visible = false

  h_holder = createSprite(200,5,100,100);
  h_holder.addImage(heart)
  h_holder.scale = 0.1

  aa = createSprite(200,340,1,1)

  ll = createSprite(200,340,1,1)

  game_state = "play"
}

function createApples(){
  //createApples();
  eval('var apple' + String(i) +' = createSprite(random(50,350),40,10,10)');
  eval('apple' + String(i) + '.addImage(apple_img)');
  eval('apple' + String(i) +'.scale = 0.035');
  eval('apple' + String(i)+ '.depth = garden.depth+1');
  eval('apple' + String(i) + '.setVelocity(0,8)');
  eval('apple' + String(i) + '.lifetime = 40');
  aa = eval('apple' + String(i));
  i = 1 + 1;
}

function createLeaves()
{
  leaf = createSprite(random(50,350),40,10,10);
  leaf.addImage(leaf_img);
  leaf.scale = 0.035;
  leaf.depth = garden.depth+1;
  leaf.setVelocity(0,8);
  leaf.lifetime = 40;
  ll = leaf;
  
}

function hb_color()
{
  if (health <= 100){health_bar.shapeColor = rgb(255,0,0)}
  if (health > 100 && health <= 250){health_bar.shapeColor = rgb(0,0,255)}
  if (health > 250){health_bar.shapeColor = rgb(0,255,0)}
  health_bar.width = health;    
  health_bar.x = health/2;
}

function game_over(){
  //rabbit.x = 0;
  //rabbit.y = 0;
  rabbit.setVelocity = 0;
  game_state = "end"
  text("GAME OVER", 200, 200)
}
  

function draw() 
{
  if(game_state == "play")
  {

    h_holder.x = health+10
    if(health>400){health = 400}
    rabbit.scale = 0.035 + health/10000;

    
    
  if(keyDown("right")){
    rabbit.x=rabbit.x+10
    health = health-0.5
    hb_color();
  }

  if(keyDown("left")){
    rabbit.x=rabbit.x-10
    health = health-0.5
    hb_color();
  }
  
var selectsprites = Math.round(random(1,2))
  if (frameCount % 50 == 0)
  {
    if (selectsprites==1)
    {
      createApples();
      //garden.scale = 1 + Math.random(0, 0.05)
      rabbit.y += 10
      
    }
    else
    {
        createLeaves();
        //garden.scale = 1 + Math.random(0, 0.05)
        rabbit.y -= 10
    }
  }

  aa.collide(g1);
  ll.collide(g1);
  

  if (aa.isTouching(rabbit)){
    aa.destroy();
    ding.play();
    health = health+20
    hb_color();
   }
  
   if (ll.isTouching(rabbit)){
    ll.destroy();
    ding.play();
    health = health+20
    hb_color();
   }
  
  if (health <0){game_over()}

  background(0);
  edges= createEdgeSprites();
  rabbit.collide(edges);
  
  drawSprites();
  }
  if(game_state == "end")
  {
    Text("GAME OVER", 200, 200)
  }
}
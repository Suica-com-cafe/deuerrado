const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var boatAnimation = [];
var boatbroking = [];
var spriteSheet
var spriteData
var spriteSheetBroken
var spriteDataBroken
var isGameOver = false;
waterSong, pirateLaugh, backgorundMusic, cannonExplosion

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  spriteSheet = loadImage("./assets/boat/boat.png");
  spriteData = loadJSON("./assets/boat/boat.json");
  spriteSheetBroken = loadImage("./assets/boat/brokenBoat.png");
  spriteDataBroken = loadJSON("./assets/boat/brokenBoat.json");
  waterSong = loadSound("./assets/cannon_water.mp3");
  pirateLaugh = loadSound("./assets/cannon_explosion.mp3");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  cannonExplosion = loadSound("./assets/pirate_laugh.mp3");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  var frames = spriteData.frames
  for(var i=0;i < frames.length; i++)
  {
    var pos = frames[i].position
    var img = spriteSheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }
  var framesBroken = spriteDataBroken.frames
  for(var i=0;i < framesBroken.length; i++)
  {
    var pos = framesBroken[i].position
    var img = spriteSheetBroken.get(pos.x,pos.y,pos.w,pos.h);
    boatbroking.push(img);
  }

  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  
  if(!backgorundMusic.isPlaying())
  {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();


}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
        boats[i].animar();
        var collision = Matter.SAT.collides(this.tower,boats[i].body);
        if(collision.collided && !boats[i].isBroken)
        {

        }
        isGameOver = true;
        gameOver();
      } else {
        boats[i];
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}
function gameOver()
{
  ({ 
  title: `Fim de Jogo!!!`, 
  text: "Obrigada por jogar!!", 
  imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png", 
  imageSize: "150x150", 
  confirmButtonText: "Jogar Novamente" }, 
  function(isConfirm) 
  { if(isConfirm) { 
    location.reload(); 
    } 
  });
}
function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    balls[balls.length - 1].shoot();
  }
}

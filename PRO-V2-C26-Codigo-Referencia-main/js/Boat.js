class Boat {
  constructor(x, y, width, height, boatPos, animation) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.boatPosition = boatPos;
    this.isBroken = false;
    this.image = loadImage("./assets/boat.png");
    this.animation = animation
    this.speed = 0.25;

    World.add(world, this.body);
  }

  remove(index) {
    this.animation = boatbroking 
    this.width = 300;
    this.height = 300;
    setTimeout(() => {
      Matter.World.remove(world, boats[index].body);
      boats.splice(index)
    }, 2000);
  }
  animar()
  {
    this.speed += 0.07;
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var indice = floor(this.speed%this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[indice], 0, this.boatPosition, this.width, this.height);
    
    pop();
  }
}

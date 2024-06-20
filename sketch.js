let dino;
let obstacles = [];
let farClouds = [];
let closeClouds = [];
let score = 0;

function setup() {
  createCanvas(1000, 500);
  dino = new Dino();
}

function draw() {
  background(0, 0, 100);

  
  textSize(30);
  text('Score: ' + score, 10, 30);

  
  dino.update();
  dino.show();

 
  if (frameCount % 100 === 0) {
    farClouds.push(new FarCloud());
  }

 
  if (frameCount % 150 === 0) {
    closeClouds.push(new CloseCloud());
  }

  
  for (let i = farClouds.length - 1; i >= 0; i--) {
    farClouds[i].update();
    farClouds[i].show();

    if (farClouds[i].offscreen()) {
      farClouds.splice(i, 1);
    }
  }

 
  for (let i = closeClouds.length - 1; i >= 0; i--) {
    closeClouds[i].update();
    closeClouds[i].show();

    if (closeClouds[i].offscreen()) {
      closeClouds.splice(i, 1);
    }
  }

  
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].hits(dino)) {
      gameOver();
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    dino.jump();
  }
}

function gameOver() {
  noLoop();
  console.log('Game Over');
  
}

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.isJumping = false;
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = -15;
      this.isJumping = true;
    }
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    if (this.y >= height - 50) {
      this.y = height - 50;
      this.velocityY = 0;
      this.isJumping = false;
    }
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, 50, 50);
  }
}

class Obstacle {
  constructor() {
    this.x = width;
    this.y = height - 50;
    this.width = 30;
    this.height = 30;
    this.speed = 5;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }

  hits(dino) {
    return (
      dino.x + 50 > this.x &&
      dino.x < this.x + this.width &&
      dino.y + 50 > this.y
    );
  }
}

class FarCloud {
  constructor() {
    this.x = width;
    this.y = random(20, 100);
    this.width = 100;
    this.height = 20;
    this.speed = 1;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(200);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

class CloseCloud {
  constructor() {
    this.x = width;
    this.y = random(20, 130);
    this.width = 40;
    this.height = 20;
    this.speed = 7;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(150);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

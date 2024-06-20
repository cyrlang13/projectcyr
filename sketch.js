let dino;
let obstacles = [];
let farClouds = [];
let closeClouds = [];
let mountain = [];
let bush = [];
let score = 0;
let imgHuman, imgObstacle;


function preload() {
  imgHuman = loadImage('img/human.jpg');
  imgObstacle = loadImage('img/169958141.png');
}

function setup() {
  createCanvas(1000, 500);
  dino = new Dino();
}

function draw() {
  background(0, 0, 100);

  textSize(30);
  text('Score: ' + score, 10, 30);
  

  if (frameCount % 150 === 0) {
    closeClouds.push(new Bush());
  }
  dino.update();

  if (frameCount % 100 === 0) {
    farClouds.push(new FarCloud());
  }


  if (frameCount % 150 === 0) {
    closeClouds.push(new CloseCloud());
  }

  if (frameCount % 150 === 0) {
    closeClouds.push(new Mountain());
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

  dino.show();


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
  textSize(100);
  textAlign(CENTER, CENTER);
  // fill(); 게임오버 텍스트 컬러 바꾸기
  text("game Over", width/2, height/2);
  noLoop();
  console.log('Game Over');
}

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.velocityY = 0;
    this.gravity = 0.5; //얼마나 높이 뛸수있는지
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
    //여기 캐릭터 이미지
    image(imgHuman, this.x, this.y - 45, 50, 90);
    // rect(this.x, this.y, 50, 50);

    if(this.isJumping){
      image(imgHuman, this.x, this.y - 45, 50, 90);
      //점프할때 또다른 이미지 소스 넣어주기
    } else {
      image(imgHuman, this.x, this.y - 45, 50, 90);
    }
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
    //여기 장애물 이미지
    image(imgObstacle, this.x, this.y, 30, 30);
    // rect(this.x, this.y, this.width, this.height);
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

  show() { //far cloud 
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
    this.speed = 10;
  }

  update() {
    this.x -= this.speed;
  }

  show() { //close cloud
    fill(150);
    //2:1비율 구름 image를 넣으세요
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

class Mountain {
     constructor() {
        this.x = width;
        this.y = random(500, 130);
        this.width = 1500;
        this.height = 1000;
        this.speed = 1;
      }
    
      update() {
        this.x -= this.speed;
      }
    
      show() {
        fill(0);
        
        rect(this.x, this.y, this.width, this.height);
      }
    
      offscreen() {
        return this.x + this.width < 0;
      }
}

// class Bush {
//     constructor() {
//         this.x = width;
//         this.y = random(1000, 10);
//         this.width = 1500;
//         this.height = 50;
//         this.speed = 7;
//       }
    
//       update() {
//         this.x -= this.speed;
//       }
    
//       show() {
//         fill(50, 200, 70);
        
//         rect(this.x, this.y, this.width, this.height);
//       }
    
//       offscreen() {
//         return this.x + this.width < 0;
//       }
// }
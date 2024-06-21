let dino;
let obstacles = [];
let farClouds = [];
let closeClouds = [];
let mountain = [];
let bush = [];
let bird = [];
let score = 0;

let imgHuman, imgObstacle, imgBird, imgFarCloud, imgCloseCloud, imgMountain, imgBush;

function preload() {
  imgHuman = loadImage('img/human.png');
  imgObstacle = loadImage('img/169958141.png');
  imgBird = loadImage('img/bird.png');
  imgFarCloud = loadImage('img/farcloud.png');
  imgCloseCloud = loadImage('img/closecloud.png');
  imgMountain = loadImage('img/mountain.png');
  imgBush = loadImage('img/bush.png');
}

function setup() {
    createCanvas(1000, 500);
    dino = new Dino();
    bird.push(new Bird());
    closeClouds.push(new CloseCloud()); // closeClouds 배열 초기화
    farClouds.push(new FarCloud()); // farClouds 배열 초기화
  }

function draw() {
    background(0, 0, 100);
  
    textSize(30);
    fill(255);
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
        closeClouds.push(new Bird());
    
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
    fill(255);
    text("!!넘어졌다!!", width / 2, height / 2);
    noLoop();
    console.log('!!넘어졌다!!');
  }
  
  // Dino class

class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.velocityY = 0;
    this.gravity = 0.7; //얼마나 높이 뛸수있는지
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
    image(imgHuman, this.x, this.y - 45, 90, 90);
    // rect(this.x, this.y, 50, 50);

//     if (this.isJumping) {
//       image(imgHuman, this.x, this.y - 45, 50, 90);
//       //점프할때 또다른 이미지 소스 넣어주기
//     } else {
//       image(imgHuman, this.x, this.y - 45, 50, 90);
//     }
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
    image(imgObstacle, this.x, this.y, 50, 50);
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

  show() {
    //far cloud 
    fill(200);
    image(imgFarCloud, this.x, this.y - 45, 200, 100);
    //rect(this.x, this.y, this.width, this.height);
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

  show() {
    //close cloud
    fill(150);
    image(imgCloseCloud, this.x, this.y, 120, 60);
    //2:1비율 구름 image를 넣으세요
    //rect(this.x, this.y, this.width, this.height);
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
    image(imgMountain, this.x, this.y, 500, 400)
    //rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

class Bush {
  constructor() {
    this.x = width;
    this.y = height - 85;
    this.width = 70;
    this.height = 70;
    this.speed = 7;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(50, 200, 70);
    image(imgBush, this.x, this.y, 80, 80)
    //rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}

class Bird {
  constructor() {
    this.x = -50;
    this.y = random(100, 200);
    this.width = 50;
    this.height = 30;
    this.speed = 1;
    this.isActive = true;
  }

  update() {
    if (this.isActive) {
      this.x += this.speed; // 오른쪽으로 이동
    }
  }

  show() {
    if (this.isActive) {
      fill(50, 200, 200);
      image(imgBird, this.x, this.y - 45, 100, 90); // 이미지로 변경
    }
  }

  offscreen() {
    if (this.x > width) { // 화면 오른쪽 경계선을 벗어났을 때
      this.isActive = false; // 비활성화
      return true;
    }
    return false;
  }
}


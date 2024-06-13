let x = 0;
let y = 0;
let easing = 0.01;

function setup() {
createCanvas(1280, 800);

}

function draw(){
    let targetX = mouseX;
    let dx = targetX - x;
    x += dx * easing;
    let targetY = mouseY;
    let dy = targetY - y;
    y += dy * easing;

    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
   d = map(d, 0, 800, 20, 200);
    ellipse(x, height/2, 100);
}

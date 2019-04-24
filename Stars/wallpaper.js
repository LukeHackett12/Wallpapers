var NUM_STARS = 200;
var PROXIMITY = 150;

var backgroundImage;
var foregroundImage;

var stars;
var lines;

function setup() {
  createCanvas(3200, 1800);
  //fullScreen();

  stars = [];
  lines = [];
  for (var i = 0; i < NUM_STARS; i++) {
    stars.push(new Star(random(-1, 1), random(0.2, 2), random(1,3.5), random(0, width), random(0, height)));
  }

  backgroundImage = loadImage("assets/29pUy.jpg");
  foregroundImage = loadImage("assets/cropped.png");
}

function draw() {
  print(mouseX + "  " + mouseY);
  image(backgroundImage, 0, 0);
  getProximities();

  for (var i = 0; i < NUM_STARS; i++) {
    stars[i].display();
  }
  for (var j = 0; j < lines.length; j++) {
    lines[j].display();
  }
  image(foregroundImage, 0, 0);
}

function getProximities() {
  lines = [];
  for (var i = 0; i < NUM_STARS; i++) {
    s = stars[i];

    if (dist(s.xPos, s.yPos, mouseX, mouseY) < PROXIMITY) {
      lines.push(new Line(s.xPos, s.yPos, mouseX, mouseY));
    }
  }
}

class Star {
  constructor(speedX, speedY, size, xPos, yPos) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  fall() {
    this.yPos += this.speedY;
    this.xPos += this.speedX;
  }
  reset() {
    this.speedX = random(-1, 1);
    this.speedY = random(0.2, 3);
    this.size = random(1,3.5);
    this.xPos = random(0, width);
    this.yPos = 0;
  }

  display() {
    if (this.yPos > height || (this.xPos > width || this.xPos < 0)) {
      this.reset();
    }

    this.fall();
    noStroke();
    fill(255, 255, 255);
    ellipse(this.xPos, this.yPos, this.size, this.size);
  }
}

class Line {
  constructor(startX, startY, endX, endY) {
    this.start = new Point(startX, startY);
    this.end = new Point(endX, endY);
  }

  display() {
    stroke(160);
    line(this.start.xPos, this.start.yPos, this.end.xPos, this.end.yPos);
  }
}

class Point {

  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}
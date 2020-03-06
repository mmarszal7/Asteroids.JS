import { canvas, canvasWidth, canvasHeight, ctx } from "./Constants.js";

export class Ship {
  constructor() {
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.movingForward = false;
    this.speed = 0.1;
    this.velX = 0;
    this.velY = 0;
    this.rotateSpeed = 0.001;
    this.radius = 15;
    this.angle = 0;
    this.strokeColor = "white";
    this.lives = 3;

    this.noseX = canvasWidth / 2 + this.radius;
    this.noseY = canvasHeight / 2;
  }

  Rotate(dir) {
    this.angle += this.rotateSpeed * dir;
  }

  Update() {
    let radians = (this.angle / Math.PI) * 180;
    if (this.movingForward) {
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    }

    if (this.x < this.radius) this.x = canvas.width;
    if (this.x > canvas.width) this.x = this.radius;
    if (this.y < this.radius) this.y = canvas.width;
    if (this.y > canvas.width) this.y = this.radius;

    this.velX *= 0.99; // slow down
    this.velY *= 0.99; // slow down
    this.x -= this.velX;
    this.y -= this.velY;
    this.Draw();
  }

  Draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    let numberOfAngles = 3;
    let vertAngle = (Math.PI * 2) / numberOfAngles;
    let radians = (this.angle / Math.PI) * 180;
    for (let i = 0; i < numberOfAngles; i++) {
      // middle - ship size projected on the X/Y axis (projection angle = angle of the ship + angle of each polygon's side)
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
    }
    ctx.closePath();
    ctx.stroke();

    this.noseX = this.x - this.radius * Math.cos(radians);
    this.noseY = this.y - this.radius * Math.sin(radians);
    ctx.beginPath();
    ctx.arc(this.noseX, this.noseY, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }

  Respawn() {
    this.x = canvasWidth / 2;
    this.y = canvasWidth / 2;
    this.velX = 0;
    this.velY = 0;
    this.lives -= 1;
  }
}

import { canvas, canvasWidth, canvasHeight, ctx } from "./Constants.js";

export class Asteroid {
  constructor(x, y, radius, level, collisionRadius) {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * canvasWidth);
    this.y = y || Math.floor(Math.random() * canvasHeight);
    this.speed = 3;
    this.radius = radius || 50;
    this.angle = Math.floor(Math.random() * 359);
    this.strokeColor = "white";
    this.collisionRadius = collisionRadius || 45;
    this.level = level || 1;
  }

  Update() {
    var radians = (this.angle / Math.PI) * 180;
    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;

    if (this.x < this.radius) this.x = canvas.width;
    if (this.x > canvas.width) this.x = this.radius;
    if (this.y < this.radius) this.y = canvas.width;
    if (this.y > canvas.width) this.y = this.radius;
    this.Draw();
  }

  Draw() {
    ctx.beginPath();
    let numberOfAngles = 6;
    let vertAngle = (Math.PI * 2) / numberOfAngles;
    let radians = (this.angle / Math.PI) * 180;
    for (let i = 0; i < numberOfAngles; i++) {
      ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
    }
    ctx.closePath();
    ctx.stroke();
  }
}

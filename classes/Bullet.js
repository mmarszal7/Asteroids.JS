import { ctx } from "./Constants.js";

export class Bullet {
  constructor(angle, x, y) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.height = 4;
    this.width = 4;
    this.speed = 5;
  }

  Update() {
    var radians = (this.angle / Math.PI) * 180;
    this.x -= Math.cos(radians) * this.speed;
    this.y -= Math.sin(radians) * this.speed;
    this.Draw();
  }

  Draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

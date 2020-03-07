import { ctx } from "./Constants.js";

const height = 4;
const width = 4;
const speed = 5;

export class Bullet {
  constructor(angle, x, y) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  Update() {
    var radians = (this.angle / Math.PI) * 180;
    this.x -= Math.cos(radians) * speed;
    this.y -= Math.sin(radians) * speed;
    this.Draw();
  }

  Draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, width, height);
  }
}

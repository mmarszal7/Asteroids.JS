import { ctx, inRadians } from "./Constants.js";

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
    this.x -= Math.cos(inRadians(this.angle)) * speed;
    this.y -= Math.sin(inRadians(this.angle)) * speed;
    this.Draw();
  }

  Draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, width, height);
  }
}

import { canvasWidth, canvasHeight, drawPolygon, inRadians, moveIfOutsideOfGameArea } from "./Constants.js";

const speed = 3;

export class Asteroid {
  constructor(x, y, radius, level, collisionRadius) {
    this.x = x || Math.floor(Math.random() * canvasWidth);
    this.y = y || Math.floor(Math.random() * canvasHeight);
    this.radius = radius || 50;
    this.angle = Math.floor(Math.random() * 359);
    this.collisionRadius = collisionRadius || 45;
    this.level = level || 1;
  }

  Update() {
    this.x += Math.cos(inRadians(this.angle)) * speed;
    this.y += Math.sin(inRadians(this.angle)) * speed;

    [this.x, this.y] = moveIfOutsideOfGameArea(this.x, this.y, this.radius);
    this.Draw();
  }

  Draw() {
    drawPolygon(this.x, this.y, this.angle, this.radius, 6)
  }
}

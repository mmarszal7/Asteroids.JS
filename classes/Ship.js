import { canvasWidth, canvasHeight, ctx, drawPolygon, inRadians, moveIfOutsideOfGameArea } from "./Constants.js";

const radius = 15;
const speed = 0.1;
const rotateSpeed = 0.001;

export class Ship {
  constructor() {
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.movingForward = false;
    this.velX = 0;
    this.velY = 0;
    this.angle = 0;
    this.lives = 3;

    this.noseX = canvasWidth / 2 + radius;
    this.noseY = canvasHeight / 2;
  }

  Rotate(dir) {
    this.angle += rotateSpeed * dir;
  }

  Update() {
    if (this.movingForward) {
      this.velX += Math.cos(inRadians(this.angle)) * speed;
      this.velY += Math.sin(inRadians(this.angle)) * speed;
    }

    [this.x, this.y] = moveIfOutsideOfGameArea(this.x, this.y, radius);

    this.velX *= 0.99; // slow down
    this.velY *= 0.99; // slow down
    this.x -= this.velX;
    this.y -= this.velY;
    this.Draw();
  }

  Draw() {
    drawPolygon(this.x, this.y, this.angle, radius, 3)

    this.noseX = this.x - radius * Math.cos(inRadians(this.angle));
    this.noseY = this.y - radius * Math.sin(inRadians(this.angle));
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

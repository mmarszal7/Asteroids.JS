import { Ship } from "./classes/Ship.js";
import { Bullet } from "./classes/Bullet.js";
import { Asteroid } from "./classes/Asteroid.js";
import { canvas, canvasWidth, canvasHeight, ctx } from "./classes/Constants.js";

let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.body.addEventListener("keydown", e => (keys[e.keyCode] = true));
  document.body.addEventListener("keyup", e => {
    keys[e.keyCode] = false;
    if (e.keyCode === 32) {
      bullets.push(new Bullet(ship.angle, ship.noseX, ship.noseY));
    }
  });

  ship = new Ship();

  for (let i = 0; i < 8; i++) {
    asteroids.push(new Asteroid());
  }

  Render();
}

function Render() {
  ship.movingForward = keys[87];
  if (keys[68]) ship.Rotate(1);
  if (keys[65]) ship.Rotate(-1);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ship.Update();
  bullets.forEach(b => b.Update());
  asteroids.forEach(a => a.Update());
  requestAnimationFrame(Render);
}

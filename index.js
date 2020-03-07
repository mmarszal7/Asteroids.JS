import { Ship } from "./classes/Ship.js";
import { Bullet } from "./classes/Bullet.js";
import { Asteroid } from "./classes/Asteroid.js";
import { canvas, canvasWidth, canvasHeight, ctx, checkCollisions } from "./classes/Constants.js";

let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let score = 0;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.strokeStyle = 'white';
  document.body.addEventListener("keydown", e => (keys[e.keyCode] = true));
  document.body.addEventListener("keyup", e => {
    keys[e.keyCode] = false;
    if (e.keyCode === 32 && ship.visible) {
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

  drawScoreboard();
  checkAllCollisions();

  if (ship.visible) ship.Update();
  bullets.forEach(b => b.Update());
  asteroids.forEach(a => a.Update());
  requestAnimationFrame(Render);
}

function drawScoreboard() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
  ctx.font = "21px Arial";

  for (let i = 0; i < ship.lives; i++) {
    ctx.beginPath();
    ctx.arc(canvasWidth - 100 + (i * 30), 28, 10, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.fillText("SCORE: " + score.toString(), 20, 35);
  ctx.fillText("LIVES:", canvasWidth - 190, 35);
  if (ship.lives <= 0) {
    ship.visible = false;
    ctx.fillText("GAME OVER", canvasWidth / 2 - 60, canvasHeight / 2);
  }
}

function checkAllCollisions() {
  asteroids.forEach(a => {
    if (checkCollisions(ship.x, ship.y, 11, a.x, a.y, a.collisionRadius)) {
      ship.Respawn();
    }
  });

  asteroids.forEach((a, i) => {
    bullets.forEach((b, j) => {
      if (checkCollisions(a.x, a.y, a.collisionRadius, b.x, b.y, 3)) {
        if (a.level < 3) {
          asteroids.push(new Asteroid(a.x - 5, a.y - 5, 30 / a.level, a.level + 1, 30 / a.level));
          asteroids.push(new Asteroid(a.x + 5, a.y + 5, 30 / a.level, a.level + 1, 30 / a.level));
        }
        asteroids.splice(i, 1);
        bullets.splice(j, 1);
        score += 20;
      }
    });
  });
}

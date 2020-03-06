import { Ship } from "./classes/Ship.js";
import { canvas, canvasWidth, canvasHeight, ctx } from "./classes/Constants.js";

let keys = [];
let ship;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.body.addEventListener("keydown", e => (keys[e.keyCode] = true));
  document.body.addEventListener("keyup", e => {
    keys[e.keyCode] = false;
  });

  ship = new Ship();
  Render();
}

function Render() {
  ship.movingForward = keys[87];
  if (keys[68]) ship.Rotate(1);
  if (keys[65]) ship.Rotate(-1);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ship.Update();
  requestAnimationFrame(Render);
}

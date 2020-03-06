const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 1400;
const canvasHeight = 1000;

function checkCollisions(p1x, p1y, r1, p2x, p2y, r2) {
  let radiusSum = r1 + r2;
  let xDiff = p1x - p2x;
  let yDiff = p1y - p2y;
  return radiusSum > Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export { canvas, ctx, canvasWidth, canvasHeight, checkCollisions };

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

function drawPolygon(x, y, angle, size, numberOfAngles) {
  ctx.beginPath();
  let vertAngle = (Math.PI * 2) / numberOfAngles;
  for (let i = 0; i < numberOfAngles; i++) {
    // middle - ship size projected on the X/Y axis (projection angle = angle of the ship + angle of each polygon's side)
    ctx.lineTo(x - size * Math.cos(vertAngle * i + inRadians(angle)), y - size * Math.sin(vertAngle * i + inRadians(angle)));
  }
  ctx.closePath();
  ctx.stroke();
}

function moveIfOutsideOfGameArea(x, y, radius) {
  if (x < radius)
    x = canvas.width;
  if (x > canvas.width)
    x = radius;
  if (y < radius)
    y = canvas.width;
  if (y > canvas.width)
    y = radius;

  return [x, y];
}

function inRadians(angle) {
  return (angle / Math.PI) * 180
}

export { canvas, ctx, canvasWidth, canvasHeight, checkCollisions, drawPolygon, inRadians, moveIfOutsideOfGameArea };

export default function computeSector(
  startX: number,
  startY: number,
  startAngle: number,
  endAngle: number,
  radius: number,
) {
  let startAngleRad = convertToRad(startAngle);
  let endAngleRad = convertToRad(endAngle);

  let lineX = isZero(radius * Math.cos(startAngleRad));
  let lineY = isZero(radius * Math.sin(startAngleRad));

  let largeArcFlag = endAngle - startAngle < 180 ? 0 : 1;

  let arcEndX = isZero(radius * Math.cos(endAngleRad) - lineX);
  let arcEndY = isZero(radius * Math.sin(endAngleRad) - lineY);

  let sectorParams = { lineX, lineY, largeArcFlag, arcEndX, arcEndY };
  return sectorParams;
}

function convertToRad(angle: number) {
  return (angle * Math.PI) / 180;
}

function isZero(num: number) {
  const EPSILON = 1e-10;
  num = Math.abs(num) < EPSILON ? 0 : num;
  return num;
}

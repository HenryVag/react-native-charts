//Helper function to calculate sector parameters

export default function computeSector(
  /**0-360 */
  startAngle: number,
  /**0-360 */
  endAngle: number,
  /**Sector size */
  radius: number,
) {
  let endAngleRad = convertToRad(endAngle);

  let lineX = calcLineX(radius, startAngle);
  let lineY = calcLineY(radius, startAngle);

  let largeArcFlag = endAngle - startAngle < 180 ? 0 : 1;

  let arcEndX = isZero(radius * Math.cos(endAngleRad) - lineX);
  let arcEndY = isZero(radius * Math.sin(endAngleRad) - lineY);

  let sectorParams = { lineX, lineY, largeArcFlag, arcEndX, arcEndY };
  return sectorParams;
}

function convertToRad(angle: number) {
  return (angle * Math.PI) / 180;
}

//Converts limit values to 0
function isZero(num: number) {
  const EPSILON = 1e-10;
  num = Math.abs(num) < EPSILON ? 0 : num;
  return num;
}

export function calcLineX(radius: number, startAngle: number) {
  let startAngleRad = convertToRad(startAngle);

  return isZero(radius * Math.cos(startAngleRad));
}

export function calcLineY(radius: number, startAngle: number) {
  let startAngleRad = convertToRad(startAngle);
  return isZero(radius * Math.sin(startAngleRad));
}

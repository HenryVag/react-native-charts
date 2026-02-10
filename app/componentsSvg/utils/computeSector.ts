//Helper function to calculate sector parameters

export default function computeSector(
  /**0-360 */
  startAngle: number,
  /**0-360 */
  endAngle: number,
  /**Sector size */
  radius: number,
  labelfontSize?: number,
  labelDistance?: number,
) {
  let endAngleRad = convertToRad(endAngle);
  let fontSize = labelfontSize ?? radius * 0.2;
  const labelDst = labelDistance ?? 1;

  let lineX = calcPointX(radius, startAngle);
  let lineY = calcPointY(radius, startAngle);

  let largeArcFlag = endAngle - startAngle < 180 ? 0 : 1;

  let arcEndX = isZero(radius * Math.cos(endAngleRad) - lineX);
  let arcEndY = isZero(radius * Math.sin(endAngleRad) - lineY);

  let midAngle = (startAngle + endAngle) / 2;

  let labelX =
    radius + calcPointX(1 + radius * labelDst, midAngle) / 2 - fontSize / 2;
  let labelY =
    radius - calcPointY(1 + radius * labelDst, midAngle) / 2 + fontSize / 2;

  let sectorParams = {
    lineX,
    lineY,
    largeArcFlag,
    arcEndX,
    arcEndY,
    labelX,
    labelY,
    fontSize,
  };
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

/**Calculates the X coordinates of a point on the arc based on the angle*/
export function calcPointX(radius: number, angle: number) {
  let angleRad = convertToRad(angle);

  return isZero(radius * Math.cos(angleRad));
}

/**Calculates the Y coordinates of a point on the arc based on the angle*/
export function calcPointY(radius: number, angle: number) {
  let angleRad = convertToRad(angle);
  return isZero(radius * Math.sin(angleRad));
}

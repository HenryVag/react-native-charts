/**
 * Calculates all necessary parameters to draw a PieChart sector and its label.
 *
 * @param startAngle - Sector start angle in degrees (0-360)
 * @param endAngle - Sector end angle in degrees (0-360)
 * @param radius - Radius of the sector
 * @param labelfontSize - Optional font size for the label
 * @param labelDistance - Optional distance factor for the label from the center
 * @returns Object containing:
 *   - lineX: X-coordinate of the line from center to start of the arc
 *   - lineY: Y-coordinate of the line from center to start of the arc
 *   - largeArcFlag: 0 or 1, used in SVG path to handle arcs > 180°
 *   - arcEndX: X-coordinate of the end point of the arc relative to start point
 *   - arcEndY: Y-coordinate of the end point of the arc relative to start point
 *   - labelX: X-coordinate of the label (centered in the sector)
 *   - labelY: Y-coordinate of the label (centered in the sector)
 *   - fontSize: Computed font size for the label
 */

const computeSector = (
	/**0-360 */
	startAngle: number,
	/**0-360 */
	endAngle: number,
	/**Sector size */
	radius: number,
	labelfontSize?: number,
	labelDistance?: number,
) => {
	//End angle in radians
	const endAngleRad = convertToRad(endAngle)

	const fontSize = labelfontSize
		? labelfontSize * radius * 0.0225
		: radius * 0.225
	const labelDst = labelDistance ?? 1

	//Drawing startpoints
	const lineX = calcPointX(radius, startAngle)
	const lineY = calcPointY(radius, startAngle)

	//Largearcflag is set to prevent incorrect drawing of sectors over 180 degrees
	const largeArcFlag = endAngle - startAngle < 180 ? 0 : 1

	//End points of the arc
	const arcEndX = isZero(radius * Math.cos(endAngleRad) - lineX)
	const arcEndY = isZero(radius * Math.sin(endAngleRad) - lineY)

	const midAngle = (startAngle + endAngle) / 2

	//Calculate label position to be in the middle of a sector
	const labelX = radius + calcPointX(1 + radius * labelDst, midAngle) / 2
	const labelY =
		radius - calcPointY(1 + radius * labelDst, midAngle) / 2 + fontSize / 2

	const sectorParams = {
		lineX,
		lineY,
		largeArcFlag,
		arcEndX,
		arcEndY,
		labelX,
		labelY,
		fontSize,
	}
	return sectorParams
}

/**Converts input angle to radians */
const convertToRad = (angle: number) => {
	return (angle * Math.PI) / 180
}

/**Converts limit values to 0 */
const isZero = (num: number) => {
	const EPSILON = 1e-10
	const int = Math.abs(num) < EPSILON ? 0 : num
	return int
}

/**Calculates the X coordinates of a point on the arc based on the angle*/
export const calcPointX = (radius: number, angle: number) => {
	const angleRad = convertToRad(angle)

	return isZero(radius * Math.cos(angleRad))
}

/**Calculates the Y coordinates of a point on the arc based on the angle*/
export const calcPointY = (radius: number, angle: number) => {
	const angleRad = convertToRad(angle)
	return isZero(radius * Math.sin(angleRad))
}

export default computeSector

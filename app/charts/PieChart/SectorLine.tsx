import { Path } from "react-native-svg";

type SectorLineProps = {
  /** Drawing startpoint x */
  startX: number;
  /** Drawing startpoint y */
  startY: number;
  /**Line endpoint x */
  centerX: number;
  /**Line endpoint y */
  centerY: number;
  endY: number;
  endX: number;
  /**PieChart radius for strokeWdth calc */
  radius: number;
  /**Difference between the startangle and endangle of the sector */
  sectorAngle: number;
  /**Color of sector radius lines (optional) */
  sectorStroke?: string;
  /**Strokewidth of sector radius lines (optional) */
  sectorStrokeWidth?: number;
  /**Threshold that defines at which angle the strokewidht is increased (optional) */
  sectorStrokeWidthThreshold?: number;
};

/**
 * SectorLine component
 *
 * Renders a line extending from the pie chart center to the sector's edge.
 * Can be used to visually connect sectors or highlight sector boundaries.
 *
 * @param props.startX - X coordinate of the sector start point (edge of the sector)
 * @param props.startY - Y coordinate of the sector start point (edge of the sector)
 * @param props.centerX - X coordinate of the pie chart center
 * @param props.centerY - Y coordinate of the pie chart center
 * @param props.endX - X offset for the end of the line relative to the start
 * @param props.endY - Y offset for the end of the line relative to the start
 * @param props.radius - Pie chart radius, used for default strokeWidth calculation
 * @param props.sectorAngle - Angle span of the sector in degrees
 * @param props.sectorStroke - Optional stroke color of the line
 * @param props.sectorStrokeWidth - Optional stroke width of the line
 * @param props.sectorStrokeWidthThreshold - Optional threshold angle (degrees) for drawing the line
 *
 * @returns JSX.Element | false
 *
 * Renders:
 * - <Path />: the line from sector edge to pie center
 *   - Only renders if sectorAngle >= sectorStrokeWidthThreshold (default 361°, i.e., all angles)
 *   - `d` attribute uses:
 *       M startX,startY       -> move to start of the line
 *       L centerX,centerY     -> draw line to pie center
 *       l endX,endY           -> optional offset relative to start
 *   - stroke: color of the line
 *   - strokeWidth: either provided or default based on radius
 *   - fill: always "none"
 */

const SectorLine = ({
  startX,
  startY,
  centerX,
  centerY,
  endX,
  endY,
  radius,
  sectorAngle,
  sectorStroke,
  sectorStrokeWidth,
  sectorStrokeWidthThreshold,
}: SectorLineProps)  => {
  return (
    sectorAngle >= (sectorStrokeWidthThreshold || 361) && (
      <Path
        d={`M${startX} ${startY} L${centerX} ${centerY} l ${endX} ${endY} `}
        stroke={sectorStroke ? sectorStroke : "black"}
        strokeWidth={sectorStrokeWidth ??  radius * 0.0375}
        fill={"none"}
        accessible={false}
      />
    )
  );
}

export default SectorLine
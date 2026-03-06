import { Path, Text } from "react-native-svg";
import computeSector from "../utils/PieChart/computeSector";

type SectorProps = {
  /** Drawing startpoint x */
  startX: number;
  /** Drawing startpoint y */
  startY: number;
  /**0-360 */
  startAngle: number;
  /**0-360 */
  endAngle: number;
  /**Sector size */
  radius: number;
  /**Stroke color (optional)*/
  stroke?: string;
  /**Strokewidth of Sector (optional) */
  strokeWidth?: number;
  /**Color fill */
  fill?: string;
  showLabels: boolean;
  /**Displayed label */
  label?: number | string;
  /**Font used for labels (optional) */
  labelFont?: string;
  /**Label font size (optional) */
  labelFontSize?: number;
  /**Distance between circle midpoint and label (optional)*/
  labelDistance?: number;
};

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
 * Sector component
 *
 * Renders a single pie chart sector with an optional label.
 *
 * @param props.startX - X coordinate of the pie chart center
 * @param props.startY - Y coordinate of the pie chart center
 * @param props.startAngle - Starting angle of the sector (0-360°)
 * @param props.endAngle - Ending angle of the sector (0-360°)
 * @param props.radius - Radius of the sector
 * @param props.stroke - Optional stroke color for the sector border
 * @param props.strokeWidth - Optional stroke width for the sector border
 * @param props.fill - Optional fill color of the sector
 * @param props.showLabels - Whether to display the sector label
 * @param props.label - Label value displayed in the center of the sector
 * @param props.labelFont - Optional font for the label
 * @param props.labelFontSize - Optional font size for the label
 * @param props.labelDistance - Optional distance multiplier for label placement
 *
 * @returns JSX.Element
 * 
 * Renders:
 * 1. <Path /> - The actual SVG arc for the sector
 *    - Uses startX/startY as the center
 *    - Uses startAngle, endAngle, and radius to draw the arc
 *    - lineX, lineY: offset to arc start from center
 *    - arcEndX, arcEndY: offset from start point to arc end
 *    - largeArcFlag: determines if the arc is > 180°
 * 2. <Text /> (optional) - Label positioned at the midpoint of the sector
 *    - labelX, labelY: calculated coordinates for label placement
 *    - fontSize: calculated or default font size
 */

const Sector = ({
  startX,
  startY,
  startAngle,
  endAngle,
  radius,
  stroke,
  strokeWidth,
  fill,
  label,
  showLabels,
  labelFont,
  labelFontSize,
  labelDistance,
}: SectorProps) => {
  let {
    lineX,
    lineY,
    largeArcFlag,
    arcEndX,
    arcEndY,
    labelX,
    labelY,
    fontSize,
  } = computeSector(startAngle, endAngle, radius, labelFontSize, labelDistance);
  const isFullCircle = Math.abs(endAngle - startAngle) >= 359.9
  return (
  
      <>
        <Path
          d={isFullCircle ? `M${startX} ${startY} m${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z ` : `M${startX} ${startY} l${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z ` }
          stroke={stroke ? stroke : "black"}
          strokeWidth={strokeWidth ?? 0}
          fill={fill ? fill : "none"}
          accessible={false}      
          />
        {showLabels && (
          <Text x={labelX} y={labelY} textAnchor="middle" fontFamily={labelFont} fontSize={fontSize} aria-hidden={true} accessible={false} >
            {label}
          </Text>
        )}
      </>

  );
}

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

export const SectorLine = ({
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

export default Sector
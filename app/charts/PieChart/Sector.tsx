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
  const {
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

export default Sector
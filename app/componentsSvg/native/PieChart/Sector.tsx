import { Path } from "react-native-svg";
import computeSector from "../PieChart/utils/PieChart/computeSector";

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
  const isFullCircle = Math.abs(endAngle - startAngle) >= 359
  return (
    <>
      <Path
        d={isFullCircle ? `M${startX} ${startY} m${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z ` : `M${startX} ${startY} l${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z ` }
        stroke={stroke ? stroke : "black"}
        strokeWidth={strokeWidth ?? 0}
        fill={fill ? fill : "none"}
      />
      {showLabels && (
        <text x={labelX} y={labelY} textAnchor="middle" fontFamily={labelFont} fontSize={fontSize}>
          {label}
        </text>
      )}
    </>
  );
}

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
  console.log(sectorStrokeWidth, 1)
  return (
    sectorAngle >= (sectorStrokeWidthThreshold || 361) && (
      <Path
        d={`M${startX} ${startY} L${centerX} ${centerY} l ${endX} ${endY} `}
        stroke={sectorStroke ? sectorStroke : "black"}
        strokeWidth={sectorStrokeWidth ??  radius * 0.0375}
        fill={"none"}
      />
    )
  );
}

export default Sector
import { Path } from "react-native-svg";
import computeSector from "./utils/computeSector";

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
  /**Color fill */
  fill: string;
  /**Displayed data */
  label?: number | string;
  showLabels: boolean;
  labelFontSize?: number;
  /**Distance between circle midpoint and label */
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
  /**Radius for strokeWdth calc */
  radius: number;

  sectorAngle: number;
  innerStrokeWidthThreshold?: number;
};

export default function Sector({
  startX,
  startY,
  startAngle,
  endAngle,
  radius,
  fill,
  label,
  showLabels,
  labelFontSize,
  labelDistance,
}: SectorProps) {
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
  return (
    <>
      <Path
        d={`M${startX} ${startY} l${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z `}
        stroke="black"
        strokeWidth={radius / 100}
        fill={fill}
      />
      {showLabels && (
        <text
          x={labelX}
          y={labelY}
          fontFamily="Poppins_400Regular"
          fontSize={fontSize}
        >
          {label}
        </text>
      )}
    </>
  );
}

export function SectorLine({
  startX,
  startY,
  centerX,
  centerY,
  endX,
  endY,
  radius,
  sectorAngle,
  innerStrokeWidthThreshold,
}: SectorLineProps) {
  return (
    sectorAngle >= (innerStrokeWidthThreshold || 361) && (
      <Path
        d={`M${startX} ${startY} L${centerX} ${centerY} l ${endX} ${endY} `}
        stroke="black"
        strokeWidth={radius * 0.0375}
        fill={"none"}
      />
    )
  );
}

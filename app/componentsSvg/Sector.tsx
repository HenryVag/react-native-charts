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
};

type SectorLineProps = {
  /** Drawing startpoint x */
  startX: number;
  /** Drawing startpoint y */
  startY: number;
  /**Line endpoint x */
  lineX: number;
  /**Line endpoint y */
  lineY: number;
};

export default function Sector({
  startX,
  startY,
  startAngle,
  endAngle,
  radius,
  fill,
}: SectorProps) {
  let { lineX, lineY, largeArcFlag, arcEndX, arcEndY } = computeSector(
    startAngle,
    endAngle,
    radius,
  );

  console.log(
    startX,
    startY,
    "lineX:",
    lineX,
    "lineY:",
    lineY,
    "radius:",
    radius,
    "arcEndX:",
    arcEndX,
    "arcEndY:",
    arcEndY,
  );
  return (
    <>
      <Path
        d={`M${startX} ${startY} l${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z M${startX} ${startY} l${lineX} ${-lineY} `}
        stroke="black"
        strokeWidth={radius / 100}
        fill={fill}
      />
    </>
  );
}

export function SectorLine({ startX, startY, lineX, lineY }: SectorLineProps) {
  return (
    <Path
      d={`M${startX} ${startY} l${lineX} ${-lineY} `}
      stroke="black"
      strokeWidth={5}
      fill={"none"}
    />
  );
}

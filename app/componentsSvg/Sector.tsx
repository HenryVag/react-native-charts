import Svg, { Path } from "react-native-svg";
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
    <Svg width={400} height={400}>
      <Path
        d={`M${startX} ${startY} l${lineX} ${-lineY} a${radius} ${radius} 0 ${largeArcFlag} 0 ${arcEndX} ${-arcEndY} Z `}
        stroke="black"
        fill={fill}
      />
    </Svg>
  );
}

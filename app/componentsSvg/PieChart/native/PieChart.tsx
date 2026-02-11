import { View } from "react-native";
import Svg from "react-native-svg";
import computePieChart from "../../utils/computePieChart";
import PieChartPlaceHolder from "./PieChartPlaceholder";
import Sector, { SectorLine } from "./Sector";


const colors = ["#95D0E8", "#A179AA", "#C4A3CD", "#BDE2F3", "#E8F3F9"];

type PieChartProps = {
  /**Expects an array of objects */
  data: { group: string; value: number, fill:string; }[];
  /**Size of PieChart */
  radius: number;
  /**Show labels (optional) */
  showLabels: boolean;
  /**Stroke color */
  stroke?: string;
  /**Default strokewidth (optional)*/
  strokeWidth?: number;
  /**Font used for labels (optional) */
  labelFont?: string;
  /**Label font size (optional) */
  labelFontSize?: number;
  /**Distance between PieChart center and label (optional) */
  labelDistance?: number;
  /**Color of sector radius lines (optional) */
  sectorStroke?: string;
  sectorStrokeWidth: number
  /**Threshold in degrees to change sector radius strokewidth (optional)*/
  sectorStrokeWidthThreshold?: number;
};

const PieChart = ({
  data,
  radius,
  stroke,
  strokeWidth,
  showLabels,
  labelFont,
  labelFontSize,
  labelDistance,
  sectorStroke,
  sectorStrokeWidth,
  sectorStrokeWidthThreshold,
}: PieChartProps) => {
  let i = 0;
  strokeWidth = strokeWidth ?? 0

  let { sectorData, lineData } = computePieChart(data, radius, strokeWidth, sectorStroke);

  if (data.length > 1) {

    return (
      <View>
      <Svg
        width={radius * 10}
        height={radius * 10}
        viewBox={`-10 -10 ${radius * 2 + 20} ${radius * 2 + 20}`}
        >
        {sectorData.map((obj) => {
          
          const sector = (
            <Sector
            startX={radius}
            startY={radius}
            startAngle={obj.startAngle}
            endAngle={obj.endAngle}
            radius={obj.radius}
            stroke={stroke}
            strokeWidth={obj.strokeWidth}
            fill={obj.fill}
            label={obj.label}
            showLabels={showLabels}
            labelFont={labelFont}
            labelFontSize={labelFontSize}
            labelDistance={labelDistance}
            key={obj.key}
            />
          );
          
          i++;
          return sector;
        })}

        {lineData.map((line) => {
          const sectorLine = (
            <SectorLine
            startX={line.startX}
            startY={line.startY}
            centerX={radius}
            centerY={radius}
            endX={line.endX}
            endY={line.endY}
            radius={line.radius}
            sectorAngle={line.sectorAngle}
            sectorStroke={line.sectorStroke}
            sectorStrokeWidth={sectorStrokeWidth}
            sectorStrokeWidthThreshold={sectorStrokeWidthThreshold}
            key={line.key}
            />
          );
          
          return sectorLine;
        })}
      </Svg>
    </View>
  );
} else if (data.length === 1) {
  return (
    <Svg width={radius * 10}
        height={radius * 10}
        viewBox={`-10 -10 ${radius * 2 + 20} ${radius * 2 + 20}`}
        >
      <circle cx={radius} cy={radius} r={radius} stroke="black" stroke-width={strokeWidth} fill={data[0].fill} />
      <text x={ radius} y={radius + labelFontSize/2} textAnchor="middle">{data[0].value}</text>
    </Svg>
  )
} else {
    return (
      <PieChartPlaceHolder radius={radius} stroke={stroke} strokeWidth={strokeWidth} />
    )

  }
}

export default PieChart
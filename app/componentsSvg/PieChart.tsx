import { View } from "react-native";
import Svg from "react-native-svg";
import Sector, { SectorLine } from "../componentsSvg/Sector";
import computePieChart from "./utils/computePieChart";

const colors = ["#95D0E8", "#A179AA", "#C4A3CD", "#BDE2F3", "#E8F3F9"];

type PieChartProps = {
  data: { label: string; value: number }[];
  radius: number;
  showLabels: boolean;
  labelFontSize?: number;
  labelDistance?: number;
};

export default function PieChart({
  data,
  radius,
  showLabels,
  labelFontSize,
  labelDistance,
}: PieChartProps) {
  let i = 0;
  let { sectorData, lineData } = computePieChart(data, radius);

  return (
    <View>
      <Svg
        width={radius * 10}
        height={radius * 10}
        viewBox={`-10 -10 ${radius * 2 + 20} ${radius * 2 + 20}`}
      >
        {sectorData.map((obj) => {
          let fillColor = colors[i];
          const sector = (
            <Sector
              startX={radius}
              startY={radius}
              startAngle={obj.startAngle}
              endAngle={obj.endAngle}
              radius={obj.radius}
              label={obj.label}
              fill={fillColor}
              showLabels={showLabels}
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
              key={line.key}
            />
          );

          return sectorLine;
        })}
      </Svg>
    </View>
  );
}

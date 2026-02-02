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
      <Svg width="450" height="450" viewBox="0 0 100 100">
        {sectorData.map((obj) => {
          let fillColor = colors[i];
          const sector = (
            <Sector
              startX={50}
              startY={50}
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

        {lineData.map((obj) => {
          const sectorLine = (
            <SectorLine
              startX={50}
              startY={50}
              lineX={obj.lineX}
              lineY={obj.lineY}
              radius={obj.radius}
              key={obj.key}
            />
          );

          return sectorLine;
        })}
      </Svg>
    </View>
  );
}

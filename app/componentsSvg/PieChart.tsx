import { View } from "react-native";
import Svg from "react-native-svg";
import Sector from "../componentsSvg/Sector";

const colors = ["#95D0E8", "#A179AA", "#C4A3CD", "#BDE2F3", "#E8F3F9"];

type PieChartProps = {
  data: { x: number; y: number }[];
};

export default function PieChart({ data }: PieChartProps) {
  let startAngle = 90;
  let i = 0;
  const answeredTotal = data.reduce(function (acc, curr) {
    return (acc += curr.y);
  }, 0);

  function calculateEndAngle(
    startAngle: number,
    answeredQst: number,
    answeredTotal: number,
  ) {
    let endAngle = (answeredQst / answeredTotal) * 360 + startAngle;
    return endAngle;
  }

  return (
    <View>
      <Svg width="450" height="450" viewBox="0 0 100 100">
        {data.map((obj) => {
          const endAngle = calculateEndAngle(startAngle, obj.y, answeredTotal);
          let fillColor = colors[i];
          const sector = (
            <Sector
              startX={50}
              startY={50}
              startAngle={startAngle}
              endAngle={endAngle}
              radius={40}
              fill={fillColor}
              key={obj.x}
            />
          );

          startAngle = endAngle;
          i++;
          return sector;
        })}
      </Svg>
    </View>
  );
}

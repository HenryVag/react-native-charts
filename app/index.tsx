import { View } from "react-native";
import PieChart from "./componentsSvg/PieChart";
const testData = [
  { x: 1, y: 13 },
  { x: 2, y: 13 },
  { x: 3, y: 26 },
  { x: 4, y: 26 },
  { x: 5, y: 26 },
];

export default function Index() {
  return (
    <View
      style={{
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
        height: 600,
      }}
    >
      <PieChart
        data={testData}
        radius={30}
        showLabels={true}
        labelFontSize={7}
        labelDistance={1.4}
      />
    </View>
  );
}

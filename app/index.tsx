import { View } from "react-native";
import PieChart from "./componentsSvg/PieChart";
const testData = [
  { label: "1", value: 13 },
  { label: "2", value: 13 },
  { label: "3", value: 26 },
  { label: "4", value: 26 },
  { label: "5", value: 26 },
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

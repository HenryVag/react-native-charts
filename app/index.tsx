import { View } from "react-native";
import PieChart from "./componentsSvg/PieChart";
const testData = [
  { group: "1", value: 20 },
  { group: "2", value: 20 },
  { group: "3", value: 13 },
  { group: "4", value: 13 },
  { group: "5", value: 13 },
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
        labelDistance={1}
        innerStrokeWidthThreshold={90}
      />
    </View>
  );
}

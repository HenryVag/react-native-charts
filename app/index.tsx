import { View } from "react-native";
import PieChart from "./componentsSvg/PieChart";
const testData = [
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
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
      <PieChart data={testData} radius={20} />
    </View>
  );
}

import { View } from "react-native";
import PieChart from "../../../src/native/PieChart/PieChart";
const testData = [
  
    { group: "1", value: 1, fill: "#95d0e8" },
    { group: "2", value: 0, fill: "#A179AA" },
  { group: "3", value: 0, fill: "#C4A3CD" },
  { group: "4", value: 0, fill: "#BDE2F3" },
  { group: "5", value: 0, fill: "#E8F3F9" },
   { group: "6", value: 0, fill: "#E8F3F9" },
  

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
        radius={50}
        showLabels={true}
        labelFont="Poppins_400Regular"
        strokeWidth={0.5}
        labelFontSize={4}
        labelDistance={1.4}
        
        sectorStrokeWidth={1}
        sectorStrokeWidthThreshold={80}
      />
    </View>
  );
}

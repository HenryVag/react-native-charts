import { View } from "react-native";
import PieChart from "./charts/PieChart/PieChart";
import { testData } from "./charts/utils/testdata";

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

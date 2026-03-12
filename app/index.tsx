import PieChart from "@/charts/PieChart/PieChart";
import testData from "@/charts/utils/test-data";
import { Text, View } from "react-native";

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
        radius={10}
        showLabels={true}
        labelFont="Poppins_400Regular"
        strokeWidth={0.5}
        labelFontSize={4}
        labelDistance={1.4} 
        sectorStrokeWidth={1}
        sectorStrokeWidthThreshold={80}
        legend={(sectorData) => (
            <View>
              {sectorData.map((sector) => (
                <View key={sector.group} style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 12, height: 12, backgroundColor: sector.fill }} />
                  <Text>{sector.group}: {sector.label}</Text>
                </View>
              ))}
            </View>
          )}
        legendPosition="left"
        
      />
    </View>
  );
}

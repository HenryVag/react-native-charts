import { View } from "react-native"
import PieChart from "@/charts/piechart/piechart"
import { ExampleLegend } from "@/charts/utils/default-props"
import testData from "@/charts/utils/test-data"

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
				legend={(data) => <ExampleLegend data={data} />}
				legendPosition="left"
			/>
		</View>
	)
}

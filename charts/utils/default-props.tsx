import { Text, View } from "react-native"
import Svg, { G, Text as SVGText } from "react-native-svg"

//Example legend prop for piechart
type ExampleLegendProps = {
	data: {
		group?: string | undefined
		fill?: string | undefined
		label: string
	}[]
}
export const ExampleLegend = ({ data }: ExampleLegendProps) => {
	return (
		<View>
			{data.map((sector) => (
				<View
					key={sector.group}
					style={{ flexDirection: "row", alignItems: "center" }}
				>
					<View
						style={{
							width: 12,
							height: 12,
							backgroundColor: sector.fill,
						}}
					/>
					<Text>
						{sector.group}: {sector.label}
					</Text>
				</View>
			))}
		</View>
	)
}

//Label prop for linechart, used as default

export const LineChartLabel = ({
	top,
	bottom,
	x,
	y,
	fontSize,
}: {
	top: string | number
	bottom: string | number
	x: number
	y: number
	fontSize: number
}) => {
	return (
		<G>
			<SVGText
				x={x}
				y={y + fontSize + 1}
				textAnchor="middle"
				fontSize={fontSize}
			>
				{top}
			</SVGText>
			<SVGText
				x={x}
				y={y + fontSize * 2}
				textAnchor="middle"
				fontSize={fontSize}
			>
				-
			</SVGText>
			<SVGText
				x={x}
				y={y + fontSize * 3}
				textAnchor="middle"
				fontSize={fontSize}
			>
				{bottom}
			</SVGText>
		</G>
	)
}

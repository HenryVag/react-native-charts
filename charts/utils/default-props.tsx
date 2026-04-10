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
type LineChartLabelProps = {
	top: string | number
	bottom?: string | number
	x: number
	y: number
	fontSize: number
}

export const LineChartLabel = ({
	top,
	bottom,
	x,
	y,
	fontSize,
}: LineChartLabelProps) => {
	const font = "Poppins_400Regular"

	return (
		<G transform={`translate(${x}, ${y + fontSize})`}>
			<SVGText
				dy={fontSize}
				textAnchor="middle"
				fontSize={fontSize}
				fontFamily={font}
			>
				{top}
			</SVGText>
			{bottom && (
				<>
					<SVGText
						dy={fontSize * 2}
						textAnchor="middle"
						fontSize={fontSize}
						fontFamily={font}
					>
						-
					</SVGText>
					<SVGText
						y={fontSize * 3}
						textAnchor="middle"
						fontSize={fontSize}
						fontFamily={font}
					>
						{bottom}
					</SVGText>
				</>
			)}
		</G>
	)
}

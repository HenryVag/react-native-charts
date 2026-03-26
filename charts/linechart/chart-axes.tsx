import { G, Line, Text as SVGText } from "react-native-svg"
import { msToDate } from "../utils/linechart/helpers"

type ChartAxesProps = {
	paddingX: number
	paddingY: number
	chartHeight: number
	chartWidth: number
	xAxisVal: {
		tickCount: number
		niceMin: number
		niceMax: number
	}
	yAxisVal: {
		tickCount: number
		niceMin: number
		niceMax: number
	}
}

export const ChartAxes = ({
	paddingX,
	paddingY,
	chartHeight,
	chartWidth,
	xAxisVal,
	yAxisVal,
}: ChartAxesProps) => {
	return (
		<G>
			<Line
				x1={paddingX}
				y1={paddingY + chartHeight}
				x2={paddingX + chartWidth}
				y2={paddingY + chartHeight}
				stroke="red"
			/>
			<SVGText
				x={paddingX - 15}
				y={paddingY + chartHeight}
				textAnchor={"middle"}
			>
				{yAxisVal.niceMin}
			</SVGText>
			<Line
				x1={paddingX}
				y1={paddingY}
				x2={paddingX + chartWidth}
				y2={paddingY}
				stroke="red"
			/>
			<SVGText x={paddingX - 15} y={paddingY} textAnchor={"middle"}>
				{yAxisVal.niceMax}
			</SVGText>

			<Line
				x1={paddingX}
				y1={paddingY}
				x2={paddingX}
				y2={paddingY + chartHeight}
				stroke="blue"
			/>
			<SVGText
				x={paddingX}
				y={paddingY + chartHeight + 15}
				textAnchor={"middle"}
				fontSize={10}
			>
				{msToDate(xAxisVal.niceMin, "day")}
			</SVGText>
			<Line
				x1={paddingX + chartWidth}
				y1={paddingY}
				x2={paddingX + chartWidth}
				y2={paddingY + chartHeight}
				stroke="blue"
			/>
			<SVGText
				x={paddingX + chartWidth}
				y={paddingY + chartHeight + 15}
				textAnchor={"middle"}
				fontSize={10}
				transform={`rotate(0,${paddingX + chartWidth}, ${paddingY + chartHeight + 15})`}
			>
				{msToDate(xAxisVal.niceMax, "day")}
			</SVGText>
		</G>
	)
}

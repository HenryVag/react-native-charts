import { G, Line, Text as SVGText } from "react-native-svg"
import { msToDate, niceMaxDate } from "../utils/linechart/helpers"

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
	fontSize: number
	isDate: boolean
	yLabelPos: "left" | "right"
}

export const ChartAxes = ({
	paddingX,
	paddingY,
	chartHeight,
	chartWidth,
	xAxisData,
	yAxisData,
	fontSize,
	isDate,
	yLabelPos,
}: ChartAxesProps) => {
	return (
		<G>
			<Line
				x1={paddingX}
				y1={paddingY + chartHeight}
				x2={paddingX + chartWidth}
				y2={paddingY + chartHeight}
				stroke="#1F3B6680"
			/>
			<SVGText
				x={paddingX - fontSize * yAxisVal.niceMin.toString().length}
				y={paddingY + chartHeight}
				fontSize={fontSize}
				textAnchor={"end"}
			>
				{1}
			</SVGText>
			<Line
				x1={paddingX}
				y1={paddingY}
				x2={paddingX + chartWidth}
				y2={paddingY}
				stroke="#1F3B6680"
			/>
			<SVGText
				x={paddingX - 15}
				y={paddingY}
				textAnchor={"middle"}
				fontSize={fontSize}
			>
				{yAxisVal.niceMax}
			</SVGText>

			<Line
				x1={paddingX}
				y1={paddingY}
				x2={paddingX}
				y2={paddingY + chartHeight}
				stroke="none"
			/>
			<SVGText
				x={paddingX}
				y={paddingY + chartHeight + 15}
				textAnchor={"middle"}
				fontSize={fontSize}
			>
				{msToDate(xAxisVal.niceMin, "day")}
			</SVGText>
			<Line
				x1={paddingX + chartWidth}
				y1={paddingY}
				x2={paddingX + chartWidth}
				y2={paddingY + chartHeight}
				stroke="none"
			/>
			<SVGText
				x={paddingX + chartWidth}
				y={paddingY + chartHeight + 15}
				textAnchor={"middle"}
				fontSize={fontSize}
				transform={`rotate(0,${paddingX + chartWidth}, ${paddingY + chartHeight + 15})`}
			>
				{isDate ? msToDate(xAxisVal.niceMax, "day") : xAxisVal.niceMax}
			</SVGText>
		</G>
	)
}

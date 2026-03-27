import Svg, { G, Line, Text as SVGText } from "react-native-svg"
import { LineChartLabel } from "../utils/default-props"
import { getLabelData, msToDate } from "../utils/linechart/helpers"
import { LabelData } from "./linechart"

type ChartGridProps = {
	xLineData: {
		x1: number
		x2: number
		y1: number
		y2: number
		val: number
		yVal: number
		labelX: number
		labelY: number
		showLabel: boolean
	}[]
	yLineData: {
		x1: number
		x2: number
		y1: number
		y2: number
		labelX: number
		labelY: number
		val: number
		labelAnchor: "start" | "end" | "middle"
	}[]
	isDate: boolean
	labelFontSize: number
	stroke: string
	xStroke?: string
	yStroke?: string
	strokeWidth: number
	opacity: string | number

	labelComponent?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}

export const ChartGrid = ({
	xLineData,
	yLineData,
	isDate,
	labelFontSize,
	stroke,
	xStroke,
	yStroke,
	strokeWidth,
	opacity,
	labelComponent,
}: ChartGridProps) => {
	return (
		<G>
			{yLineData.map((line, i) => (
				<G>
					<Line
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke={yStroke ?? stroke}
						strokeWidth={strokeWidth}
						opacity={opacity}
						key={line.y1}
					/>
					<SVGText
						x={line.labelX}
						y={line.labelY}
						textAnchor={line.labelAnchor}
						fontSize={labelFontSize}
					>
						{line.val}
					</SVGText>
				</G>
			))}
			{xLineData.map((line, i) => (
				<G>
					<Line
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke={xStroke ?? stroke}
						strokeWidth={strokeWidth}
						opacity={opacity}
						key={line.x1}
					/>

					{labelComponent &&
						line.showLabel &&
						labelComponent(
							getLabelData(line.val, isDate),
							line.x1,
							line.yVal,
							labelFontSize,
						)}
				</G>
			))}
		</G>
	)
}

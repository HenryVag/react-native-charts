import { G, Line, Text as SVGText } from "react-native-svg"
import { LineChartLabel } from "../utils/default-props"
import { getLabelData, msToDate, niceMaxDate } from "../utils/linechart/helpers"
import { LabelData } from "./linechart"

type ChartAxesProps = {
	paddingX: number
	paddingY: number
	chartHeight: number
	chartWidth: number
	xAxisData: {
		x1: number
		x2: number
		y1: number
		y2: number
		maxLabel: number
		minLabel: number
		maxLabelX: number
		maxLabelY: number
		minLabelX: number
		minLabelY: number
		showLabel: boolean
		labelAnchor: "start" | "end" | "middle"
	}[]
	yAxisData: {
		x1: number
		x2: number
		y1: number
		y2: number
		maxLabel: number
		minLabel: number
		maxLabelX: number
		maxLabelY: number
		minLabelX: number
		minLabelY: number
		showLabel: boolean
		labelAnchor: "start" | "end" | "middle"
	}[]
	fontSize: number
	isDate: boolean
	yLabelPos: "left" | "right"
	labelComponent?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}

export const ChartAxes = ({
	xAxisData,
	yAxisData,
	fontSize,
	labelComponent,
}: ChartAxesProps) => {
	return (
		<G>
			{yAxisData.map((axis, i) => (
				<G>
					<Line
						x1={axis.x1}
						y1={axis.y1}
						x2={axis.x2}
						y2={axis.y2}
						stroke="#1F3B6680"
					/>
					<SVGText
						x={axis.minLabelX}
						y={axis.minLabelY}
						fontSize={fontSize}
						textAnchor={axis.labelAnchor}
					>
						{axis.showLabel && axis.minLabel}
					</SVGText>
					<SVGText
						x={axis.maxLabelX}
						y={axis.maxLabelY}
						fontSize={fontSize}
						textAnchor={axis.labelAnchor}
					>
						{axis.showLabel && axis.maxLabel}
					</SVGText>
				</G>
			))}
			{xAxisData.map((axis, i) => (
				<G>
					<Line
						x1={axis.x1}
						y1={axis.y1}
						x2={axis.x2}
						y2={axis.y2}
						stroke="#1F3B6680"
					/>
					{labelComponent &&
						axis.showLabel &&
						labelComponent(
							getLabelData(axis.minLabel, true),
							axis.minLabelX,
							axis.minLabelY,
							fontSize,
						)}

					{labelComponent &&
						axis.showLabel &&
						labelComponent(
							getLabelData(axis.maxLabel, true),
							axis.maxLabelX,
							axis.maxLabelY,
							fontSize,
						)}
				</G>
			))}
		</G>
	)
}

import { ColorValue } from "react-native"
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
		showAxis: boolean
	}[]
	yAxisData: {
		x1: number
		x2: number
		y1: number
		y2: number
		maxLabel: string
		minLabel: string
		maxLabelX: number
		maxLabelY: number
		minLabelX: number
		minLabelY: number
		showLabel: boolean
		labelAnchor: "start" | "end" | "middle"
		showAxis: boolean
	}[]
	bottomLabelData: {
		x: number
		y: number
		showLabel: boolean
		labelAnchor: "start" | "end" | "middle"
		label: string
	}
	topLabelData: {
		x: number
		y: number
		showLabel: boolean
		labelAnchor: "start" | "end" | "middle"
		label: string
	}
	fontSize: number
	hasDates: boolean
	strokeWidth: number
	opacity: number | string
	xAxisStroke: ColorValue
	yAxisStroke: ColorValue
	labelFont: string | undefined
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
	bottomLabelData,
	topLabelData,
	fontSize,
	hasDates,
	strokeWidth,
	opacity,
	xAxisStroke,
	yAxisStroke,
	labelFont,
	labelComponent,
}: ChartAxesProps) => {
	console.log(bottomLabelData)
	return (
		<G>
			{yAxisData.map((axis, i) => (
				<>
					{axis.showAxis && (
						<Line
							x1={axis.x1}
							y1={axis.y1}
							x2={axis.x2}
							y2={axis.y2}
							stroke={yAxisStroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}
					{axis.showLabel && (
						<SVGText
							x={axis.minLabelX}
							y={axis.minLabelY}
							fontSize={fontSize}
							textAnchor={axis.labelAnchor}
							fontFamily={labelFont}
						>
							{axis.minLabel}
						</SVGText>
					)}
					{axis.showLabel && (
						<SVGText
							x={axis.maxLabelX}
							y={axis.maxLabelY}
							fontSize={fontSize}
							textAnchor={axis.labelAnchor}
							fontFamily={labelFont}
						>
							{axis.maxLabel}
						</SVGText>
					)}
				</>
			))}
			{xAxisData.map((axis, i) => (
				<>
					{axis.showAxis && (
						<Line
							x1={axis.x1}
							y1={axis.y1}
							x2={axis.x2}
							y2={axis.y2}
							stroke={xAxisStroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}
					{labelComponent &&
						axis.showLabel &&
						labelComponent(
							getLabelData(axis.minLabel, hasDates),
							axis.minLabelX,
							axis.minLabelY,
							fontSize,
						)}
					{labelComponent &&
						axis.showLabel &&
						labelComponent(
							getLabelData(axis.maxLabel, hasDates),
							axis.maxLabelX,
							axis.maxLabelY,
							fontSize,
						)}
				</>
			))}

			{bottomLabelData.showLabel && (
				<SVGText
					x={bottomLabelData.x}
					y={bottomLabelData.y}
					fontSize={fontSize}
					fontFamily={labelFont}
				>
					VKO
				</SVGText>
			)}
			{topLabelData.showLabel && (
				<SVGText
					x={topLabelData.x}
					y={topLabelData.y}
					fontSize={fontSize}
					textAnchor={topLabelData.labelAnchor}
					fontFamily={labelFont}
				>
					P.
				</SVGText>
			)}
		</G>
	)
}

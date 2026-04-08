import { useMemo, useState } from "react"
import { ColorValue, View } from "react-native"
import Svg, { G, Polyline, Rect } from "react-native-svg"
import { computeAxes } from "../utils/linechart/compute-axes"
import { computeDataPoints } from "../utils/linechart/compute-datapoints"
import {
	calculateGridValues,
	computeGrid,
} from "../utils/linechart/compute-grid"
import { calculateTicks } from "../utils/linechart/compute-linechart"
import { validateData } from "../utils/linechart/validate-data"
import { ChartAxes } from "./chart-axes"
import { ChartGrid } from "./chart-grid"
import { ToolTip } from "./chart-tooltip"
import DataPoint from "./data-point"

export type LabelData = Record<string, string>
type LineChartProps = {
	data: { x: number | Date; y: number }[]
	xTickCountTarget?: number // 2- 20,
	yTickCountTarget?: number // 2- 20,
	dateTickInterval?: "day" | "week" | "month" | "year"
	labelInterval?: number
	labelFontSize?: number
	xAxisStroke?: ColorValue
	yAxisStroke?: ColorValue
	gridStroke?: ColorValue
	gridStrokeX?: ColorValue
	gridStrokeY?: ColorValue
	showGridX?: boolean
	showGridY?: boolean
	opacity?: string | number
	strokeWidth?: number
	labelFont?: string
	showXLabels?: boolean
	showYLabels?: "left" | "right" | "none"
	showXAxis?: boolean
	showYAxis?: boolean
	dataPointFill?: string
	dataPointRadius?: number
	dataPointStroke?: ColorValue
	dataPointStrokeWidth: number
	showDataPoints?: boolean
	lineStrokeWidth?: number
	lineStroke?: string
	toolTipTitle: string
	toolTipValueLabel: string
	toolTipFontSize?: number
	toolTipTitleFont?: string
	accessibilityLabel?: string
	topLabel: string
	bottomLabel: string
	labelProp?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}

/**
 *
 * @param TickCountTarget Number of ticks the chart tries to generate on the axis (does not work with dates)
 *
 */
const LineChart = ({
	data,
	xTickCountTarget = 3,
	yTickCountTarget = 3,
	dateTickInterval = "week",
	labelInterval = 1,
	labelFontSize = 1,
	xAxisStroke = "#1F3B6680",
	yAxisStroke = "#1F3B6680",
	gridStroke = "#1F3B6680",
	gridStrokeX = "#1F3B6680",
	gridStrokeY = "#1F3B6680",
	showGridX = false,
	showGridY = true,
	opacity = "100%",
	strokeWidth = 10,
	labelFont,
	showXLabels = true,
	showYLabels = "right",
	showXAxis = true,
	showYAxis = false,
	dataPointFill = "#95D0E8",
	dataPointRadius = 1.5,
	dataPointStroke = "#1F3B66",
	dataPointStrokeWidth = 1,
	showDataPoints = true,
	lineStrokeWidth = 10,
	lineStroke = "#1F3B66",
	toolTipTitle,
	toolTipValueLabel,
	toolTipFontSize = 1,
	toolTipTitleFont,
	accessibilityLabel = "Line chart",
	topLabel = "",
	bottomLabel = "",
	labelProp,
}: LineChartProps) => {
	//State
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [selectedDataPoint, setSelectedDataPoint] = useState<null | {
		cx: number
		cy: number
		x: number
		y: number
	}>(null)

	//Data validation
	const validatedData = useMemo(() => validateData(data), [data])
	const sortedInputArr = validatedData?.sortedInputArr ?? []
	const hasDates = validatedData?.hasDates ?? false

	//Layout
	const paddingX = (dimensions.width * 0.1 + labelFontSize) * 1.1
	const paddingY = (dimensions.height * 0.1 + labelFontSize) * 1.5
	const chartWidth = dimensions.width - paddingX * 2
	const chartHeight = dimensions.height - paddingY * 2
	const bottomLabelSpacing = chartWidth * 0.111

	//Scaling
	const scalableLabelFontSize = labelFontSize * (10 / 225) * dimensions.height
	const scalableToolTipFontSize =
		toolTipFontSize * (10 / 225) * dimensions.height
	const scalableStrokeWidth =
		(strokeWidth / 1000) *
		(dimensions.height - (dimensions.height * 0.1 + labelFontSize) * 1.5)
	const scalableLineStrokeWidth =
		(lineStrokeWidth / 1000) *
		(dimensions.height - (dimensions.height * 0.1 + labelFontSize) * 1.5)
	const scalableRadius = dataPointRadius * chartHeight * 0.05
	const scalableDataPointStrokeWidth =
		dataPointStrokeWidth * (scalableRadius / 10)

	//Axis calculations
	const safeTickCountTargetX = Math.min(Math.max(xTickCountTarget, 2), 20)
	const safeTickCountTargetY = Math.min(Math.max(yTickCountTarget, 2), 20)
	const safeLabelInterval = labelInterval > 0 ? labelInterval : 1
	const chartAxisValues = useMemo(() => calculateGridValues(data), [data])
	const yAxisVal = useMemo(
		() =>
			calculateTicks(
				safeTickCountTargetY,
				chartAxisValues.minY,
				chartAxisValues.maxY,
				false,
			),
		[safeTickCountTargetY, chartAxisValues.minY, chartAxisValues.maxY],
	)
	const xAxisVal = useMemo(
		() =>
			calculateTicks(
				safeTickCountTargetX,
				chartAxisValues.minX,
				chartAxisValues.maxX,
				chartAxisValues.isDate,
				dateTickInterval,
			),
		[
			safeTickCountTargetX,
			chartAxisValues.minX,
			chartAxisValues.maxX,
			chartAxisValues.isDate,
			dateTickInterval,
		],
	)

	//Grid and axes
	const { xGridData, yGridData } = useMemo(
		() =>
			computeGrid(
				xAxisVal,
				yAxisVal,
				paddingX,
				paddingY,
				chartHeight,
				chartWidth,
				safeLabelInterval,
				scalableLabelFontSize,
				showXLabels,
				showYLabels,
				bottomLabelSpacing,
			),
		[
			xAxisVal,
			yAxisVal,
			paddingX,
			paddingY,
			chartHeight,
			chartWidth,
			safeLabelInterval,
			scalableLabelFontSize,
			showXLabels,
			showYLabels,
			bottomLabelSpacing,
		],
	)
	const { xAxisData, yAxisData, bottomLabelData, topLabelData } = useMemo(
		() =>
			computeAxes(
				xAxisVal,
				yAxisVal,
				paddingX,
				paddingY,
				chartHeight,
				chartWidth,
				scalableLabelFontSize,
				showXLabels,
				showYLabels,
				showXAxis,
				showYAxis,
				bottomLabelSpacing,
			),
		[
			xAxisVal,
			yAxisVal,
			paddingX,
			paddingY,
			chartHeight,
			chartWidth,
			scalableLabelFontSize,
			showXLabels,
			showYLabels,
			showXAxis,
			showYAxis,
			bottomLabelSpacing,
		],
	)

	//Datapoints
	const dataPoints = useMemo(
		() =>
			computeDataPoints(
				sortedInputArr,
				paddingX,
				paddingY,
				chartWidth,
				chartHeight,
				xAxisVal,
				yAxisVal,
				bottomLabelSpacing,
			),
		[
			sortedInputArr,
			paddingX,
			paddingY,
			chartWidth,
			chartHeight,
			xAxisVal,
			yAxisVal,
			bottomLabelSpacing,
		],
	)

	let polyLineStr = ""
	dataPoints.forEach((point, i) => {
		if (i === 0) {
			polyLineStr = `${point.cx - bottomLabelSpacing / 1.5} ${point.cy} `
		}
		const x = point.cx
		const y = point.cy
		polyLineStr = polyLineStr + `${x},${y} `
	})

	//"Early" returns
	if (dimensions.height === 0 || dimensions.width === 0) {
		return (
			<View
				style={{ flex: 1 }}
				onLayout={(e) => setDimensions(e.nativeEvent.layout)}
			/>
		)
	}
	if (validatedData === null) {
		return null
	}

	return (
		<View
			style={{ flex: 1 }}
			onLayout={(e) => setDimensions(e.nativeEvent.layout)}
			accessibilityRole="image"
			accessibilityLabel={accessibilityLabel}
			accessible={true}
		>
			<Svg
				width={dimensions.width}
				height={dimensions.height}
				style={{ flex: 1 }}
				aria-hidden={true}
			>
				<ChartGrid
					xGridData={xGridData}
					yGridData={yGridData}
					isDate={chartAxisValues.isDate}
					labelFontSize={scalableLabelFontSize}
					labelComponent={labelProp}
					stroke={gridStroke}
					xStroke={gridStrokeX}
					yStroke={gridStrokeY}
					strokeWidth={scalableStrokeWidth}
					opacity={opacity}
					showGridX={showGridX}
					showGridY={showGridY}
					labelFont={labelFont}
				/>
				<ChartAxes
					paddingX={paddingX}
					paddingY={paddingY}
					chartHeight={chartHeight}
					chartWidth={chartWidth}
					xAxisData={xAxisData}
					yAxisData={yAxisData}
					fontSize={scalableLabelFontSize}
					hasDates={hasDates}
					strokeWidth={scalableStrokeWidth}
					opacity={opacity}
					labelComponent={labelProp}
					xAxisStroke={xAxisStroke}
					yAxisStroke={yAxisStroke}
					bottomLabelData={bottomLabelData}
					topLabelData={topLabelData}
					labelFont={labelFont}
					topLabel={topLabel}
					bottomLabel={bottomLabel}
				/>

				<Polyline
					points={polyLineStr}
					fill="none"
					stroke={lineStroke}
					strokeWidth={scalableLineStrokeWidth}
				/>
				<Rect
					width={dimensions.width}
					height={dimensions.height}
					fill={"transparent"}
					onPress={() => {
						if (selectedDataPoint) {
							setSelectedDataPoint(null)
						}
					}}
				/>
				{dataPoints.map((point, i) => (
					<>
						<DataPoint
							cx={point.cx}
							cy={point.cy}
							fill={dataPointFill}
							radius={scalableRadius}
							stroke={dataPointStroke}
							strokeWidth={scalableDataPointStrokeWidth}
							isVisible={showDataPoints}
							onPress={() =>
								setSelectedDataPoint({
									cx: point.cx,
									cy: point.cy,
									x: point.x,
									y: point.y,
								})
							}
						/>
					</>
				))}
				{selectedDataPoint && (
					<ToolTip
						data={selectedDataPoint}
						chartHeight={chartHeight}
						chartWidth={chartWidth}
						dataPointRadius={scalableRadius}
						labelFont={labelFont}
						fontSize={scalableToolTipFontSize}
						toolTipTitleFont={toolTipTitleFont}
						toolTipTitle={toolTipTitle}
						toolTipValueLabel={toolTipValueLabel}
					/>
				)}
			</Svg>
		</View>
	)
}

export default LineChart

import { memo, useMemo, useState } from "react"
import { type ColorValue, View } from "react-native"
import Svg, { Polyline, Rect } from "react-native-svg"
import { calculateTicks } from "../utils/linechart/calculate-ticks"
import { computeAxes } from "../utils/linechart/compute-axes"
import { computeDataPoints } from "../utils/linechart/compute-datapoints"
import {
	calculateGridValues,
	computeGrid,
} from "../utils/linechart/compute-grid"
import { computeToolTip } from "../utils/linechart/compute-tooltip"
import type { LabelData } from "../utils/linechart/types"
import { validateData } from "../utils/linechart/validate-data"
import { ChartAxes } from "./chart-axes"
import { ChartGrid } from "./chart-grid"
import { ToolTip } from "./chart-tooltip"
import { DataPoint } from "./data-point"

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
	dataPointStrokeWidth?: number
	showDataPoints?: boolean
	lineStrokeWidth?: number
	lineStroke?: string
	toolTipTitle: string
	toolTipValueLabel: string
	toolTipFontSize?: number
	toolTipTitleFont?: string
	accessibilityLabel?: string
	topLabel: string
	bottomLabel?: LabelData
	labelProp?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}
//Layout scaling constants (empirically discovered)
const PADDING_X_SCALE = 0.1
const PADDING_X_MULTIPLIER = 1.1
const PADDING_Y_SCALE = 0.2
const PADDING_Y_MULTIPLIER = 1.5
const BOTTOM_LABEL_SPACING_SCALE = 0.111
const FONT_SIZE_BASE_HEIGHT = 225
const FONT_SIZE_SCALE = 10
const STROKE_WIDTH_SCALE = 1000
const POLYLINE_LEAD_OFFSET = 1.5

/**
 * A customisable line chart for React Native built on react-native-svg.
 *
 * Accepts numeric or Date values on the x-axis and numeric values on the y-axis.
 * Supports interactive tooltips, configurable grid lines, axis labels, and data points.
 *
 * @example
 * <LineChart
 *   data={[{ x: new Date("2024-01-01"), y: 42 }]}
 *   toolTipTitle="Weight"
 *   toolTipValueLabel="kg"
 *   topLabel="kg"
 *   bottomLabel={{}}
 * />
 *
 * @param data - Array of `{ x, y }` pairs. `x` can be a number or a Date object.
 * @param xTickCountTarget - Approximate number of ticks on the x-axis. Clamped to [2, 20]. Has no effect when `x` values are Dates — use `dateTickInterval` instead.
 * @param yTickCountTarget - Approximate number of ticks on the y-axis. Clamped to [2, 20].
 * @param dateTickInterval - Tick interval used when `x` values are Dates. One of `"day" | "week" | "month" | "year"`.
 * @param labelFontSize - Base font size for axis labels. Scaled proportionally to the chart height at runtime.
 * @param showGridX - Whether to render vertical grid lines.
 * @param showGridY - Whether to render horizontal grid lines.
 * @param showXLabels - Whether to render labels along the x-axis.
 * @param showYLabels - Which side to render y-axis labels on, or `"none"` to hide them.
 * @param showXAxis - Whether to render the x-axis lines (tob and bottom).
 * @param showYAxis - Whether to render the y-axis lines (left and right).
 * @param showDataPoints - Whether to render individual data point markers.
 * @param lineStroke - Colour of the connecting line.
 * @param lineStrokeWidth - Base stroke width of the connecting line. Scaled to chart height at runtime.
 * @param toolTipTitle - Title text shown in the tooltip describing the x value when a data point is pressed.
 * @param toolTipValueLabel - Label for the value describing the y value inside the tooltip.
 * @param topLabel - Unit or descriptor rendered above the y-axis (e.g. `"kg"`).
 * @param bottomLabel - Label data rendered before the x-axis values. Shape must match `LabelData`.
 * @param labelProp - Optional render function for fully custom axis labels. Receives the label data, x/y position, and font size.
 * @param accessibilityLabel - Accessible description of the chart for screen readers.
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
	bottomLabel = {},
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
	const paddingX =
		(dimensions.width * PADDING_X_SCALE + labelFontSize) * PADDING_X_MULTIPLIER
	const paddingY =
		(dimensions.height * PADDING_Y_SCALE + labelFontSize) * PADDING_Y_MULTIPLIER
	const chartWidth = dimensions.width - paddingX * 2
	const chartHeight = dimensions.height - paddingY * 2
	const bottomLabelSpacing = chartWidth * BOTTOM_LABEL_SPACING_SCALE

	//Scaling
	const scalableLabelFontSize =
		labelFontSize *
		(FONT_SIZE_SCALE / FONT_SIZE_BASE_HEIGHT) *
		dimensions.height
	const scalableToolTipFontSize =
		toolTipFontSize *
		(FONT_SIZE_SCALE / FONT_SIZE_BASE_HEIGHT) *
		dimensions.height
	const scalableStrokeWidth =
		(strokeWidth / STROKE_WIDTH_SCALE) *
		(dimensions.height - (dimensions.height * 0.1 + labelFontSize) * 1.5)
	const scalableLineStrokeWidth =
		(lineStrokeWidth / STROKE_WIDTH_SCALE) *
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

	const polyLineStr = useMemo(() => {
		let str = ""

		dataPoints.forEach((point, i) => {
			if (i === 0) {
				str += `${point.cx - bottomLabelSpacing / POLYLINE_LEAD_OFFSET} ${point.cy} `
			}
			str += `${point.cx},${point.cy} `
		})
		return str
	}, [dataPoints, bottomLabelSpacing])
	const toolTipDateInterval = dateTickInterval

	const toolTipData = useMemo(
		() =>
			computeToolTip(
				selectedDataPoint,
				scalableToolTipFontSize,
				scalableRadius,
				chartHeight,
				toolTipTitle.length,
				toolTipValueLabel.length,
				chartAxisValues.isDate,
				toolTipDateInterval,
				paddingY,
			),
		[
			selectedDataPoint,
			scalableToolTipFontSize,
			scalableRadius,
			chartHeight,
			toolTipTitle.length,
			toolTipValueLabel.length,
		],
	)
	console.log(paddingY)
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
						key={point.x}
					/>
				))}
				{selectedDataPoint && (
					<ToolTip
						toolTipData={toolTipData}
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

export default memo(LineChart)

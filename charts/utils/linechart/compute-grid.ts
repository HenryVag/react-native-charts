import { getDateWeek, toSvgX, toSvgY } from "@/charts/utils/linechart/helpers"
import type { XGridItem, YGridItem } from "@/charts/utils/linechart/types"
/**
 * Computes the grid line and label data for both axes of the chart.
 *
 * Returns arrays of positioned grid line segments and label metadata
 * ready to be rendered as SVG elements.
 *
 * @param xAxisVal - Tick count, nice minimum, and nice maximum for the x-axis.
 * @param yAxisVal - Tick count, nice minimum, and nice maximum for the y-axis.
 * @param paddingX - Horizontal padding applied to both sides of the chart.
 * @param paddingY - Vertical padding applied to both sides of the chart.
 * @param chartHeight - Renderable height of the chart excluding padding.
 * @param chartWidth - Renderable width of the chart excluding padding.
 * @param labelInterval - Renders an x-axis label every nth tick.
 * @param fontSize - Scaled font size used to offset labels from the axis lines.
 * @param showXLabels - Whether to render labels along the x-axis.
 * @param yLabelPos - Which side to render y-axis labels on, or `"none"` to hide them.
 * @param bottomLabelSpacing - Horizontal offset applied to x-grid lines and labels.
 * @returns Grid line data for both axes and the SVG positions of the x and y axis baselines.
 */

export const computeGrid = (
	xAxisVal: {
		ticks: number[]
		niceMin: number
		niceMax: number
	},
	yAxisVal: {
		ticks: number[]
		niceMin: number
		niceMax: number
	},
	paddingX: number,
	paddingY: number,
	chartHeight: number,
	chartWidth: number,
	labelInterval: number,
	fontSize: number,
	showXLabels: boolean,
	yLabelPos: "left" | "right" | "none",
	bottomLabelSpacing: number,
) => {
	const xGridData: XGridItem[] = []
	const yGridData: YGridItem[] = []
	const yTickCount = yAxisVal.ticks.length
	const yTickSpacing = (yAxisVal.niceMax - yAxisVal.niceMin) / (yTickCount + 1)
	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	const showYLabels = yLabelPos !== "none"

	for (let i = 1; i < xAxisVal.ticks.length; i++) {
		const tickVal = xAxisVal.ticks[i]
		const showLabel = i % labelInterval === 0
		const x1 = toSvgX(
			tickVal,
			niceMinX,
			niceMaxX,
			chartWidth - bottomLabelSpacing,
			paddingX,
		)
		const y1 = toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY)
		const y2 = toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY)
		const labelX = x1 + bottomLabelSpacing
		xGridData.push({
			x1: x1 + bottomLabelSpacing,
			x2: x1 + bottomLabelSpacing,
			y1: y1,
			y2: y2,
			val: tickVal,
			yVal: y1,
			showLabels: showLabel && showXLabels,
			labelX: labelX,
			labelY: y1,
		})
		console.log(
			"grid niceMax:",
			xAxisVal.niceMax,
			new Date(xAxisVal.niceMax).toLocaleDateString(),
		)
	}

	for (let j = 1; j <= yTickCount; j++) {
		const x1 = toSvgX(niceMinX, niceMinX, niceMaxX, chartWidth, paddingX)
		const x2 = toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX)
		const y1 = toSvgY(
			niceMinY + yTickSpacing * j,
			niceMinY,
			niceMaxY,
			chartHeight,
			paddingY,
		)
		const y2 = y1
		const val = Math.round(yAxisVal.niceMin + yTickSpacing * j)
		const labelX = yLabelPos === "right" ? x2 + fontSize : x1 - fontSize
		const labelAnchor: "start" | "end" = yLabelPos === "right" ? "start" : "end"
		const labelY = y1
		yGridData.push({
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2,
			val: val,
			labelX: labelX,
			labelY: labelY,
			labelAnchor: labelAnchor,
			showLabels: showYLabels,
		})
	}

	const xAxisY = toSvgY(
		Math.max(yAxisVal.niceMin, Math.min(0, yAxisVal.niceMax)),
		niceMinY,
		niceMaxY,
		chartHeight,
		paddingY,
	)

	const yAxisX = toSvgX(
		Math.max(xAxisVal.niceMin, Math.min(0, xAxisVal.niceMax)),
		niceMinX,
		niceMaxX,
		chartWidth,
		paddingX,
	)

	return { xGridData, yGridData, xAxisY, yAxisX }
}

/**
 * Derives the min/max bounds for both axes and detects whether the x-axis contains Date values.
 *
 * Used to establish the data range.
 * Returns zeroes for all bounds if `data` is empty.
 *
 * @param data - Array of `{ x, y }` pairs. `x` can be a number or a Date object.
 * @returns Min and max values for both axes, and whether the x-axis is date-based.
 */

export const calculateGridValues = (
	data: { x: number | Date; y: number }[],
) => {
	if (data.length === 0) {
		return { maxX: 0, minX: 0, maxY: 0, minY: 0, isDate: false }
	}
	const isDate = data[0]?.x instanceof Date
	const xValues = data.map((obj) => {
		return obj.x.valueOf()
	})

	const yValues = data.map((obj) => {
		return obj.y.valueOf()
	})

	return {
		maxX: Math.max(...xValues),
		minX: Math.min(...xValues),
		maxY: Math.max(...yValues),
		minY: Math.min(...yValues),
		isDate,
	}
}

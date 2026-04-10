import { getLabelData, toSvgX, toSvgY } from "@/charts/utils/linechart/helpers"
import type {
	AxisLabelData,
	AxisValueData,
	XAxisDataItem,
	YAxisDataItem,
} from "@/charts/utils/linechart/types"

//Empirically determined
const LABEL_SPACING = 1.1

/**
 * Computes the axis line and label position data for all four sides of the chart.
 *
 * Builds left, right, top, and bottom axis lines with their associated label positions
 * and visibility flags. The top axis label is intentionally always hidden.
 *
 * @param xAxisVal - Tick count, nice minimum, and nice maximum for the x-axis.
 * @param yAxisVal - Tick count, nice minimum, and nice maximum for the y-axis.
 * @param paddingX - Horizontal padding applied to both sides of the chart.
 * @param paddingY - Vertical padding applied to both sides of the chart.
 * @param chartHeight - Renderable height of the chart excluding padding.
 * @param chartWidth - Renderable width of the chart excluding padding.
 * @param fontSize - Scaled font size used to offset labels from the axis lines.
 * @param showXLabels - Whether to render labels along the x-axis.
 * @param showYLabels - Which side to render y-axis labels on, or `"none"` to hide them.
 * @param showXAxis - Whether to render the x-axis lines.
 * @param showYAxis - Whether to render the y-axis lines.
 * @param bottomLabelSpacing - Horizontal offset applied to the bottom axis label.
 * @returns Positioned axis line data for both axes and label position data for the top and bottom labels.
 */

type LabelAnchorType = "start" | "end" | "middle"

export const computeAxes = (
	xAxisVal: AxisValueData,
	yAxisVal: AxisValueData,
	paddingX: number,
	paddingY: number,
	chartHeight: number,
	chartWidth: number,
	fontSize: number,
	showXLabels: boolean,
	showYLabels: "left" | "right" | "none" | undefined,
	showXAxis: boolean,
	showYAxis: boolean,
	bottomLabelSpacing: number,
) => {
	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	const showTopLabel = false // intended false value
	const showBottomLabel = showXLabels

	const showRightLabel = showYLabels === "right"
	const showLeftLabel = showYLabels === "left"

	const maxLabelY = getLabelData(niceMaxY, false).valueX
	const minLabelY = getLabelData(niceMinY, false).valueX

	const svgMinX = toSvgX(niceMinX, niceMinX, niceMaxX, chartWidth, paddingX)
	const svgMaxX = toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX)
	const svgMinY = toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY)
	const svgMaxY = toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY)

	const leftAxis = {
		x1: svgMinX,
		y1: svgMinY,
		x2: svgMinX,
		y2: svgMaxY,
		showLabel: showLeftLabel,
		maxLabel: maxLabelY,
		minLabel: minLabelY,
		maxLabelX: svgMinX - fontSize,
		maxLabelY: svgMaxY,
		minLabelX: svgMinX - fontSize,
		minLabelY: svgMinY,
		labelAnchor: "end" as LabelAnchorType,
		showAxis: showYAxis,
	}

	const rightAxis = {
		x1: svgMaxX,
		y1: svgMinY,
		x2: svgMaxX,
		y2: svgMaxY,
		showLabel: showRightLabel,
		maxLabel: maxLabelY,
		minLabel: minLabelY,
		maxLabelX: svgMaxX + fontSize,
		maxLabelY: svgMaxY,
		minLabelX: svgMaxX + fontSize,
		minLabelY: svgMinY,
		labelAnchor: "start" as LabelAnchorType,
		showAxis: showYAxis,
	}
	const bottomAxis = {
		x1: svgMinX,
		y1: svgMinY,
		x2: svgMaxX,
		y2: svgMinY,
		showLabel: showBottomLabel,
		maxLabel: niceMaxX,
		minLabel: niceMinX,
		maxLabelX: svgMaxX,
		maxLabelY: svgMinY,
		minLabelX: svgMinX + bottomLabelSpacing,
		minLabelY: svgMinY,
		labelAnchor: "middle" as LabelAnchorType,
		showAxis: showXAxis,
	}
	console.log("nicemin", new Date(xAxisVal.niceMin))

	const topAxis = {
		x1: svgMinX,
		y1: svgMaxY,
		x2: svgMaxX,
		y2: svgMaxY,
		maxLabel: niceMaxX,
		minLabel: niceMinX,
		maxLabelX: svgMaxX,
		maxLabelY: svgMaxY - fontSize * 4,
		minLabelX: svgMinX,
		minLabelY: svgMaxY,
		showLabel: showTopLabel,
		labelAnchor: "middle" as LabelAnchorType,
		showAxis: showXAxis,
	}

	const bottomLabelData = {
		x: bottomAxis.minLabelX - bottomLabelSpacing,
		y: bottomAxis.y1 + fontSize + fontSize * LABEL_SPACING,
		showLabel: showBottomLabel,
		labelAnchor: "middle" as LabelAnchorType,
	}

	const topLabelData: AxisLabelData = showLeftLabel
		? {
				x: leftAxis.maxLabelX,
				y: leftAxis.maxLabelY - fontSize - fontSize * LABEL_SPACING,
				showLabel: showLeftLabel || showRightLabel,
				labelAnchor: leftAxis.labelAnchor as LabelAnchorType,
			}
		: {
				x: rightAxis.maxLabelX,
				y: rightAxis.maxLabelY - fontSize - fontSize * LABEL_SPACING,
				showLabel: showLeftLabel || showRightLabel,
				labelAnchor: rightAxis.labelAnchor as LabelAnchorType,
			}

	const xAxisData: XAxisDataItem[] = [topAxis, bottomAxis]
	const yAxisData: YAxisDataItem[] = [leftAxis, rightAxis]
	return { xAxisData, yAxisData, bottomLabelData, topLabelData }
}

import { getLabelData, toSvgX, toSvgY } from "./helpers"
export const computeAxes = (
	xAxisVal: {
		tickCount: number
		niceMin: number
		niceMax: number
	},
	yAxisVal: {
		tickCount: number
		niceMin: number
		niceMax: number
	},
	paddingX: number,
	paddingY: number,
	chartHeight: number,
	chartWidth: number,
	fontSize: number,
	showXLabels: boolean,
	showYLabels: "left" | "right" | "none" | undefined,
) => {
	let xAxisData = []
	let yAxisData = []

	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	const showTopLabel = false
	const showBottomLabel = showXLabels

	const showRightLabel = showYLabels === "right"
	const showLeftLabel = showYLabels === "left"

	const maxLabelY = getLabelData(niceMaxY, false).value
	const minLabelY = getLabelData(niceMinY, false).value

	const leftAxis = {
		x1: toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX),
		y1: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		x2: toSvgX(niceMinX, niceMinX, niceMaxX, chartWidth, paddingX),
		y2: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		showLabel: showLeftLabel,
		maxLabel: maxLabelY,
		minLabel: minLabelY,
		maxLabelX:
			toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX) -
			fontSize,
		maxLabelY: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		minLabelX:
			toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX) -
			fontSize,
		minLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		labelAnchor: "end" as const,
	}

	const rightAxis = {
		x1: toSvgX(niceMaxX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX),
		y1: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		x2: toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX),
		y2: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		showLabel: showRightLabel,
		maxLabel: maxLabelY,
		minLabel: minLabelY,
		maxLabelX:
			toSvgX(niceMaxX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX) +
			fontSize,
		maxLabelY: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		minLabelX:
			toSvgX(niceMaxX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX) +
			fontSize,
		minLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		labelAnchor: "start" as const,
	}
	const bottomAxis = {
		x1: toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX),
		y1: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		x2: toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX),
		y2: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		showLabel: showBottomLabel,
		maxLabel: niceMaxX,
		minLabel: niceMaxY,
		maxLabelX: toSvgX(
			niceMaxX,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		),
		maxLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		minLabelX: toSvgX(
			niceMinX,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		),
		minLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		labelAnchor: "middle" as const,
	}

	const topAxis = {
		x1: toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX),
		y1: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		x2: toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX),
		y2: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		maxLabel: niceMaxX,
		minLabel: niceMinX,
		maxLabelX: toSvgX(
			niceMaxX,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		),
		maxLabelY:
			toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY) -
			fontSize * 4,
		minLabelX: toSvgX(
			niceMinX,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		),
		minLabelY: toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY),
		showLabel: showTopLabel,
		labelAnchor: "middle" as const,
	}
	xAxisData = [topAxis, bottomAxis]
	yAxisData = [leftAxis, rightAxis]
	return { xAxisData, yAxisData }
}

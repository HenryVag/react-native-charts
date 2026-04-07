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
	showXAxis: boolean,
	showYAxis: boolean,
	bottomLabelSpacing: number,
) => {
	let xAxisData = []
	let yAxisData = []
	let topLabelData = {}
	let bottomLabelData = {}

	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	const showTopLabel = false
	const showBottomLabel = showXLabels

	const showRightLabel = showYLabels === "right"
	const showLeftLabel = showYLabels === "left"

	const maxLabelY = getLabelData(niceMaxY, false).valueX
	const minLabelY = getLabelData(niceMinY, false).valueX
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
		showAxis: showYAxis,
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
		showAxis: showYAxis,
	}
	const bottomAxis = {
		x1: toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX),
		y1: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		x2: toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX),
		y2: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		showLabel: showBottomLabel,
		maxLabel: niceMaxX,
		minLabel: niceMinX,
		maxLabelX: toSvgX(
			niceMaxX,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		),
		maxLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		minLabelX:
			toSvgX(niceMinX, niceMinX, xAxisVal.niceMax, chartWidth, paddingX) +
			bottomLabelSpacing,
		minLabelY: toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY),
		labelAnchor: "middle" as const,
		showAxis: showXAxis,
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
		showAxis: showXAxis,
	}

	if (showBottomLabel) {
		bottomLabelData = {
			x: bottomAxis.minLabelX - bottomLabelSpacing,
			y: bottomAxis.y1 + fontSize + fontSize * 1.1,
			showLabel: showBottomLabel,
			labelAnchor: "middle",
			label: "VKO",
		}
	}

	if (showLeftLabel) {
		topLabelData = {
			x: leftAxis.maxLabelX,
			y: leftAxis.maxLabelY - fontSize - fontSize * 1.1,
			showLabel: showLeftLabel || showRightLabel,
			labelAnchor: leftAxis.labelAnchor,
			label: "P.",
		}
	} else {
		topLabelData = {
			x: rightAxis.maxLabelX,
			y: rightAxis.maxLabelY - fontSize - fontSize * 1.1,
			showLabel: showLeftLabel || showRightLabel,
			labelAnchor: rightAxis.labelAnchor,
			label: "P.",
		}
	}

	xAxisData = [topAxis, bottomAxis]
	yAxisData = [leftAxis, rightAxis]
	return { xAxisData, yAxisData, bottomLabelData, topLabelData }
}

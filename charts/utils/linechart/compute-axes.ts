import { toSvgX, toSvgY } from "./helpers"

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
	labelInterval: number,
	fontSize: number,
	yLabelPos: "left" | "right",
) => {
	const xLineData = []
	const yLineData = []
	const xTickCount = xAxisVal.tickCount
	const yTickCount = yAxisVal.tickCount
	const xTickSpacing = (xAxisVal.niceMax - xAxisVal.niceMin) / xTickCount

	const yTickSpacing = (yAxisVal.niceMax - yAxisVal.niceMin) / (yTickCount + 1)
	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	let showLabel = false
	let i = 1
	let j = 1
	while (i <= xTickCount - 1) {
		const x1 = toSvgX(
			niceMinX + xTickSpacing * i,
			niceMinX,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		)

		const x2 = toSvgX(
			niceMinX + xTickSpacing * i,
			niceMinX,
			niceMaxX,
			chartWidth,
			paddingX,
		)
		const y1 = toSvgY(niceMinY, niceMinY, niceMaxY, chartHeight, paddingY)
		const y2 = toSvgY(niceMaxY, niceMinY, niceMaxY, chartHeight, paddingY)
		const val = Math.round(niceMinX + xTickSpacing * i)
		const labelX = x1 - fontSize * val.toString().length
		const labelY = y1
		if (i % labelInterval === 0) {
			showLabel = true
		}
		xLineData.push({
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2,
			val: val,
			yVal: y1,
			showLabel: showLabel,
			labelX: labelX,
			labelY: labelY,
		})
		showLabel = false
		i++
	}

	while (j <= yTickCount) {
		const x1 = toSvgX(niceMinX, niceMinX, niceMaxX, chartWidth, paddingX)
		const x2 = toSvgX(niceMaxX, niceMinX, niceMaxX, chartWidth, paddingX)
		const y1 = toSvgY(
			niceMinY + yTickSpacing * j,
			niceMinY,
			niceMaxY,
			chartHeight,
			paddingY,
		)
		const y2 = toSvgY(
			niceMinY + yTickSpacing * j,
			niceMinY,
			niceMaxY,
			chartHeight,
			paddingY,
		)
		const val = Math.round(yAxisVal.niceMin + yTickSpacing * j)
		let labelX = x1 - fontSize * val.toString().length
		let labelAnchor = "end"
		if (yLabelPos === "right") {
			labelX = x2 + fontSize * val.toString().length
			labelAnchor = "start"
		}
		const labelY = y1
		yLineData.push({
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2,
			val: val,
			labelX: labelX,
			labelY: labelY,
			labelAnchor: labelAnchor,
		})
		j++
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

	return { xLineData, yLineData, xAxisY, yAxisX }
}

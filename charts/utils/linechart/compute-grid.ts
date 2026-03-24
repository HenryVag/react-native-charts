import { toSvgX, toSvgY } from "./helpers"

export const computeGrid = (
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
) => {
	const xLineData = []
	const yLineData = []
	const xTickCount = xAxisVal.tickCount
	const yTickCount = yAxisVal.tickCount
	const xTickSpacing = (xAxisVal.niceMax - xAxisVal.niceMin) / (xTickCount + 1)

	const yTickSpacing = (yAxisVal.niceMax - yAxisVal.niceMin) / (yTickCount + 1)
	const niceMinX = xAxisVal.niceMin
	const niceMaxX = xAxisVal.niceMax
	const niceMinY = yAxisVal.niceMin
	const niceMaxY = yAxisVal.niceMax
	let i = 1
	let j = 1
	while (i <= xTickCount) {
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
		xLineData.push({ x1: x1, x2: x2, y1: y1, y2: y2, val: val })
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
		yLineData.push({ x1: x1, x2: x2, y1: y1, y2: y2, val: val })
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

export const calculateGridValues = (data: { x: number; y: number }[]) => {
	const xValues = data.map((obj) => {
		return obj.x
	})
	const yValues = data.map((obj) => {
		return obj.y
	})

	return {
		maxX: Math.max(...xValues),
		minX: Math.min(...xValues),
		maxY: Math.max(...yValues),
		minY: Math.min(...yValues),
	}
}

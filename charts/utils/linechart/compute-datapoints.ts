import { toSvgX, toSvgY } from "./helpers"

export const computeDataPoints = (
	data: { x: number; y: number }[],
	paddingX: number,
	paddingY: number,
	chartWidth: number,
	chartHeight: number,
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
) => {
	const pointData = data.map((point, i) => {
		//Calc x point: x/xNiceMax * chartwidth
		//Calc y point: y/yNiceMax * chartHeight

		const posX = toSvgX(
			point.x,
			xAxisVal.niceMin,
			xAxisVal.niceMax,
			chartWidth,
			paddingX,
		)
		const posY = toSvgY(
			point.y,
			yAxisVal.niceMin,
			yAxisVal.niceMax,
			chartHeight,
			paddingY,
		)
		return { cx: posX, cy: posY }
	})
	return pointData
}

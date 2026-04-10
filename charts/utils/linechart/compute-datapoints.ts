import { toSvgX, toSvgY } from "@/charts/utils/linechart/helpers"
import type { AxisValueData } from "@/charts/utils/linechart/types"

/**
 * Maps raw data points to their SVG canvas coordinates.
 *
 * @param data - Array of `{ x, y }` pairs. `x` can be a number or a Date object.
 * @param paddingX - Horizontal padding of the chart.
 * @param paddingY - Vertical padding of the chart.
 * @param chartWidth - Renderable width of the chart excluding padding.
 * @param chartHeight - Renderable height of the chart excluding padding.
 * @param xAxisVal - Nice min and max for the x-axis used for scaling.
 * @param yAxisVal - Nice min and max for the y-axis used for scaling.
 * @param bottomLabelSpacing - Horizontal offset applied to align points with the grid.
 * @returns Array of SVG coordinate objects with the original data values attached.
 */
export const computeDataPoints = (
	data: { x: number | Date; y: number }[],
	paddingX: number,
	paddingY: number,
	chartWidth: number,
	chartHeight: number,
	xAxisVal: AxisValueData,
	yAxisVal: AxisValueData,
	bottomLabelSpacing: number,
) => {
	return data.map((point) => {
		const posX = toSvgX(
			point.x,
			xAxisVal.niceMin,
			xAxisVal.niceMax,
			chartWidth - bottomLabelSpacing,
			paddingX,
		)

		const posY = toSvgY(
			point.y,
			yAxisVal.niceMin,
			yAxisVal.niceMax,
			chartHeight,
			paddingY,
		)
		return {
			cx: posX + bottomLabelSpacing,
			cy: posY,
			x: Number(point.x),
			y: point.y,
		}
	})
}

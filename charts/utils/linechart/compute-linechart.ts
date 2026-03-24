import { niceNum } from "./helpers"

export const computeLineChart = () => {}

/**
 * Calculate and update values for tick spacing and nice
 * minimum and maximum data points on the axis.
 */
export const calculateTicks = (
	maxTicks: number,
	minPoint: number,
	maxPoint: number,
): { tickCount: number; niceMin: number; niceMax: number } => {
	const range = niceNum(maxPoint - minPoint, true)
	const tickSpacing = niceNum(range / (maxTicks - 1), true)
	const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing
	const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing
	const tickCount = Math.round((niceMax - niceMin) / tickSpacing)

	return { tickCount, niceMin, niceMax }
}

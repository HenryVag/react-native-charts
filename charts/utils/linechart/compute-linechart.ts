import { niceMaxDate, niceMinDate, niceNum } from "./helpers"

export const computeLineChart = () => {}

/**
 * Calculate and update values for tick spacing and nice
 * minimum and maximum data points on the axis.
 */
export const calculateTicks = (
	maxTicks: number,
	minPoint: number,
	maxPoint: number,
	isDate: boolean,
	interval?: "day" | "week" | "month" | "year",
): { tickCount: number; niceMin: number; niceMax: number } => {
	let tickCount: number
	let niceMin: number
	let niceMax: number
	if (isDate && interval) {
		const day = 86400000 // Time in milliseconds
		const intervalLookup = {
			day: day,
			week: day * 7,
			month: day * 30,
			year: day * 365,
		}
		niceMin = niceMinDate(minPoint)
		niceMax = niceMaxDate(maxPoint)
		const range = niceMaxDate(maxPoint) - niceMinDate(minPoint)
		tickCount = Math.round(range / intervalLookup[interval])
	} else {
		const range = niceNum(maxPoint - minPoint, true)
		const tickSpacing = niceNum(range / (maxTicks - 1), true)
		niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing
		niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing
		tickCount = Math.round((niceMax - niceMin) / tickSpacing)
		console.log(maxTicks)
	}

	return { tickCount, niceMin, niceMax }
}

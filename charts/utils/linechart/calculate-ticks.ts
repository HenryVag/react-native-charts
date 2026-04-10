import { niceMaxDate, niceMinDate, niceNum } from "./helpers"

const DAY_IN_MS = 86400000

/**
 * Calculates tick count, nice minimum, and nice maximum for a chart axis.
 *
 * For numeric axes, uses the "nice numbers" algorithm to produce human-friendly tick values.
 * For date axes, tick count is derived from the given interval rather than `maxTicks`.
 *
 * @param maxTicks - Target number of ticks. Ignored when `isDate` is true.
 * @param minPoint - Minimum data value on the axis (timestamp in ms for dates).
 * @param maxPoint - Maximum data value on the axis (timestamp in ms for dates).
 * @param isDate - Whether the axis represents Date values.
 * @param interval - Tick interval for date axes. Required when `isDate` is true.
 * @returns Tick count, nice minimum, and nice maximum for the axis.
 */
export const calculateTicks = (
	maxTicks: number,
	minPoint: number,
	maxPoint: number,
	isDate: boolean,
	dateInterval?: "day" | "week" | "month" | "year",
) => {
	if (isDate && dateInterval) {
		const intervalLookup = {
			// Note: month and year are approximations
			day: DAY_IN_MS,
			week: DAY_IN_MS * 7,
			month: DAY_IN_MS * 30,
			year: DAY_IN_MS * 365,
		}
		const niceMin = niceMinDate(minPoint, dateInterval)
		const niceMax = niceMaxDate(maxPoint, dateInterval)
		const range = niceMax - niceMin
		const tickCount = Math.round(range / intervalLookup[dateInterval])
		const ticks: number[] = []
		const startDate = new Date(niceMin)

		if (dateInterval === "year") {
			for (let i = 0; i < tickCount; i++) {
				const tickDate = new Date(startDate.getFullYear() + i, 0, 1)
				ticks.push(tickDate.valueOf())
			}
			return { ticks, niceMin, niceMax }
		}

		if (dateInterval === "month") {
			for (let i = 0; i < tickCount; i++) {
				const tickDate = new Date(
					startDate.getFullYear(),
					startDate.getMonth() + i,
					1,
				)
				ticks.push(tickDate.valueOf())
			}
			return { ticks, niceMin, niceMax }
		}

		if (dateInterval === "week") {
			for (let i = 0; i < tickCount; i++) {
				ticks.push(niceMin + DAY_IN_MS * 7 * i)
			}
			return { ticks, niceMin, niceMax }
		}

		if (dateInterval === "day") {
			for (let i = 0; i < tickCount; i++) {
				ticks.push(niceMin + DAY_IN_MS * i)
			}
			return { ticks, niceMin, niceMax }
		}
	}

	const range = niceNum(maxPoint - minPoint, true)
	const tickSpacing = niceNum(range / (maxTicks - 1), true)
	const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing
	const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing
	const tickCount = Math.round((niceMax - niceMin) / tickSpacing)

	const ticks: number[] = []
	for (let i = 0; i < tickCount; i++) {
		ticks.push(niceMin + tickSpacing * i)
	}

	return { ticks, niceMin, niceMax }
}

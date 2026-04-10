import type { LabelData } from "@/charts/utils/linechart/types"

/**
 * Returns a "nice" number approximately equal to range. Rounds
 * the number if round = true Takes the ceiling if round = false.
 *
 * @param range the data range
 * @param round whether to round the result
 * @return a "nice" number to be used for the data range
 */
export const niceNum = (range: number, round: boolean): number => {
	let exponent: number
	/** exponent of range */
	let fraction: number
	/** fractional part of range */
	let niceFraction: number
	/** nice, rounded fraction */

	exponent = Math.floor(Math.log10(range))
	fraction = range / Math.pow(10, exponent)

	if (round) {
		if (fraction < 1.5) niceFraction = 1
		else if (fraction < 3) niceFraction = 2
		else if (fraction < 7) niceFraction = 5
		else niceFraction = 10
	} else {
		if (fraction <= 1) niceFraction = 1
		else if (fraction <= 2) niceFraction = 2
		else if (fraction <= 5) niceFraction = 5
		else niceFraction = 10
	}

	return niceFraction * Math.pow(10, exponent)
}

/**
 * Snaps a timestamp down to the nearest clean boundary for the given interval.
 *
 * Uses local time throughout to avoid UTC offset issues.
 * - `week` — snaps back to the nearest Monday
 * - `month` — snaps back to the 1st of the current month
 * - `year` — snaps back to January 1st of the current year
 * - `day` — snaps back to local midnight
 *
 * @param date - Unix timestamp in milliseconds.
 * @param interval - The tick interval determining the boundary type.
 * @returns A timestamp representing the start of the interval period.
 */
export const niceMinDate = (
	date: number,
	interval: "day" | "week" | "month" | "year",
) => {
	const dt = new Date(date)

	if (interval === "week") {
		const day = dt.getDay()
		const daysToMonday = day === 0 ? 6 : day - 1
		const monday = new Date(
			dt.getFullYear(),
			dt.getMonth(),
			dt.getDate() - daysToMonday,
		)
		return monday.valueOf()
	}

	if (interval === "year") {
		return new Date(dt.getFullYear(), 0, 1).valueOf()
	}

	if (interval === "day") {
		return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).valueOf()
	}

	return new Date(dt.getFullYear(), dt.getMonth(), 1).valueOf()
}

/**
 * Snaps a timestamp forward to the next clean boundary for the given interval.
 *
 * Uses local time throughout to avoid UTC offset issues.
 * - `week` — snaps forward to the next Monday
 * - `month` — snaps forward to the 1st of the next month
 * - `year` — snaps forward to January 1st of the next year
 * - `day` — snaps forward to the next local midnight
 *
 * @param date - Unix timestamp in milliseconds.
 * @param interval - The tick interval determining the boundary type.
 * @returns A timestamp representing the start of the next interval period.
 */
export const niceMaxDate = (
	date: number,
	interval: "day" | "week" | "month" | "year",
) => {
	const dt = new Date(date)

	if (interval === "week") {
		const day = dt.getDay()
		const daysToNextMonday = day === 0 ? 1 : 8 - day
		const monday = new Date(
			dt.getFullYear(),
			dt.getMonth(),
			dt.getDate() + daysToNextMonday,
		)

		return monday.valueOf()
	}

	if (interval === "year") {
		return new Date(dt.getFullYear() + 1, 0, 1).valueOf()
	}

	if (interval === "day") {
		return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1).valueOf()
	}
	return new Date(dt.getFullYear(), dt.getMonth() + 1, 1).valueOf()
}

/**
 * Converts a timestamp to a human-readable date string.
 *
 * @param ms -  Timestamp in milliseconds.
 * @param t - The format to return.
 * `"day"` returns the day of the month (e.g. `"7"`).
 * `"week"` returns the week number (e.g. `"3"`).
 * `"month"` returns the full month name in Finnish (e.g. `"Tammikuu"`).
 * `"month-num"` returns the zero-padded month number (e.g. `"03"`).
 * `"year"` returns the four digit year (e.g. `"2024"`).
 * @returns A formatted date string.
 */
export const msToDate = (
	ms: number,
	t: "day" | "week" | "month" | "year" | "month-num",
) => {
	const months = [
		"Tammikuu",
		"Helmikuu",
		"Maaliskuu",
		"Huhtikuu",
		"Toukokuu",
		"Kesäkuu",
		"Heinäkuu",
		"Elokuu",
		"Syyskuu",
		"Lokakuu",
		"Marraskuu",
		"Joulukuu",
	]
	const dt = new Date(ms)
	switch (t) {
		case "day":
			return `${dt.getDate()}`
		case "week":
			return `${getDateWeek(ms)}`
		case "month":
			return `${months[dt.getMonth()]}`
		case "month-num": {
			const res = dt.getMonth() + 1
			if (res < 10) {
				return `0${res}`
			}

			return `${res}`
		}
		case "year":
			return `${dt.getFullYear()}`
	}
}
/**
 * Converts a data x value to its SVG x coordinate.
 *
 * @param x - The data value to convert. Accepts a number or Date object.
 * @param niceMin - The minimum value of the axis scale.
 * @param niceMax - The maximum value of the axis scale.
 * @param chartWidth - The renderable width of the chart excluding padding.
 * @param padding - The horizontal padding offset.
 * @returns SVG x coordinate.
 */
export const toSvgX = (
	x: number | Date,
	niceMin: number,
	niceMax: number,
	chartWidth: number,
	padding: number,
) => {
	const posX =
		((x.valueOf() - niceMin) / (niceMax - niceMin)) * chartWidth + padding
	return posX
}

/**
 * Converts a data y value to its SVG y coordinate.
 *
 * SVG y increases downward, so the formula inverts the axis
 * to map higher data values to lower SVG y positions.
 *
 * @param y - The data value to convert.
 * @param niceMin - The minimum value of the axis scale.
 * @param niceMax - The maximum value of the axis scale.
 * @param chartHeight - The renderable height of the chart excluding padding.
 * @param padding - The vertical padding offset.
 * @returns SVG y coordinate.
 */

export const toSvgY = (
	y: number,
	niceMin: number,
	niceMax: number,
	chartHeight: number,
	padding: number,
) => {
	const posY =
		((y - niceMin) / -(niceMax - niceMin)) * chartHeight + padding + chartHeight
	return posY
}
/**
 * Converts a timestamp in ms to a week number.
 *
 * Does not support leap years.
 *
 * @param ms - Timestamp in milliseconds.
 * @returns The week number (1–52).
 */
export const getDateWeek = (ms: number): number => {
	const date = new Date(ms)
	const localDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	)
	const januaryFirst = new Date(localDate.getFullYear(), 0, 1)
	const daysToNextMonday =
		januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7

	const nextMonday = new Date(
		localDate.getFullYear(),
		0,
		januaryFirst.getDate() + daysToNextMonday,
	)

	return localDate < nextMonday
		? 52
		: localDate > nextMonday
			? Math.floor(
					(localDate.getTime() - nextMonday.getTime()) /
						(24 * 3600 * 1000 * 7) +
						1,
				)
			: 1
}

/**
 * Converts a raw axis value into a `LabelData` object for use in `labelComponent`.
 *
 * The returned shape depends on whether the value is a date or a number:
 *
 * **Numeric values** (`isDate: false`):
 * - `valueX` — the number as a string (e.g. `"42"`)
 *
 * **Date values** (`isDate: true`, `val` is a Unix timestamp in ms):
 * - `day` — day of the month (e.g. `"15"`)
 * - `week` — week number (e.g. `"W3"`)
 * - `monthNum` — numeric month (e.g. `"3"`)
 * - `month` — month name abbreviation (e.g. `"Mar"`)
 * - `year` — four digit year (e.g. `"2024"`)
 *
 * @example
 * // Numeric axis
 * labelComponent={(label) => <Text>{label.valueX}</Text>}
 *
 * // Date axis
 * labelComponent={(label) => <Text>{label.week} {label.year}</Text>}
 *
 * @param val - The axis tick value. A Unix timestamp in ms when `isDate` is true.
 * @param isDate - Whether the value represents a date.
 * @returns A `LabelData` object with keys appropriate for the value type.
 */
export const getLabelData = (val: number, isDate: boolean): LabelData => {
	if (isDate) {
		return {
			day: msToDate(val, "day"),
			week: msToDate(val, "week"),
			monthNum: msToDate(val, "month-num"),
			month: msToDate(val, "month"),
			year: msToDate(val, "year"),
		}
	}
	return {
		valueX: String(val),
	}
}

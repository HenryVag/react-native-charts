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

export const niceMinDate = (date: number) => {
	const dt = new Date(date)
	const day = dt.getDate()
	const newDate = date - (day - 1) * 86400000
	return newDate
}

export const niceMaxDate = (date: number) => {
	const dt = new Date(date)
	const day = dt.getDate()
	const mth = 1 + dt.getMonth()
	let newDate = dt.setMonth(5)
	newDate = date - (day - 1) * 86400000
	return newDate
}

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

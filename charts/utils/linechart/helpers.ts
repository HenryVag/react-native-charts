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
	const newDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 1)
	return newDate
}

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
		case "month-num":
			return `${dt.getMonth() + 1}`
		case "year":
			return `${dt.getFullYear()}`
	}
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

function getDateWeek(ms: number) {
	const date = new Date(ms)
	const currentDate = typeof date === "object" ? date : new Date()
	const januaryFirst = new Date(currentDate.getFullYear(), 0, 1)
	const daysToNextMonday =
		januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7
	const nextMonday = new Date(
		currentDate.getFullYear(),
		0,
		januaryFirst.getDate() + daysToNextMonday,
	)

	return currentDate < nextMonday
		? 52
		: currentDate > nextMonday
			? Math.ceil(
					(currentDate.getTime() - nextMonday.getTime()) /
						(24 * 3600 * 1000) /
						7,
				)
			: 1
}

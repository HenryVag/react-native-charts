export const validateData = (inputArr: unknown) => {
	//Check if input is of type: Array
	if (!Array.isArray(inputArr) || inputArr.length === 0) {
		console.error("Linechart input data must be a non-empty array.")
		return null
	}

	const hasValidObjects = inputArr.every(
		(obj) =>
			obj !== null &&
			typeof obj === "object" &&
			"x" in obj &&
			"y" in obj &&
			typeof obj.y === "number",
	)

	if (!hasValidObjects) {
		console.error(
			"Linechart did not receive valid objects of shape: {x: number | Date, y: number}",
		)
		return null
	}

	const hasDates = inputArr.some((obj) => obj.x instanceof Date)
	const hasNumbers = inputArr.some((obj) => typeof obj.x === "number")

	if (hasDates && hasNumbers) {
		console.error(
			"Linechart x values must all be either of type Date or type number.",
		)
		return null
	}

	const sortedInputArr = [...inputArr].sort(
		(a, b) => a.x.valueOf() - b.x.valueOf(),
	)

	return { sortedInputArr, hasDates }
}

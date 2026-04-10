/**
 * Validates the input data array for use in LineChart.
 *
 * Checks that the input is a non-empty array of `{ x, y }` objects where
 * `x` is either all numbers or all Dates, and `y` is always a number.
 *
 * @param inputArr - The raw input to validate. Typed as `unknown` to handle untyped consumer data.
 *   @returns A sorted array and date flag if valid. Throws if validation fails.
 */

export const validateData = (
	inputArr: unknown,
): {
	sortedInputArr: { x: number | Date; y: number }[]
	hasDates: boolean
} | null => {
	if (!Array.isArray(inputArr) || inputArr.length === 0) {
		throw new Error("LineChart input data must be a non-empty array.")
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
		throw new Error(
			"Linechart did not receive valid objects of shape: {x: number | Date, y: number}",
		)
	}

	const hasDates = inputArr.some((obj) => obj.x instanceof Date)
	const hasNumbers = inputArr.some((obj) => typeof obj.x === "number")

	if (hasDates && hasNumbers) {
		throw new Error(
			"Linechart x values must all be either of type Date or type number.",
		)
	}
	const validatedArr = inputArr as { x: number | Date; y: number }[]
	const sortedInputArr = [...validatedArr].sort(
		(a, b) => a.x.valueOf() - b.x.valueOf(),
	)

	return { sortedInputArr, hasDates }
}

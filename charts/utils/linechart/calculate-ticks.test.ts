import { describe, expect, test } from "bun:test"
import { calculateTicks } from "@/charts/utils/linechart/calculate-ticks"

describe("calculateTicks", () => {
	test("returns even tickSpacing for min and max values of type number", () => {
		const result = calculateTicks(5, 0, 100, false)
		const spacing = result.ticks[1] - result.ticks[0]
		for (let i = 1; i < result.ticks.length; i++) {
			expect(result.ticks[i] - result.ticks[i - 1]).toBe(spacing)
		}
	})

	test("generates daily ticks correctly", () => {
		const DAY = 86400000
		const start = new Date("2024-01-01").valueOf()
		const end = start + DAY * 3

		const result = calculateTicks(0, start, end, true, "day")

		expect(result.ticks.length).toBe(4)
		expect(result.ticks[1] - result.ticks[0]).toBe(DAY)
	})

	test("generates weekly ticks correctly", () => {
		const DAY = 86400000
		const start = new Date("2024-01-01").valueOf()
		const end = start + DAY * 6 + DAY * 7

		const result = calculateTicks(0, start, end, true, "week")

		expect(result.ticks.length).toBe(2)
	})

	test("aligns monthly ticks to start of month", () => {
		const start = new Date("2024-01-15").valueOf()
		const end = new Date("2024-04-15").valueOf()

		const result = calculateTicks(0, start, end, true, "month")

		const first = new Date(result.ticks[0])
		expect(first.getDate()).toBe(1)
	})
	test("handles zero range", () => {
		const result = calculateTicks(5, 100, 100, false)
		expect(result.ticks.length).toBe(0)
	})
})

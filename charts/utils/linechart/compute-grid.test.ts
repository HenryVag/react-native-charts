import { describe, expect, test } from "bun:test"
import { computeGrid } from "./compute-grid"

describe("compute-grid", () => {
	test("returns x and y grid data with axis positions", () => {
		const result = computeGrid(
			{ ticks: [0, 10], niceMin: 0, niceMax: 10 },
			{ ticks: [0, 10], niceMin: 0, niceMax: 10 },
			0,
			0,
			100,
			100,
			1,
			10,
			true,
			"left",
			5,
		)
		expect(result.xGridData.length).toBeGreaterThan(0)
		expect(result.yGridData.length).toBeGreaterThan(0)
		expect(result.xAxisY).toBeDefined()
		expect(result.yAxisX).toBeDefined()
	})

	test("applies labelInterval and showXLabels correctly", () => {
		const result = computeGrid(
			{ ticks: [0, 1, 2, 3, 4], niceMin: 0, niceMax: 4 },
			{ ticks: [0, 1], niceMin: 0, niceMax: 1 },
			0,
			0,
			100,
			100,
			2, // labelInterval
			10,
			true,
			"none",
			5,
		)

		expect(result.xGridData.map((d) => d.showLabels)).toEqual([
			false,
			true,
			false,
			true,
		])
	})
	test("toggles y-axis labels based on yLabelPos", () => {
		const result = computeGrid(
			{ ticks: [0, 10], niceMin: 0, niceMax: 10 },
			{ ticks: [0, 5, 10], niceMin: 0, niceMax: 10 },
			0,
			0,
			100,
			100,
			1,
			10,
			true,
			"none",
			5,
		)

		expect(result.yGridData.every((d) => d.showLabels)).toBe(false)
	})
})

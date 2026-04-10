import { describe, expect, test } from "bun:test"
import { computeAxes } from "./compute-axes"

describe("computeAxes", () => {
	test("returns axis data structures", () => {
		const result = computeAxes(
			{ niceMin: 0, niceMax: 10, ticks: [] },
			{ niceMin: 0, niceMax: 10, ticks: [] },
			0,
			0,
			100,
			100,
			10,
			true,
			"left",
			true,
			true,
			5,
		)
		expect(result.xAxisData).toHaveLength(2)
		expect(result.yAxisData).toHaveLength(2)
		expect(result.bottomLabelData).toBeDefined()
		expect(result.topLabelData).toBeDefined()
	})

	test("shows left labels only when showYLabels is 'left'", () => {
		const { yAxisData } = computeAxes(
			{ niceMin: 0, niceMax: 10, ticks: [] },
			{ niceMin: 0, niceMax: 10, ticks: [] },
			0,
			0,
			100,
			100,
			10,
			true,
			"left",
			true,
			true,
			5,
		)

		expect(yAxisData[0].showLabel).toBe(true) // left
		expect(yAxisData[1].showLabel).toBe(false) // right
	})

	test("shows right labels only when showYLabels is 'right'", () => {
		const { yAxisData } = computeAxes(
			{ niceMin: 0, niceMax: 10, ticks: [] },
			{ niceMin: 0, niceMax: 10, ticks: [] },
			0,
			0,
			100,
			100,
			10,
			true,
			"right",
			true,
			true,
			5,
		)

		expect(yAxisData[0].showLabel).toBe(false) // left
		expect(yAxisData[1].showLabel).toBe(true) // right
	})

	test("toggles bottom labels with showXLabels", () => {
		const result = computeAxes(
			{ niceMin: 0, niceMax: 10, ticks: [] },
			{ niceMin: 0, niceMax: 10, ticks: [] },
			0,
			0,
			100,
			100,
			10,
			false,
			"none",
			true,
			true,
			5,
		)

		expect(result.xAxisData[1].showLabel).toBe(false)
		expect(result.bottomLabelData.showLabel).toBe(false)
	})
})

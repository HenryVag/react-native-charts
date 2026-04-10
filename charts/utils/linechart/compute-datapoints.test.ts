import { describe, expect, test } from "bun:test"
import { computeDataPoints } from "@/charts/utils/linechart/compute-datapoints"

describe("computeDataPoints", () => {
	test("maps data points to svg coordinates", () => {
		const data = [{ x: 10, y: 20 }]

		const result = computeDataPoints(
			data,
			0,
			0,
			100,
			100,
			{ niceMin: 0, niceMax: 100, ticks: [] },
			{ niceMin: 0, niceMax: 100, ticks: [] },
			0,
		)

		expect(result[0]).toEqual({
			cx: 10,
			cy: 80,
			x: 10,
			y: 20,
		})
	})
	test("converts Date x values to numbers", () => {
		const date = new Date("2024-01-01")

		const result = computeDataPoints(
			[{ x: date, y: 20 }],
			0,
			0,
			100,
			100,
			{ niceMin: 0, niceMax: 100, ticks: [] },
			{ niceMin: 0, niceMax: 100, ticks: [] },
			0,
		)

		expect(result[0].x).toBe(date.valueOf())
	})
})

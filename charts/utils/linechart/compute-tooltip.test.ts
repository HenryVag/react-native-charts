import { describe, expect, test } from "bun:test"
import { computeToolTip } from "./compute-tooltip"

describe("computeTooltip", () => {
	test("returns null when no data point is selected", () => {
		const result = computeToolTip(
			null,
			10,
			5,
			100,
			"title",
			"label",
			false,
			"day",
			10,
		)

		expect(result).toBeNull()
	})
	test("returns tooltip data when a point is selected", () => {
		const result = computeToolTip(
			{ cx: 50, cy: 50, x: 1000, y: 20 },
			10,
			5,
			100,
			"title",
			"label",
			false,
			"day",
			10,
		)

		expect(result).not.toBeNull()
		if (!result) return
		expect(result.toolTipX).toBeDefined()
		expect(result.toolTipY).toBeDefined()
		expect(result.toolTipWidth).toBeDefined()
		expect(result.toolTipHeight).toBeDefined()
	})
})

import { msToDate } from "./helpers"

export const computeToolTip = (
	selectedDataPoint: { cx: number; cy: number; x: number; y: number } | null,
	fontSize: number,
	dataPointRadius: number,
	chartHeight: number,
	titleLength: number,
	labelLength: number,
	isDate: boolean,
	dateInterval: "day" | "week" | "month" | "year" | "month-num",
	paddingY: number,
) => {
	const { cx, cy, x, y } = { ...selectedDataPoint }

	if (selectedDataPoint && cx && cy && x) {
		const toolTipHeight = fontSize * 6
		const toolTipWidth = 0.65 * fontSize * Math.max(titleLength, labelLength)
		const spacingY = dataPointRadius + chartHeight * 0.03
		const fitsAbove = cy - toolTipHeight - spacingY > paddingY / 2
		const toolTipX = cx - toolTipWidth / 2
		const toolTipY = fitsAbove ? cy - spacingY - toolTipHeight : cy + fontSize
		const toolTipTitleX = toolTipX + fontSize / 2
		const toolTipTitleY = toolTipY + fontSize * 1.5
		const toolTipLabelY = toolTipTitleY + fontSize * 2
		const valueX = isDate ? msToDate(x, dateInterval) : x

		const valueY = y
		return {
			toolTipX,
			toolTipY,
			toolTipWidth,
			toolTipHeight,
			toolTipTitleX,
			toolTipTitleY,
			toolTipLabelY,
			valueX,
			valueY,
		}
	}
	return null
}

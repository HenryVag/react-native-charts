import { msToDate } from "./helpers"

// Empirically determined tooltip sizing constants
const TOOLTIP_HEIGHT_SCALE = 6
const TOOLTIP_WIDTH_SCALE = 0.65
const TOOLTIP_CHART_SPACING = 0.03
const TOOLTIP_TITLE_Y_OFFSET = 1.5
const TOOLTIP_LABEL_Y_OFFSET = 2
/**
 * Computes tooltip position, size, and display values for a selected data point.
 *
 * Returns null when no data point is selected. The tooltip is positioned above
 * the data point when there is sufficient space, otherwise below.
 *
 * @param selectedDataPoint - The currently selected data point, or null if none selected.
 * @param fontSize - Scaled font size used for tooltip sizing calculations.
 * @param dataPointRadius - Radius of the data point marker, used for spacing.
 * @param chartHeight - Renderable height of the chart, used to determine tooltip placement.
 * @param isDate - Whether the x value is a date.
 * @param dateInterval - Interval used to format the date value.
 * @param paddingY - Vertical padding of the chart, used to constrain tooltip placement.
 * @returns Tooltip position, size, and formatted values, or null if no point is selected.
 */
export const computeToolTip = (
	selectedDataPoint: { cx: number; cy: number; x: number; y: number } | null,
	fontSize: number,
	dataPointRadius: number,
	chartHeight: number,
	titleStr: string,
	labelStr: string,
	isDate: boolean,
	dateInterval: "day" | "week" | "month" | "year" | "month-num",
	paddingY: number,
) => {
	if (selectedDataPoint === null) {
		return null
	}
	const { cx, cy, x, y } = selectedDataPoint
	const toolTipHeight = fontSize * TOOLTIP_HEIGHT_SCALE
	const toolTipWidth =
		TOOLTIP_WIDTH_SCALE * fontSize * Math.max(titleStr.length, labelStr.length)
	const spacingY = dataPointRadius + chartHeight * TOOLTIP_CHART_SPACING
	const fitsAbove = cy - toolTipHeight - spacingY > paddingY / 2
	const toolTipX = cx - toolTipWidth / 2
	const toolTipY = fitsAbove ? cy - spacingY - toolTipHeight : cy + fontSize
	const toolTipTitleX = toolTipX + fontSize / 2
	const toolTipTitleY = toolTipY + fontSize * TOOLTIP_TITLE_Y_OFFSET
	const toolTipLabelY = toolTipTitleY + fontSize * TOOLTIP_LABEL_Y_OFFSET
	const valueX = isDate ? msToDate(x, dateInterval) : x

	return {
		toolTipX,
		toolTipY,
		toolTipWidth,
		toolTipHeight,
		toolTipTitleX,
		toolTipTitleY,
		toolTipLabelY,
		valueX,
		valueY: y,
	}
}

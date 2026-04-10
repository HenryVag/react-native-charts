import { G, Rect, Text as SVGText } from "react-native-svg"

type ToolTipData = {
	toolTipX: number
	toolTipY: number
	toolTipWidth: number
	toolTipHeight: number
	toolTipTitleX: number
	toolTipTitleY: number
	toolTipLabelY: number
	valueX: number | string
	valueY: number | undefined
}

type ToolTipProps = {
	toolTipData: ToolTipData | null
	fontSize: number
	toolTipTitleFont?: string
	labelFont: string | undefined
	toolTipTitle: string
	toolTipValueLabel: string
}
const TOOLTIP_TITLE_FONT_SCALE = 1.143

/**
 * Renders an interactive tooltip as SVG elements when a data point is pressed.
 *
 * Renders nothing when `toolTipData` is null. All positioning and sizing is
 * pre-calculated by `computeToolTip` and passed in via `toolTipData`.
 *
 * @param toolTipData - Pre-calculated position and value data for the tooltip. Pass `null` to hide.
 * @param fontSize - Base font size for the value label.
 * @param toolTipTitleFont - Font family for the title row.
 * @param labelFont - Font family for the value row.
 * @param toolTipTitle - Label describing the x value (e.g. `"Week"`).
 * @param toolTipValueLabel - Label describing the y value (e.g. `"kg"`).
 */
export const ToolTip = ({
	toolTipData,
	fontSize,
	toolTipTitleFont,
	labelFont,
	toolTipTitle,
	toolTipValueLabel,
}: ToolTipProps) => {
	if (toolTipData === null) {
		return null
	}
	const {
		toolTipX,
		toolTipY,
		toolTipWidth,
		toolTipHeight,
		toolTipTitleX,
		toolTipTitleY,
		toolTipLabelY,
		valueX,
		valueY,
	} = toolTipData

	const title = `${toolTipTitle}: ${valueX}`
	const label = `${toolTipValueLabel}: ${valueY}`

	return (
		<G>
			<Rect
				height={toolTipHeight}
				width={toolTipWidth}
				x={toolTipX}
				y={toolTipY}
				stroke={"black"}
				fill={"white"}
				rx={3}
			/>
			<SVGText
				x={toolTipTitleX}
				y={toolTipTitleY}
				textAnchor="start"
				fontSize={fontSize * TOOLTIP_TITLE_FONT_SCALE}
				fontFamily={toolTipTitleFont}
			>
				{title}
			</SVGText>

			<SVGText
				x={toolTipTitleX}
				y={toolTipLabelY}
				textAnchor="start"
				fontSize={fontSize}
				fontFamily={labelFont}
			>
				{label}
			</SVGText>
		</G>
	)
}

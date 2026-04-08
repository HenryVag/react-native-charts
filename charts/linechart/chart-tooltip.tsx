import { G, Rect, Text as SVGText } from "react-native-svg"
import { msToDate } from "../utils/linechart/helpers"

type ToolTipProps = {
	data: { cx: number; cy: number; x: number; y: number }
	chartHeight: number
	chartWidth: number
	dataPointRadius: number
	fontSize: number
	toolTipTitleFont?: string
	labelFont: string | undefined
	toolTipTitle: string
	toolTipValueLabel: string
}

export const ToolTip = ({
	data,
	chartHeight,
	chartWidth,
	dataPointRadius,
	fontSize,
	toolTipTitleFont,
	labelFont,
	toolTipTitle,
	toolTipValueLabel,
}: ToolTipProps) => {
	const { cx, cy, x, y } = { ...data }
	const title = `${toolTipTitle}: ${msToDate(x, "week")}`
	const label = `${toolTipValueLabel}: ${y}`
	const toolTipHeight = fontSize * 6
	const toolTipWidth = 0.6 * fontSize * Math.max(label.length, title.length)
	const spacingY = dataPointRadius + chartHeight * 0.03
	const fitsAbove = cy - toolTipHeight - spacingY > 0
	const toolTipX = cx - toolTipWidth / 2
	let toolTipY = cy + fontSize
	if (fitsAbove) {
		toolTipY = cy - spacingY - toolTipHeight
	}
	const toolTipTitleX = toolTipX + fontSize / 2
	const toolTipTitleY = toolTipY + fontSize * 1.5
	const toolTipLabelX = toolTipTitleX
	const toolTipLabelY = toolTipTitleY + fontSize * 2
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
				fontSize={fontSize * 1.143}
				fontFamily={toolTipTitleFont}
			>
				{title}
			</SVGText>

			<SVGText
				x={toolTipLabelX}
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

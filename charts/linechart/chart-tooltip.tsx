import { G, Rect, Text as SVGText } from "react-native-svg"
import { msToDate } from "@/charts/utils/linechart/helpers"

type ToolTipProps = {
	toolTipData: {
		toolTipX: number
		toolTipY: number
		toolTipWidth: number
		toolTipHeight: number
		toolTipTitleX: number
		toolTipTitleY: number
		toolTipLabelY: number
		valueX: number | string
		valueY: number | undefined
	} | null
	fontSize: number
	toolTipTitleFont?: string
	labelFont: string | undefined
	toolTipTitle: string
	toolTipValueLabel: string
}

export const ToolTip = ({
	toolTipData,
	fontSize,
	toolTipTitleFont,
	labelFont,
	toolTipTitle,
	toolTipValueLabel,
}: ToolTipProps) => {
	if (toolTipData === null) {
		return
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

	const toolTipLabelX = toolTipTitleX
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

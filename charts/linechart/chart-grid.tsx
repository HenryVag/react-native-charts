import type { ColorValue } from "react-native"
import { G, Line, Text as SVGText } from "react-native-svg"
import { getLabelData } from "@/charts/utils/linechart/helpers"
import type {
	LabelData,
	XGridItem,
	YGridItem,
} from "@/charts/utils/linechart/types"

type ChartGridProps = {
	xGridData: XGridItem[]
	yGridData: YGridItem[]
	isDate: boolean
	labelFontSize: number
	stroke: ColorValue
	xStroke?: ColorValue
	yStroke?: ColorValue
	strokeWidth: number
	opacity: string | number
	showGridX: boolean
	showGridY: boolean
	labelFont: string | undefined
	labelComponent?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}

export const ChartGrid = ({
	xGridData,
	yGridData,
	isDate,
	labelFontSize,
	stroke,
	xStroke,
	yStroke,
	strokeWidth,
	opacity,
	showGridX,
	showGridY,
	labelFont,
	labelComponent,
}: ChartGridProps) => {
	return (
		<G>
			{yGridData.map((line) => (
				<G key={line.y1}>
					{showGridY && (
						<Line
							x1={line.x1}
							y1={line.y1}
							x2={line.x2}
							y2={line.y2}
							stroke={yStroke ?? stroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}
					{line.showLabels && (
						<SVGText
							x={line.labelX}
							y={line.labelY}
							textAnchor={line.labelAnchor}
							fontSize={labelFontSize}
							fontFamily={labelFont}
						>
							{line.val}
						</SVGText>
					)}
				</G>
			))}
			{xGridData.map((line) => (
				<G key={line.x1}>
					{showGridX && (
						<Line
							x1={line.x1}
							y1={line.y1}
							x2={line.x2}
							y2={line.y2}
							stroke={xStroke ?? stroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}

					{labelComponent &&
						line.showLabels &&
						labelComponent(
							getLabelData(line.val, isDate),
							line.labelX,
							line.yVal,
							labelFontSize,
						)}
				</G>
			))}
		</G>
	)
}

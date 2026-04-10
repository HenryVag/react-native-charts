import type { ColorValue } from "react-native"
import { G, Line, Text as SVGText } from "react-native-svg"
import { getLabelData } from "@/charts/utils/linechart/helpers"
import type {
	AxisLabelData,
	LabelData,
	XAxisDataItem,
	YAxisDataItem,
} from "@/charts/utils/linechart/types"

/**
 * Renders the axis lines and labels for a line chart as SVG elements.
 *
 * Intended to be composed inside a parent `Svg` element — not used standalone.
 * Supports optional custom label rendering via `labelComponent` for both x and y axes.
 * If `labelComponent` is not provided, x-axis labels are not rendered.
 *
 * @param xAxisData - Positioned line and label data for each x-axis line.
 * @param yAxisData - Positioned line and label data for each y-axis line.
 * @param bottomLabelData - Position and visibility data for the bottom axis label.
 * @param topLabelData - Position and visibility data for the top axis label.
 * @param fontSize - Scaled font size used for all axis labels.
 * @param hasDates - Whether the x-axis represents Date values. Passed to `labelComponent` via `getLabelData`.
 * @param strokeWidth - Stroke width of the axis lines.
 * @param opacity - Opacity of the axis lines.
 * @param xAxisStroke - Colour of the x-axis lines.
 * @param yAxisStroke - Colour of the y-axis lines.
 * @param labelFont - Font family applied to all axis labels.
 * @param topLabel - Text rendered above the y-axis, e.g. a unit descriptor `"kg"`.
 * @param bottomLabel - Label data passed to `labelComponent` for the bottom x-axis label.
 * @param labelComponent - Optional render function for custom axis labels. Receives label data, x/y position, and font size.
 */

type ChartAxesProps = {
	xAxisData: XAxisDataItem[]
	yAxisData: YAxisDataItem[]
	bottomLabelData: AxisLabelData
	topLabelData: AxisLabelData
	fontSize: number
	hasDates: boolean
	strokeWidth: number
	opacity: number | string
	xAxisStroke: ColorValue
	yAxisStroke: ColorValue
	labelFont: string | undefined
	topLabel: string
	bottomLabel: LabelData
	labelComponent?: (
		label: LabelData,
		x: number,
		y: number,
		fontSize: number,
	) => React.ReactNode
}

export const ChartAxes = ({
	xAxisData,
	yAxisData,
	bottomLabelData,
	topLabelData,
	fontSize,
	hasDates,
	strokeWidth,
	opacity,
	xAxisStroke,
	yAxisStroke,
	labelFont,
	topLabel,
	bottomLabel,
	labelComponent,
}: ChartAxesProps) => {
	return (
		<G>
			{yAxisData.map((axis, i) => (
				//Using i as key since the data is pre computed and is not reordered

				<G key={i}>
					{axis.showAxis && (
						<Line
							x1={axis.x1}
							y1={axis.y1}
							x2={axis.x2}
							y2={axis.y2}
							stroke={yAxisStroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}
					{axis.showLabel && (
						<>
							<SVGText
								x={axis.minLabelX}
								y={axis.minLabelY}
								fontSize={fontSize}
								textAnchor={axis.labelAnchor}
								fontFamily={labelFont}
							>
								{axis.minLabel}
							</SVGText>

							<SVGText
								x={axis.maxLabelX}
								y={axis.maxLabelY}
								fontSize={fontSize}
								textAnchor={axis.labelAnchor}
								fontFamily={labelFont}
							>
								{axis.maxLabel}
							</SVGText>
						</>
					)}
				</G>
			))}
			{xAxisData.map((axis, i) => (
				//Using i as key since the data is pre computed and is not reordered
				<G key={i}>
					{axis.showAxis && (
						<Line
							x1={axis.x1}
							y1={axis.y1}
							x2={axis.x2}
							y2={axis.y2}
							stroke={xAxisStroke}
							strokeWidth={strokeWidth}
							opacity={opacity}
						/>
					)}
					{labelComponent && axis.showLabel && (
						<>
							{labelComponent(
								getLabelData(axis.minLabel, hasDates),
								axis.minLabelX,
								axis.minLabelY,
								fontSize,
							)}

							{labelComponent(
								getLabelData(axis.maxLabel, hasDates),
								axis.maxLabelX,
								axis.maxLabelY,
								fontSize,
							)}
						</>
					)}
				</G>
			))}

			{topLabelData.showLabel && (
				<SVGText
					x={topLabelData.x}
					y={topLabelData.y}
					fontSize={fontSize}
					textAnchor={topLabelData.labelAnchor}
					fontFamily={labelFont}
				>
					{topLabel}
				</SVGText>
			)}
			{labelComponent &&
				bottomLabelData.showLabel &&
				labelComponent(
					bottomLabel,
					bottomLabelData.x + fontSize,
					bottomLabelData.y - fontSize * 2,
					fontSize,
				)}
		</G>
	)
}

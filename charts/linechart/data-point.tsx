import type { ColorValue } from "react-native"
import { Circle } from "react-native-svg"

type DataPointProps = {
	cx: number
	cy: number
	radius: number
	fill: string
	stroke?: ColorValue
	strokeWidth: number
	isVisible: boolean
	onPress?: () => void
}
/**
 * Renders a single interactive data point as an SVG circle.
 *
 * The circle is only rendered when `isVisible` is true — it is unmounted entirely rather than hidden.
 *
 * @param cx - The x coordinate of the circle center in SVG space.
 * @param cy - The y coordinate of the circle center in SVG space.
 * @param radius - The radius of the circle in SVG units.
 * @param fill - Fill colour of the circle.
 * @param stroke - Stroke colour of the circle border.
 * @param strokeWidth - Width of the circle border.
 * @param isVisible - Whether to render the circle.
 * @param onPress - Optional callback fired when the circle is pressed.
 */
export const DataPoint = ({
	cx,
	cy,
	radius,
	fill,
	stroke,
	strokeWidth,
	isVisible,
	onPress,
}: DataPointProps) => {
	if (!isVisible) {
		return null
	}
	return (
		<Circle
			fill={fill}
			cx={cx}
			cy={cy}
			r={radius}
			stroke={stroke}
			strokeWidth={strokeWidth}
			onPress={onPress}
		/>
	)
}

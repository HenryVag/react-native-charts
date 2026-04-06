import { ColorValue } from "react-native"
import Svg, { Circle, G } from "react-native-svg"

type DataPointProps = {
	cx: number
	cy: number
	radius: number
	fill: string
	stroke?: ColorValue
	strokeWidth: number
	isVisible: boolean
}

export const DataPoint = ({
	cx,
	cy,
	radius,
	fill,
	stroke,
	strokeWidth,
	isVisible,
}: DataPointProps) => {
	return (
		<>
			{isVisible && (
				<Circle
					fill={fill}
					fillOpacity={"100%"}
					cx={cx}
					cy={cy}
					r={radius}
					stroke={stroke}
					strokeWidth={strokeWidth}
				/>
			)}
		</>
	)
}

export default DataPoint

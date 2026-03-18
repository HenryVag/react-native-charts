import Svg, { Circle } from "react-native-svg"

type DataPointProps = {
	radius: number
	fill?: string
	stroke?: string
}

const DataPoint = () => {
	//TODO: Add dynamic scaling
	//TODO: Add modifyable props
	return (
		<Svg width={100} height={100}>
			<Circle
				fill={"red"}
				cx={50}
				cy={50}
				r={25}
				stroke={"black"}
				strokeWidth={2}
			/>
		</Svg>
	)
}

export default DataPoint

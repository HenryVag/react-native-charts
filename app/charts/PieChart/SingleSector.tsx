import { View } from "react-native"
import Svg, { Circle, Text } from "react-native-svg"

type SingleSectorProps = {
    data: {group?: string, fill?: string, label: string}[]
    radius: number
    padding: number
    stroke?: string
    strokeWidth?: number
    labelFont?: string
    labelFontSize?: number
    showLabels: boolean
    title?: string
}

/**
 * Renders a single sector (full circle) for PieChart
 * @param data - array with a single object {  group?: string, fill?: string, label: string }
 * @param radius - size of the circle
 * @param padding - padding between chart and container
 * @param stroke - circle border color
 * @param strokeWidth - width of the border
 * @param labelFont - font family of the label
 * @param labelFontSize - font size of the label
 * @param showLabels - whether to display the value in the center
 * @param title - accessibility label for screen readers
 */


const SingleSector = ({data, radius, padding, stroke, strokeWidth, labelFont, labelFontSize, showLabels, title}: SingleSectorProps) => {
    return ( 
        <View accessible={true} accessibilityLabel={title} accessibilityRole={"image"}>
            <Svg width={radius * 2}
                height={radius * 2}
                viewBox={` ${-padding} ${-padding} ${radius * 2 + padding * 2} ${radius * 2 + padding * 2}`}
                accessible={false}
                aria-hidden={true}
                
                >
                <Circle cx={radius} cy={radius} r={radius} stroke={stroke ?? "black"} strokeWidth={strokeWidth} fill={data[0].fill ?? "grey"} accessible={false}  />
                { showLabels && <Text fontFamily={labelFont} fontSize={labelFontSize ? labelFontSize * radius * 0.0225 : radius * 0.225} x={radius} y={radius} textAnchor="middle" accessible={false}>{data[0].label} </Text>}    
            </Svg>
        </View>
    )
}

export default SingleSector
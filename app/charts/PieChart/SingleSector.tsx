import Svg from "react-native-svg"

type SingleSectorProps = {
    data: {group?: string, value: number, fill?: string}[]
    radius: number
    stroke?: string
    strokeWidth?: number
    labelFont?: string
    labelFontSize?: number
    showLabels?: boolean

}

/**
 * Renders a single sector (full circle) for PieChart
 * @param data - array with a single object { value: number, fill?: string }
 * @param radius - size of the circle
 * @param stroke - circle border color
 * @param strokeWidth - width of the border
 * @param labelFont - font family of the label
 * @param labelFontSize - font size of the label
 * @param showLabels - whether to display the value in the center
 */


const SingleSector = ({data, radius, stroke, strokeWidth, labelFont, labelFontSize, showLabels}: SingleSectorProps) => {

    return ( 
        <Svg width={radius * 10}
            height={radius * 10}
            viewBox={`-10 -10 ${radius * 2 + 20} ${radius * 2 + 20}`}
            >
            <circle cx={radius} cy={radius} r={radius} stroke={stroke ?? "black"} strokeWidth={strokeWidth} fill={data[0].fill ?? "grey"} />
            { showLabels && <text fontFamily={labelFont} fontSize={labelFontSize ? labelFontSize * radius * 0.0225 : radius * 0.225} x={radius} y={radius} textAnchor="middle" dominantBaseline="middle">{data[0].value} </text>}    
        </Svg>
    )
}

export default SingleSector
import Svg from "react-native-svg";

type PieChartPlaceHolderProps = {
    radius: number;
    strokeWidth?: number;
    stroke?:string;
    placeHolderFill?: string;
}

/**
 * PieChartPlaceHolder component
 *
 * Renders a simple placeholder circle for the PieChart
 * when the input data is invalid or empty.
 *
 * @param radius - Radius of the placeholder circle
 * @param strokeWidth - Width of the circle stroke (optional)
 * @param stroke - Stroke color (optional)
 * @param placeHolderFill - Fill color of the placeholder (optional, default "#E5E7EB")
 *
 * @returns JSX.Element - An SVG circle acting as a placeholder
 */

const PieChartPlaceHolder = ({radius, strokeWidth, stroke, placeHolderFill}: PieChartPlaceHolderProps ) => {
    const padding = radius * 0.1
    return(

        <Svg width={radius * 2}
            height={radius * 2}
            viewBox={`${-padding} ${-padding} ${radius * 2 + padding * 2} ${radius * 2 + padding * 2}`}
            >
          <circle cx={radius} cy={radius} r={radius} strokeWidth={strokeWidth} stroke={stroke} fill={placeHolderFill ?? "#E5E7EB"} />
        </Svg>
        )
}

export default PieChartPlaceHolder
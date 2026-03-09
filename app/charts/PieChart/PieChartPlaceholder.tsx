import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type PieChartPlaceHolderProps = {
    radius: number;
    padding: number;
    strokeWidth?: number;
    stroke?:string;
    placeHolderFill?: string;
    title?: string
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
 * @param title - Accessibility label, falls back to English if not set
 * 
 * @returns JSX.Element - An SVG circle acting as a placeholder
 */

const PieChartPlaceHolder = ({radius, padding, strokeWidth, stroke, placeHolderFill, title}: PieChartPlaceHolderProps ) => {
    
    return(
        <View accessible={true} accessibilityLabel={title ?? "No chart data available"} accessibilityRole={"image"}>
            <Svg width={radius * 2}
                height={radius * 2}
                viewBox={`${-padding} ${-padding} ${radius * 2 + padding * 2} ${radius * 2 + padding * 2}`}
                 accessible={false}
                aria-hidden={true}
                >
                <Circle cx={radius} cy={radius} r={radius} strokeWidth={strokeWidth} stroke={stroke} fill={placeHolderFill ?? "#E5E7EB"} accessible={false} />
            </Svg>
        </View>
    )
}

export default PieChartPlaceHolder
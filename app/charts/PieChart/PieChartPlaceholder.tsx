import Svg from "react-native-svg";

type PieChartPlaceHolderProps = {
    radius: number;
    strokeWidth?: number;
    stroke?:string;
    placeHolderFill?: string;
}


const PieChartPlaceHolder = ({radius, strokeWidth, stroke, placeHolderFill}: PieChartPlaceHolderProps ) => {
    return(

        <Svg width={radius * 10}
        height={radius * 10}
        viewBox={`-10 -10 ${radius * 2 + 20} ${radius * 2 + 20}`}
        >
          <circle cx={radius} cy={radius} r={radius} strokeWidth={strokeWidth ?? 0} stroke={stroke ?? "none"} fill={placeHolderFill ?? "#E5E7EB"} />
        </Svg>
        )
}

export default PieChartPlaceHolder
import { memo, useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import Svg from "react-native-svg";
import computePieChart from "../utils/PieChart/computePieChart";
import filterData from "../utils/PieChart/validateData";
import PieChartPlaceHolder from "./PieChartPlaceholder";
import Sector, { SectorLine } from "./Sector";
import SingleSector from "./SingleSector";

type PieChartProps = {
  /**Expects an array of objects */
  data: { group?: string; value: number, fill?:string; }[];
  /**Size of PieChart */
  radius: number;
  /**Show labels (optional) */
  showLabels: boolean;
  labelType?: "value" | "percentage";
  /**Stroke color */
  stroke?: string;
  /**Default strokewidth (optional)*/
  strokeWidth?: number;
  /**Font used for labels (optional) */
  labelFont?: string;
  /**Label font size (optional) */
  labelFontSize?: number;
  /**Distance between PieChart center and label (optional) */
  labelDistance?: number;
  /**Color of sector radius lines (optional) */
  sectorStroke?: string;
  sectorStrokeWidth: number
  /**Threshold in degrees to change sector radius strokewidth (optional)*/
  sectorStrokeWidthThreshold?: number;
  /**Used as first part of the screen reader label, falls back to English if not provided */
  title?: string;
  emptyTitle?: string
  legendPosition?: "top" | "bottom" | "left" | "right"
  legend?: (data : {group?: string, fill?: string, label: string}[] ) => React.ReactNode
};

const PieChart = ({
  data,
  radius,
  stroke,
  strokeWidth,
  showLabels,
  labelType,
  labelFont,
  labelFontSize,
  labelDistance,
  sectorStroke,
  sectorStrokeWidth,
  sectorStrokeWidthThreshold,
  title,
  emptyTitle,
  legendPosition,
  legend,
}: PieChartProps) => {

  const {width, height} = useWindowDimensions()
  const safeStrokeWidth = strokeWidth ? Math.min(width, height) * strokeWidth * 0.002 : 0
  const safeSectorStrokeWidth = sectorStrokeWidth ? Math.min(width, height) * sectorStrokeWidth * 0.002 : 0
  const safeLabelDistance = labelDistance ?? 0
  const safeLabelType = labelType ?? "value"
  const validatedData = useMemo(() => filterData(data), [data])
  const dynamicRadius = radius * Math.min(width, height) * 0.01
  const padding = safeStrokeWidth + safeLabelDistance * 2 +  dynamicRadius * 0.1
  const chartTitle = title ?? "pie chart"

  const flexDirection = ({
    top: "column-reverse",
    bottom: "column",
    left: "row-reverse",
    right: "row"
  } as const)[legendPosition ?? "bottom"]
  
  // Render all required sectors if the length of validatedData > 1
  // Render SingleSector if the amount of to be rendered sectors ends up as 1
  if (validatedData.length > 1) {
    let { sectorData, lineData } = computePieChart(validatedData, dynamicRadius, safeStrokeWidth, safeLabelType, labelFontSize, sectorStroke);
    const generatedLabel = sectorData.map((obj) => `${obj.group}: ${obj.label}`).join(", ")
    if (sectorData.length > 1) {

      return (
        <View style={{alignItems: "center", justifyContent: "center", flexDirection: flexDirection}} accessible={true} accessibilityLabel={`${chartTitle}. ${generatedLabel}`} accessibilityRole={"image"}>
          <View>
            <Svg
              width={dynamicRadius * 2}
              height={dynamicRadius * 2}
              viewBox={`${-padding} ${-padding}  ${dynamicRadius * 2 + padding * 2} ${dynamicRadius * 2 + padding * 2}`}
              aria-hidden={true}
              >
              {sectorData.map((obj) => (
                <Sector
                startX={dynamicRadius}
                startY={dynamicRadius}
                startAngle={obj.startAngle}
                endAngle={obj.endAngle}
                radius={dynamicRadius}
                stroke={stroke}
                  strokeWidth={obj.strokeWidth}
                  fill={obj.fill}
                  label={obj.label}
                  showLabels={showLabels}
                  labelFont={labelFont}
                  labelFontSize={labelFontSize}
                  labelDistance={labelDistance}
                  key={obj.key}
                  />   
                ))}

              {lineData.map((line) => (
              
                <SectorLine
                  startX={line.startX}
                  startY={line.startY}
                  centerX={dynamicRadius}
                  centerY={dynamicRadius}
                  endX={line.endX}
                  endY={line.endY}
                  radius={line.radius}
                  sectorAngle={line.sectorAngle}
                  sectorStroke={line.sectorStroke}
                  sectorStrokeWidth={safeSectorStrokeWidth}
                  sectorStrokeWidthThreshold={sectorStrokeWidthThreshold}
                  key={line.key}
                  />
              ))}
            </Svg>
          </View>
          {legend && legend(sectorData)}
          
        </View>
      );
    } else if (sectorData.length === 1){
      const { fill, group, label} = sectorData[0]
      const data = [{group: group, fill: fill, label: label }]
        return (
          <View style={{alignItems: "center", justifyContent: "center", flexDirection: flexDirection}}>
            <SingleSector data={data} radius={dynamicRadius} stroke={stroke ?? "black"} padding={padding} strokeWidth={safeStrokeWidth} labelFont={labelFont} labelFontSize={labelFontSize} showLabels={showLabels} title={`${chartTitle}, ${generatedLabel}`} />
            {legend && legend(data)}          
          </View>
    
  )
    }
} else if (validatedData.length === 1) {
  const { fill, group, value} = validatedData[0]
  const label = labelType === "percentage" ? "100%" : value.toString()
  const data = [{group: group, fill: fill, label: label }]

  return (
    <View style={{alignItems: "center", justifyContent: "center", flexDirection: flexDirection}}>
      <SingleSector data={data} radius={dynamicRadius} stroke={stroke ?? "black"} padding={padding} strokeWidth={safeStrokeWidth} labelFont={labelFont} labelFontSize={labelFontSize} showLabels={showLabels} title={`${chartTitle}. ${group}: ${label}` }/>
      {legend && legend(data)}
    </View>
  )
} else {
    return (
      <PieChartPlaceHolder radius={dynamicRadius} strokeWidth={safeStrokeWidth} stroke={stroke} title={emptyTitle} />
    )
  }
}

/**
 * PieChart component
 *
 * Renders a pie chart based on the provided data. Depending on the input:
 * - If validated data has more than one sector, renders a full PieChart with Sector and SectorLine components.
 * - If only one valid sector exists, renders a SingleSector component.
 * - If no valid data exists, renders a PieChartPlaceHolder component.
 *
 * Uses `useMemo` to filter and validate input data to prevent unnecessary re-renders.
 *
 * Props:
 * @param data Array of objects with { group?: string, value: number, fill?: string }.
 * @param radius Size of the PieChart (radius).
 * @param showLabels Whether to display sector labels.
 * @param stroke Optional stroke color for sectors.
 * @param strokeWidth Optional default stroke width.
 * @param labelFont Optional font family for labels.
 * @param labelFontSize Optional font size for labels.
 * @param labelDistance Optional distance from the center for labels.
 * @param sectorStroke Optional color for sector radius lines.
 * @param sectorStrokeWidth Width of sector radius lines.
 * @param sectorStrokeWidthThreshold Threshold in degrees for increasing sector stroke width.
 *
 * Returns:
 * JSX.Element – a View containing:
 * - Svg with multiple Sector and SectorLine elements if multiple sectors exist,
 * - SingleSector if only one sector,
 * - PieChartPlaceHolder if no valid data.
 */
export default memo(PieChart)
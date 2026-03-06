// Calculates all necessary values for the PieChart component

import { calcPointX, calcPointY } from "./computeSector";

type SectorDataProps = {
  radius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  label: string | undefined;
  strokeWidth: number;
  key: number;
  group?: string
};

type LineDataProps = {
  radius: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  sectorAngle: number;
  sectorStroke: string |undefined;
  key: number;
};

/**
 * Calculates all values needed for drawing a piechart (angles, coordinates, lines, label positions). 
 * @returns Object with:
 *  - sectorData: Array of sector parameters {radius, strokeWidth, startAngle, endAngle, label, fill, key}
 *  - lineData: Array of sector radius line parameters {radius, startX, startY, endX, endY, sectorAngle, sectorStroke, key}
 */

const computePieChart = (
  data: { group: string; value: number; fill?: string }[],
  radius: number, strokeWidth: number, labelFontSize?:number | undefined, sectorStroke?: string,
) => {
  let sectorData: SectorDataProps[] = [];
  let lineData: LineDataProps[] = [];

  let startAngle = 90;

  let totalChartValue = countTotalChartValue(data)

  //Sort all sectors greater than 2% of the total charts value into a variable.
  const sectors = data.filter((sector)=> sector.value / totalChartValue > 0.02 )

  //Combine all sectors smaller than 2% of the total charts value into a "other" sector.
  const otherSector = sortToOther(data)

  //Add the normal and "other" sectors into an array and sort them by ascending order.
  let allSectors: { group: string; value: number; fill?: string }[] = []
  allSectors = [...sectors, otherSector]
  allSectors = sortByValueAscending(allSectors)
  
  //Defines endangle, label (if it fits) and the total angle size of the sector 
  allSectors.forEach((obj, i) => {
    let endAngle = calculateEndAngle(startAngle, obj.value, totalChartValue);
    let label: string | undefined = obj.value.toString()
    const sectorAngle = endAngle - startAngle;
    if (labelFontSize && sectorAngle < estLabelWidth(labelFontSize, label)) {

      label = undefined;
    } 

    // Returns sectors and their radii lines that consist of 2% of the chart, excludes e.g. the "other" sector if it does not meet this criteria.
    // 7.2 / 360 = 2%
    if (sectorAngle >=  7.2) {

      const startX = radius + calcPointX(radius, startAngle);
      const startY = radius - calcPointY(radius, startAngle);
      
      const endX = calcPointX(radius, endAngle);
      const endY = calcPointY(-radius, endAngle);
      
      const fill = obj.fill ? obj.fill : "none";
      const key = i;

      const group = obj.group
      
      
      let sector = { radius, strokeWidth, startAngle, endAngle, label, fill, key, group };
      let line = {
        radius,
        startX,
        startY,
        endX,
        endY,
        sectorAngle,
        sectorStroke,
        key,
      };
      startAngle = endAngle;
      sectorData.push(sector);
      lineData.push(line);
    } else {
      totalChartValue = totalChartValue - obj.value
    }
  }
  );
  return { sectorData, lineData };
  

}

const calculateEndAngle = (
  startAngle: number,
  answeredQst: number,
  answeredTotal: number,
) => {
  let endAngle = (answeredQst / answeredTotal) * 360 + startAngle;
  return endAngle;
}

/**Estimates label width */
export const estLabelWidth = (labelFontSize:number, label:string) => {
  const labelLen = label.toString().length

  return labelFontSize * labelLen - labelFontSize / 2
}

const sortByValueAscending = (data: { group: string; value: number }[]) => {
  let dataAscending = data.sort((a, b) => a.value - b.value);
  dataAscending.forEach((d) => {});

  return dataAscending;
}

export const countTotalChartValue = (data: { group:string; value:number}[]) => {
    let totalChartValue = data.reduce(function (acc, curr) {
    return (acc += curr.value);
  }, 0);
  return totalChartValue
}

/**Combines all sectors that are smaller than 2% of the charts total value into a single "Other" sector */
const sortToOther = (data: {group: string, value: number, fill?:string}[]) => {
  let totalChartValue = countTotalChartValue(data)
 
  const smallSectors = data.filter((sector)=> sector.value / totalChartValue < 0.02 )
  const otherSectorGroup = "Other"
  const otherSectorVal = smallSectors.reduce( (acc, curr) => acc + curr.value, 0
  )

  const otherSectorFill = smallSectors[0]?.fill ?? "none"
  const otherSector = {group: otherSectorGroup, value: otherSectorVal, fill: otherSectorFill}

  return otherSector
}


export default computePieChart

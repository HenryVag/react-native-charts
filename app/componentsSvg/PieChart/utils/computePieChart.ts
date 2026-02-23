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
};

type LineDataProps = {
  radius: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  sectorAngle: number;
  sectorStroke: string | undefined;
  key: number;
};

const computePieChart = (
  data: { group: string; value: number; fill?: string }[],
  radius: number, strokeWidth: number, labelFontSize:number | undefined, sectorStroke: string | undefined,
) => {
  let sectorData: SectorDataProps[] = [];
  let lineData: LineDataProps[] = [];

  let startAngle = 90;

  let totalChartValue = countTotalChartValue(data)

  const sectors = data.filter((sector)=> sector.value / totalChartValue > 0.02 )
  const otherSector = sortToOther(data)
  let allSectors: { group: string; value: number; fill?: string }[] = []
  sectors.forEach((sector) => {
    allSectors.push(sector)
  })
  allSectors.push(otherSector)

  allSectors = sortByValueAscending(allSectors)
  
  allSectors.forEach((obj, i) => {
    let endAngle = calculateEndAngle(startAngle, obj.value, totalChartValue);
    let label: string | undefined = obj.value.toString()
    const sectorAngle = endAngle - startAngle;
    if (labelFontSize && sectorAngle < estLabelWidth(labelFontSize, label)) {

      label = undefined;
    } 

    // Returns sectors that consist of 2% of the chart
    if (sectorAngle >=  7.2) {

      const startX = radius + calcPointX(radius, startAngle);
      const startY = radius - calcPointY(radius, startAngle);
      
      const endX = calcPointX(radius, endAngle);
      const endY = calcPointY(-radius, endAngle);
      
      const fill = obj.fill ? obj.fill : "none";
      const key = i;
      
      
      let sector = { radius, strokeWidth, startAngle, endAngle, label, fill, key };
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

const estLabelWidth = (labelFontSize:number, label:string) => {
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
  const otherSectorFill = smallSectors[0].fill
  const otherSector = {group: otherSectorGroup, value: otherSectorVal, fill: otherSectorFill}

  return otherSector
}


export default computePieChart

// Calculates all necessary values for the PieChart component

import { calcPointX, calcPointY } from "./computeSector";

type SectorDataProps = {
  radius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  label: number;
  key: number;
};

type LineDataProps = {
  radius: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  sectorAngle: number;
  key: number;
};

export default function computePieChart(
  data: { group: string; value: number; fill?: string }[],
  radius: number,
) {
  let sectorData: SectorDataProps[] = [];
  let lineData: LineDataProps[] = [];

  let startAngle = 90;

  const answeredTotal = data.reduce(function (acc, curr) {
    return (acc += curr.value);
  }, 0);

  data = sortByValueAscending(data);

  data.map((obj, i) => {
    const endAngle = calculateEndAngle(startAngle, obj.value, answeredTotal);
    const sectorAngle = endAngle - startAngle;

    const startX = radius + calcPointX(radius, startAngle);
    const startY = radius - calcPointY(radius, startAngle);

    const endX = calcPointX(radius, endAngle);
    const endY = calcPointY(-radius, endAngle);

    const fill = obj.fill ? obj.fill : "none";
    const label = obj.value;
    const key = i;

    let sector = { radius, startAngle, endAngle, label, fill, key };
    let line = {
      radius,
      startX,
      startY,
      endX,
      endY,
      sectorAngle,
      key,
    };
    startAngle = endAngle;
    sectorData.push(sector);
    lineData.push(line);
  });

  return { sectorData, lineData };
}

function calculateEndAngle(
  startAngle: number,
  answeredQst: number,
  answeredTotal: number,
) {
  let endAngle = (answeredQst / answeredTotal) * 360 + startAngle;
  return endAngle;
}

function sortByValueAscending(data: { group: string; value: number }[]) {
  let dataDescending = data.sort((a, b) => a.value - b.value);
  dataDescending.forEach((d) => {});

  return dataDescending;
}

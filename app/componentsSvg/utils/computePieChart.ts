// Calculates all necessary values for the PieChart component

import { calcLineX, calcLineY } from "./computeSector";

type SectorDataProps = {
  radius: number;
  startAngle: number;
  endAngle: number;
  label: number;
  key: number;
};

type LineDataProps = {
  radius: number;
  lineX: number;
  lineY: number;
  key: number;
};

export default function computePieChart(
  data: { x: number; y: number }[],
  radius: number,
) {
  let sectorData: SectorDataProps[] = [];
  let lineData: LineDataProps[] = [];

  let startAngle = 90;

  const answeredTotal = data.reduce(function (acc, curr) {
    return (acc += curr.y);
  }, 0);

  data.forEach((obj) => {
    const endAngle = calculateEndAngle(startAngle, obj.y, answeredTotal);
    let lineX = calcLineX(radius, endAngle);
    let lineY = calcLineY(radius, endAngle);
    let label = obj.y;
    let key = obj.x;

    let sector = { radius, startAngle, endAngle, label, key };
    let line = { radius, lineX, lineY, key };

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

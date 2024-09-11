//LineWithMidpoint.tsx
//空港を繋ぐ直線とラベルの処理
import React from 'react';

interface Airport {
  iata_code: string;
  airport_name: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

interface LineWithMidpointProps {
  airport1: Airport;
  airport2: Airport;
  projection: (coords: [number, number]) => [number, number];
  label: string;
  xOffset?: number;
  yOffset?: number;
  labelColor?: string;  // ラベルの色を指定するためのプロパティ
  labelSize?: string;   // ラベルのサイズを指定するためのプロパティ
  color?: string;       // 線の色を指定するためのプロパティ
  strokeDasharray?: string; // 線のスタイル（実線や点線）を指定するためのプロパティ
}

const getAdjustedCoords = (
  coords: [number, number],
  projection: (coords: [number, number]) => [number, number],
  xOffset: number = 0,
  yOffset: number = 0
) => {
  const [x, y] = projection(coords);
  return [x + xOffset, y + yOffset];
};

const LineWithMidpoint: React.FC<LineWithMidpointProps> = ({
  airport1,
  airport2,
  projection,
  label,
  xOffset = -80,
  yOffset = 50,
  labelColor = "#000000",  // デフォルトの色は黒
  labelSize = "1.5em",    // デフォルトのサイズは1.5em
  color = "#FF0000",       // デフォルトの線の色は赤
  strokeDasharray = "4 2"  // デフォルトは点線
}) => {
  const [x1, y1] = getAdjustedCoords([airport1.longitude, airport1.latitude], projection, xOffset, yOffset);
  const [x2, y2] = getAdjustedCoords([airport2.longitude, airport2.latitude], projection, xOffset, yOffset);
  const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={strokeDasharray} // 線のスタイルを指定
      />
      <text
        x={mx}
        y={my}
        textAnchor="middle"
        dy="0.2em"  // Y方向に少し上に調整する
        style={{ fontFamily: "system-ui", fill: labelColor, fontSize: labelSize, fontWeight: "bold" }}
      >
        {label}
      </text>
    </>
  );
};

export default LineWithMidpoint;

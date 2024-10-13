import React, { useEffect, useState } from 'react';

interface TotalLabelSumProps {
  totalLabelSum: number;
  clickedAirportCoords: [number, number] | null;
  projection: (coords: [number, number]) => [number, number] | null; // 緯度経度をピクセル座標に変換するプロジェクション関数
  textX: number;  // テキストのx座標
  textY: number;  // テキストのy座標
  rectX: number;  // 矩形のx座標
  rectY: number;  // 矩形のy座標
  rectWidth: number;  // 矩形の幅
  rectHeight: number;  // 矩形の高さ
}

const HND_COORDS: [number, number] = [139.6917, 35.6895]; // Tokyo Haneda Airport (HND)

const TotalLabelSum: React.FC<TotalLabelSumProps> = ({ 
  totalLabelSum, 
  clickedAirportCoords, 
  projection, 
  textX, 
  textY, 
  rectX, 
  rectY, 
  rectWidth, 
  rectHeight 
}) => {
  const [currentCoords, setCurrentCoords] = useState<[number, number] | null>(null); // 現在の座標

  // 初期位置としてHNDのピクセル座標を設定
  useEffect(() => {
    const hndPixelCoords = projection(HND_COORDS);
    if (hndPixelCoords) {
      setCurrentCoords(hndPixelCoords); // HNDのピクセル座標を初期位置に設定
    }
  }, [projection]);

  if (!currentCoords) {
    return null; // 現在の座標が設定されていない場合は何も表示しない
  }

  return (
    <>
      {/* ラベルの合計を表示 */}
      <svg>
        {/* 背景用の矩形を描画 */}
        <rect
          x={rectX} // Propsから受け取った矩形のx座標
          y={rectY} // Propsから受け取った矩形のy座標
          width={rectWidth} // Propsから受け取った矩形の幅
          height={rectHeight} // Propsから受け取った矩形の高さ
          fill="yellow" // 背景色を指定
        />
        <text
          x={textX} // Propsから受け取ったテキストのx座標
          y={textY} // Propsから受け取ったテキストのy座標
          style={{ fontFamily: 'system-ui', fill: '#000000', fontSize: '1.5em' }}
        >
          総時間：
          <tspan
            style={{ fontWeight: 'bold', fontSize: '1.7em' }} // 太字で少し大きくする
          >
            {totalLabelSum}
          </tspan>
          時間
        </text>
      </svg>
    </>
  );
};

export default TotalLabelSum;

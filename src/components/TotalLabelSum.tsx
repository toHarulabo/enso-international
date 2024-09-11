import React, { useEffect, useState } from 'react';

interface TotalLabelSumProps {
  totalLabelSum: number;
  clickedAirportCoords: [number, number] | null;
  imageSrc: string;  // 画像を表示するためのパス
  projection: (coords: [number, number]) => [number, number] | null; // 緯度経度をピクセル座標に変換するプロジェクション関数
}

const HND_COORDS: [number, number] = [139.6917, 35.6895]; // Tokyo Haneda Airport (HND)

const TotalLabelSum: React.FC<TotalLabelSumProps> = ({ totalLabelSum, clickedAirportCoords, imageSrc, projection }) => {
  const [currentCoords, setCurrentCoords] = useState<[number, number] | null>(null); // 現在の座標
  const [isMoving, setIsMoving] = useState(false); // アニメーションフラグ

  // 初期位置としてHNDのピクセル座標を設定
  useEffect(() => {
    const hndPixelCoords = projection(HND_COORDS);
    if (hndPixelCoords) {
      setCurrentCoords(hndPixelCoords); // HNDのピクセル座標を初期位置に設定
    }
  }, [projection]);

  // クリックされた空港の座標にアニメーションで移動
  useEffect(() => {
    if (clickedAirportCoords) {
      setIsMoving(true);
      setTimeout(() => {
        // 2秒かけて目的地に到達
        setCurrentCoords(clickedAirportCoords);
        setIsMoving(false);
      });
    }
  }, [clickedAirportCoords]);

  if (!currentCoords) {
    return null; // 現在の座標が設定されていない場合は何も表示しない
  }

  return (
    <>
      {/* ラベルの合計を表示 */}
      <svg>
  {/* 背景用の矩形を描画 */}
  <rect
    x={0}
    y={65} 
    width={210} // テキストの幅に合わせて調整
    height={50} // テキストの高さに合わせて調整
    fill="white" // 背景色を指定
  />
      <text
        x={10}
        y={100}
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

      {/* 画像を直接座標を更新しながら移動 */}
      <image
        href={imageSrc}  // 画像のパス
        x={currentCoords[0] - 75}  // 現在のX座標
        y={currentCoords[1] + 20}  // 現在のY座標
        width="60"
        height="60"
        style={{
          transition: 'all 2s ease-in-out', // 2秒間かけて移動
        }}
      />
    </>
  );
};

export default TotalLabelSum;

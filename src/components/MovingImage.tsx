// MovingImage.tsx
import React, { useEffect, useState } from 'react';

interface MovingImageProps {
  imageSrc: string;
  clickedAirportCoords: [number, number] | null;
  projection: (coords: [number, number]) => [number, number] | null;
}

const HND_COORDS: [number, number] = [139.6917, 35.6895]; // Tokyo Haneda Airport (HND)

const MovingImage: React.FC<MovingImageProps> = ({ 
  imageSrc, 
  clickedAirportCoords, 
  projection 
}) => {
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
  );
};

export default MovingImage;

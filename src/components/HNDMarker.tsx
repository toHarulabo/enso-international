// HNDMarker.tsx
//HNDはAPIで取得できなかったため別途設定する
import React from 'react';
import { Marker } from 'react-simple-maps';

interface HNDMarkerProps {
  longitude: number;
  latitude: number;
  selectedAirports: string[];
  handleMarkerClick: () => void;
}

const HNDMarker: React.FC<HNDMarkerProps> = ({ longitude, latitude, selectedAirports, handleMarkerClick }) => {
  return (
    <Marker coordinates={[longitude, latitude]}>
      <circle
        r={8}
        fill={selectedAirports.includes('HND') ? "#0000FF" : "#FF0000"} // 選択されたら青、されてなければ赤
        onClick={handleMarkerClick} // クリックイベントを追加
        style={{ cursor: "pointer" }} // クリック可能かどうか
      />
      <text
        textAnchor="middle"
        style={{ fontFamily: "system-ui", fill: "#000000", fontSize: "0.8em", fontWeight: "bold" }}
        y={-10}
      >
        羽田空港
      </text>
    </Marker>
  );
};

export default HNDMarker;

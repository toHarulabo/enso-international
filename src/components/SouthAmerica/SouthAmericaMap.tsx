import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import LineComponent from '../LineComponent'; 
import LabelComponent from '../LabelComponent'; 
import HNDMarker from '../HNDMarker';
import Modal from '../Modal';
import { getImageForRoute } from '../SouthAmerica/getImageForRoute'; 
import enso from '../../img/enso/enso ver3.png';  
import airportNames from './airportNames';
import MovingImage from '../MovingImage';

interface Airport {
  iata_code: string;
  airport_name: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

interface SouthAmericaMapProps {
  setTotalLabelSum: (sum: number) => void; // 親から受け取る関数
}

// 空港データをハードコードで指定
const airports: Airport[] = [
  {
    iata_code: 'ABX',
    airport_name: 'Albury Airport',
    country_name: 'Australia',
    latitude: -36.0678,
    longitude: 146.9570
  },
  {
    iata_code: 'AAA',
    airport_name: 'Anaa Airport',
    country_name: 'French Polynesia',
    latitude: -17.3526,
    longitude: -145.5090
  },
  {
    iata_code: 'ACN',
    airport_name: 'Ciudad Acuña International Airport',
    country_name: 'Mexico',
    latitude: 29.3329,
    longitude: -101.0989
  },
  {
    iata_code: 'AEP',
    airport_name: 'Jorge Newbery Airpark',
    country_name: 'Argentina',
    latitude: -34.5592,
    longitude: -58.4156
  }
];

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const safeProjection = (projection: (coords: [number, number]) => [number, number] | null) => {
  return (coords: [number, number]): [number, number] => {
    const projected = projection(coords);
    if (projected) {
      return projected;
    }
    return [0, 0]; // デフォルト値
  };
};

const SouthAmericaMap: React.FC<SouthAmericaMapProps> = ({ setTotalLabelSum }) => {
  const [selectedAirports, setSelectedAirports] = useState<string[]>(['HND']); // HNDを初期選択
  const [availableAirports, setAvailableAirports] = useState<string[]>(['ABX', 'AAA', 'ACN']); // クリック可能な空港
  const [selectedConnections, setSelectedConnections] = useState<{from: string, to: string, label: string}[]>([]); // 選択された接続を保存
  const [Goal, setGoal] = useState<boolean>(false); // ゲーム終了フラグ
  const [totalLocalLabelSum, setTotalLocalLabelSum] = useState<number>(0); // ローカルの総ラベルの合計
  const [clickedAirportCoords, setClickedAirportCoords] = useState<[number, number] | null>(null); // 最後にクリックされた空港の座標
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(enso); // 現在表示している画像の状態
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projection = safeProjection(
    geoMercator()
      .scale(300)
      .center([60, 0])
      .rotate([210, 0, 0])
  );

  const getAdjustedCoords = (
    coords: [number, number],
    projection: (coords: [number, number]) => [number, number],
    xOffset: number = -80,
    yOffset: number = 50
  ) => {
    const [x, y] = projection(coords);
    return [x + xOffset, y + yOffset];
  };

  // 空港間の接続を定義（赤線で繋がる空港ペアとラベル）
  const connections = [
    ['HND', 'ABX', '8'], ['HND', 'AAA', '15'], ['HND', 'ACN', '18'], ['ABX', 'AAA', '12'],
    ['AAA', 'ACN', '13'], ['ABX', 'AEP', '21'],
    ['AAA', 'AEP', '15'], ['ACN', 'AEP', '9'],
  ];

  const hndAirport: Airport = {
    iata_code: 'HND',
    airport_name: 'Tokyo Haneda Airport',
    country_name: 'Japan',
    latitude: 35.5494,
    longitude: 139.7798
  };

  // 空港をクリックした際の処理
  const handleMarkerClick = (iataCode: string, longitude: number, latitude: number) => {
    if (availableAirports.includes(iataCode) && !Goal) {
      setSelectedAirports((prev) => [...prev, iataCode]);

      const lastSelectedAirport = selectedAirports[selectedAirports.length - 1];

      const connection = connections.find(([a1, a2]) => (a1 === lastSelectedAirport && a2 === iataCode) || (a1 === iataCode && a2 === lastSelectedAirport));

      if (connection) {
        setSelectedConnections((prev) => [...prev, {from: lastSelectedAirport, to: iataCode, label: connection[2]}]);

        setTotalLocalLabelSum(prev => {  
          const newSum = prev + Number(connection[2]);
          setTotalLabelSum(newSum); // 親コンポーネントに更新を通知
          return newSum;
        });

        const pixelCoords = projection([longitude, latitude]);
        if (pixelCoords) {
          setClickedAirportCoords(pixelCoords);
        }

        setCurrentImageSrc(getImageForRoute(lastSelectedAirport, iataCode));
      }

      const nextAirports = connections
        .filter(([a1, a2]) => a1 === iataCode || a2 === iataCode)
        .map(([a1, a2]) => (a1 === iataCode ? a2 : a1))
        .filter((airport) => !selectedAirports.includes(airport));

      setAvailableAirports(nextAirports);

      if (iataCode === 'AEP') {
        setGoal(true);
        setIsModalOpen(true); 
      }
    }
  };

  const handleReset = () => {
    setSelectedAirports(['HND']);
    setSelectedConnections([]);
    setAvailableAirports(['ABX', 'AAA', 'ACN']);
    setTotalLabelSum(0);
    setGoal(false);
    setIsModalOpen(false);
    setCurrentImageSrc(enso);
    setTotalLocalLabelSum(0);
  };

  const renderLines = () => {
    return connections.map(([a1, a2], index) => {
      const airport1 = a1 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a1);
      const airport2 = a2 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a2);
      if (airport1 && airport2) {
        const isSelectedConnection = selectedConnections.some(
          connection => (connection.from === a1 && connection.to === a2) || (connection.from === a2 && connection.to === a1)
        );
        const [x1, y1] = getAdjustedCoords([airport1.longitude, airport1.latitude], projection);
        const [x2, y2] = getAdjustedCoords([airport2.longitude, airport2.latitude], projection);
        
        return (
          <LineComponent
            key={`line-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            color={isSelectedConnection ? "#0000FF" : "#FF0000"}
            strokeDasharray={isSelectedConnection ? "0" : "4 2"}
          />
        );
      }
      return null;
    });
  };
  
  const renderLabels = () => {
    return connections.map(([a1, a2, label], index) => {
      const airport1 = a1 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a1);
      const airport2 = a2 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a2);
      if (airport1 && airport2) {
        const [x1, y1] = getAdjustedCoords([airport1.longitude, airport1.latitude], projection);
        const [x2, y2] = getAdjustedCoords([airport2.longitude, airport2.latitude], projection);
        const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
  
        return (
          <LabelComponent
            key={`label-${index}`}
            x={mx}
            y={my}
            label={label}
            labelColor="#0000FF"
            labelSize="1.5em"
          />
        );
      }
      return null;
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 300,
          center: [60, 0],
          rotate: [210, 0, 0]
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#3CB371",
                    stroke: "#FFFFFF",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "#3CB371",
                    stroke: "#FFFFFF",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#3CB371",
                    stroke: "#FFFFFF",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {renderLines()}

        <HNDMarker
          longitude={hndAirport.longitude}
          latitude={hndAirport.latitude}
          selectedAirports={selectedAirports}
          handleMarkerClick={() => handleMarkerClick(hndAirport.iata_code, hndAirport.longitude, hndAirport.latitude)}
        />

        {airports.map((airport) => (
          <Marker
            key={airport.iata_code}
            coordinates={[airport.longitude, airport.latitude]}
          >
            <circle
              r={8}
              fill={
                airport.iata_code === 'AEP' 
                ? selectedAirports.includes(airport.iata_code) 
                  ? "#0000FF"
                  : "#FFA500"
                : selectedAirports.includes(airport.iata_code) 
                ? "#0000FF"
                : "#FF0000"
              }
              onClick={() => handleMarkerClick(airport.iata_code, airport.longitude, airport.latitude)}
              style={{ cursor: availableAirports.includes(airport.iata_code) ? "pointer" : "not-allowed" }}
            />
            <text
              textAnchor="middle"
              style={{ fontFamily: "system-ui", fill: "#000000", fontSize: "0.8em", fontWeight: "bold" }}
              y={-10}
            >
              {airportNames[airport.iata_code] || airport.iata_code}
            </text>
          </Marker>
        ))}

        {renderLabels()}

        <MovingImage 
          imageSrc={currentImageSrc} 
          clickedAirportCoords={clickedAirportCoords} 
          projection={projection} 
        />
      </ComposableMap>

      <Modal isOpen={isModalOpen} onClose={handleReset} totalLabelSum={totalLocalLabelSum} isWinner={totalLocalLabelSum === 27} />
    </div>
  );
};

export default SouthAmericaMap;

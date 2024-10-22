import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import LineComponent from '../LineComponent'; 
import LabelComponent from '../LabelComponent'; 
import HNDMarker from '../HNDMarker';
import Modal from '../Modal';
import { getImageForRoute } from './getImageForRoute'; 
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

interface EurasiaMapProps {
  setTotalLabelSum: (sum: number) => void; // 親から受け取る関数
}

// 空港データをハードコードで指定
const airports: Airport[] = [
  {
    iata_code: 'ADH',
    airport_name: 'Aldan Airport',
    country_name: 'Russia',
    latitude: 58.6027,
    longitude: 125.4089
  },
  {
    iata_code: 'ACS',
    airport_name: 'Achinsk Airport',
    country_name: 'Russia',
    latitude: 56.2682,
    longitude: 90.5708
  },
  {
    iata_code: 'ABA',
    airport_name: 'Abakan Airport',
    country_name: 'Russia',
    latitude: 53.7400,
    longitude: 91.3850
  },
  {
    iata_code: 'AAT',
    airport_name: 'Altay Air Base',
    country_name: 'China',
    latitude: 47.7498,
    longitude: 88.0858
  },
  {
    iata_code: 'AFS',
    airport_name: 'Zarafshan-Sugraly Airport',
    country_name: 'Uzbekistan',
    latitude: 41.6138,
    longitude: 64.2332
  },
  {
    iata_code: 'ACZ',
    airport_name: 'Zabol Airport',
    country_name: 'Iran',
    latitude: 31.0983,
    longitude: 61.5438
  },
  {
    iata_code: 'AAC',
    airport_name: 'El Arish International Airport',
    country_name: 'Egypt',
    latitude: 31.0732,
    longitude: 33.8358
  },
  {
    iata_code: 'ADB',
    airport_name: 'Adnan Menderes International Airport',
    country_name: 'Turkey',
    latitude: 38.2924,
    longitude: 27.1569
  },
  {
    iata_code: 'ACH',
    airport_name: 'St Gallen Altenrhein Airport',
    country_name: 'Switzerland',
    latitude: 47.4850,
    longitude: 9.5607
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

const EurasiaMap: React.FC<EurasiaMapProps> = ({ setTotalLabelSum }) => {
  const [selectedAirports, setSelectedAirports] = useState<string[]>(['HND']); // HNDを初期選択
  const [availableAirports, setAvailableAirports] = useState<string[]>(['ADH', 'ABA', 'AAT', 'ACZ']); // クリック可能な空港
  const [selectedConnections, setSelectedConnections] = useState<{from: string, to: string, label: string}[]>([]); // 選択された接続を保存
  const [Goal, setGoal] = useState<boolean>(false); // ゲーム終了フラグ
  const [totalLocalLabelSum, setTotalLocalLabelSum] = useState<number>(0); // ローカルの総ラベルの合計
  const [clickedAirportCoords, setClickedAirportCoords] = useState<[number, number] | null>(null); // 最後にクリックされた空港の座標
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(enso); // 現在表示している画像の状態
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projection = safeProjection(
    geoMercator()
      .scale(450)
      .center([75, 40])
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
    ['HND', 'ADH', '6'], ['HND', 'ABA', '8'], ['HND', 'AAT', '8'], ['HND', 'ACZ', '12'],
    ['ADH', 'ACS', '12'], ['ADH', 'ABA', '15'],
    ['ABA', 'AAT', '6'], ['ABA', 'AFS', '15'], ['ABA', 'ACH', '28'],
    ['ACS', 'ACH', '24'], ['AAT', 'AFS', '14'], ['AAT', 'ACZ', '5'],
    ['AFS', 'ACZ', '7'], ['AFS', 'ACH', '8'], ['ACZ', 'ADB', '16'], ['ACZ', 'AAC', '12'],
    ['AAC', 'ADB', '5'], ['ADB', 'ACH', '5']
  ];

  const hndAirport: Airport = {
    iata_code: 'HND',
    airport_name: 'Tokyo Haneda Airport',
    country_name: 'Japan',
    latitude: 35.6895,
    longitude: 139.6917
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

      if (iataCode === 'ACH') {
        setGoal(true);
        setIsModalOpen(true); 
      }
    }
  };

  const handleReset = () => {
    setSelectedAirports(['HND']);
    setSelectedConnections([]);
    setAvailableAirports(['ADH', 'ABA', 'AAT', 'ACZ']);
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
          scale: 450,
          center: [75, 40]
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
                airport.iata_code === 'ACH' 
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

export default EurasiaMap;

import React, { useEffect, useState } from 'react';
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

interface AfricaMapProps {
  setTotalLabelSum: (sum: number) => void; // 親から受け取る関数
}

// API廃止して使用する空港データを手動で設定
const airports: Airport[] = [
  {
    iata_code: 'ACZ',
    airport_name: 'Zabol Airport',
    country_name: 'Iran',
    latitude: 31.0983,
    longitude: 61.5439
  },
  {
    iata_code: 'AAE',
    airport_name: 'Rabah Bitat Airport',
    country_name: 'Algeria',
    latitude: 36.8222,
    longitude: 7.8092
  },
  {
    iata_code: 'ABM',
    airport_name: 'Northern Peninsula Airport',
    country_name: 'Australia',
    latitude: -10.9508,
    longitude: 142.4593
  },
  {
    iata_code: 'ABU',
    airport_name: 'Haliwen Airport',
    country_name: 'Indonesia',
    latitude: -9.2546,
    longitude: 124.8962
  },
  {
    iata_code: 'AEG',
    airport_name: 'Aek Godang Airport',
    country_name: 'Indonesia',
    latitude: 1.4001,
    longitude: 99.4305
  },
  {
    iata_code: 'ACJ',
    airport_name: 'Anuradhapura Air Force Base',
    country_name: 'Sri Lanka',
    latitude: 8.3014,
    longitude: 80.4279
  },
  {
    iata_code: 'ABK',
    airport_name: 'Kabri Dar Airport',
    country_name: 'Ethiopia',
    latitude: 6.734,
    longitude: 44.253
  },
  {
    iata_code: 'AFD',
    airport_name: 'Port Alfred Airport',
    country_name: 'South Africa',
    latitude: -33.5558,
    longitude: 26.8806
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

const AfricaMap: React.FC<AfricaMapProps> = ({ setTotalLabelSum }) => {
  const [selectedAirports, setSelectedAirports] = useState<string[]>(['HND']); // HNDを初期選択
  const [availableAirports, setAvailableAirports] = useState<string[]>(['ABM', 'ABU', 'AEG', 'ACJ', 'ACZ']); // クリック可能な空港
  const [selectedConnections, setSelectedConnections] = useState<{from: string, to: string, label: string}[]>([]); // 選択された接続を保存
  const [Goal, setGoal] = useState<boolean>(false); // ゲーム終了フラグ
  const [totalLocalLabelSum, setTotalLocalLabelSum] = useState<number>(0); // ローカルの総ラベルの合計
  const [clickedAirportCoords, setClickedAirportCoords] = useState<[number, number] | null>(null); // 最後にクリックされた空港の座標
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(enso); // 現在表示している画像の状態
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projection = safeProjection(
    geoMercator()
      .scale(350)
      .center([-55, -4])
      .rotate([240, 0, 0])
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
    ['HND', 'ABM', '6'], ['HND', 'ABU', '6'], ['HND', 'AEG', '6'], ['HND', 'ACJ', '7'],
    ['HND', 'ACZ', '12'], ['ACZ', 'AAE', '7'], ['ACZ', 'ABK', '5'], ['ABM', 'ABU', '12'],  
    ['ABU', 'AEG', '6'], ['AEG', 'ACJ', '12'], ['ACJ', 'ABK', '8'], ['ABK', 'AAE', '25'],  
    ['ABM', 'AFD', '40'], ['ABU', 'AFD', '35'], ['AEG', 'AFD', '30'], ['ACJ', 'AFD', '30'],
    ['ABK', 'AFD', '25'], ['AAE', 'AFD', '35'] 
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

      if (iataCode === 'AFD') {
        setGoal(true);
        setIsModalOpen(true); 
      }
    }
  };

  const handleReset = () => {
    setSelectedAirports(['HND']); 
    setSelectedConnections([]);  
    setAvailableAirports(['ABM', 'ABU', 'AEG', 'ACJ', 'ACZ']); 
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
          scale: 350,
          center: [-55, -4],
          rotate: [240, 0, 0]
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
                airport.iata_code === 'AFD' 
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

      <Modal isOpen={isModalOpen} onClose={handleReset} totalLabelSum={totalLocalLabelSum} isWinner={totalLocalLabelSum === 36}/>
    </div>
  );
};

export default AfricaMap;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import LineWithMidpoint from '../LineWithMidpoint';
import TotalLabelSum from '../TotalLabelSum';  
import HNDMarker from '../HNDMarker';
import Modal from '../Modal';
import { getImageForRoute } from '../NorthAmerica/getImageForRoute'; 
//import { findShortestRoute } from './findShortestRoute';
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

const NorthAmericaMap: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<string[]>(['HND']); // HNDを初期選択
  const [availableAirports, setAvailableAirports] = useState<string[]>([]); // クリック可能な空港
  const [selectedConnections, setSelectedConnections] = useState<{from: string, to: string, label: string}[]>([]); // 選択された接続を保存
  const [Goal, setGoal] = useState<boolean>(false); // ゲーム終了フラグ
  const [totalLabelSum, setTotalLabelSum] = useState<number>(0); // 総ラベルの合計
  const [clickedAirportCoords, setClickedAirportCoords] = useState<[number, number] | null>(null); // 最後にクリックされた空港の座標
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(enso); // 現在表示している画像の状態
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      // https://aviationstack.com/ を使用して空港APIを取得
      try {
        const response = await axios.get('https://api.aviationstack.com/v1/airports', {
          params: {
            access_key: 'd4c2df5baa3fff5746d798f6577a67bf', //API KEY　ここを変える
          }
        });

        console.log(response.data.data); // デバッグのため、取得したデータをコンソールに表示
        setAirports(response.data.data); // データを状態に保存

        // 初期状態でHNDと接続されている空港をavailableAirportsに追加
        setAvailableAirports(['ADK', 'ACV', 'AEA']);
      } catch (error) {
        console.error('Error fetching airport data:', error);
      }
    };

    fetchAirports();
  }, []);

  const projection = safeProjection(
    geoMercator()
      .scale(400)
      .center([90, 31])
      .rotate([240, 0, 0])
  );

  // 空港間の接続を定義（赤線で繋がる空港ペアとラベル）
  const connections = [
    ['HND', 'ADK', '14'], ['HND', 'ACV', '21'], ['HND', 'AEA', '16'], ['ADK', 'ADQ', '8'],
    ['AEA', 'ABQ', '8'], ['AEA', 'ACA', '22'],
    ['ADQ', 'ACV', '12'], ['ADQ', 'AFO', '5'], ['ADQ', 'AEL', '6'],
    ['ADQ', 'AFN', '8'], ['ACV', 'AFO', '7'], ['ACV', 'ABQ', '8'],
    ['ABQ', 'AFO', '7'], ['ABQ', 'AEL', '9'], ['ABQ', 'ADR', '3'], ['ABQ', 'ACA', '12'],
    ['ACA', 'ADR', '4'], ['AFO', 'AEL', '9'], ['AEL', 'AFN', '8'], ['AEL', 'ADR', '8'], ['ADR', 'AFN', '2']
  ];

  const hndAirport: Airport = {
    iata_code: 'HND',
    airport_name: 'Tokyo Haneda Airport',
    country_name: 'Japan',
    latitude: 35.6895,
    longitude: 139.6917
  };

  // フィルタリングされた空港のリストを取得
  const filteredAirports = airports.filter(airport =>
    ['ADK', 'AEA', 'ADQ', 'ACV', 'ABQ', 'AFO', 'ACA', 'AEL', 'ADR', 'AFN'].includes(airport.iata_code)
  );

  // 空港をクリックした際の処理
  const handleMarkerClick = (iataCode: string, longitude: number, latitude: number) => {
    if (availableAirports.includes(iataCode) && !Goal) {
      // 空港を選択済みに追加
      setSelectedAirports((prev) => [...prev, iataCode]);

      // 最後に選択された空港
      const lastSelectedAirport = selectedAirports[selectedAirports.length - 1];

      // 接続情報を取得
      const connection = connections.find(([a1, a2]) => (a1 === lastSelectedAirport && a2 === iataCode) || (a1 === iataCode && a2 === lastSelectedAirport));

      if (connection) {
        // 接続を保存（from, to, label）
        setSelectedConnections((prev) => [...prev, {from: lastSelectedAirport, to: iataCode, label: connection[2]}]);

        // ラベルの合計を計算
        setTotalLabelSum(prev => prev + Number(connection[2]));

        // クリックした空港の座標を保存し、ピクセル座標に変換
        const pixelCoords = projection([longitude, latitude]);
        if (pixelCoords) {
          setClickedAirportCoords(pixelCoords);
        }

         // 経路に基づいて画像を切り替える(getImageForRoute.tsで指定)
         setCurrentImageSrc(getImageForRoute(lastSelectedAirport, iataCode));
        }

      // 新たにクリック可能な空港を計算
      const nextAirports = connections
        .filter(([a1, a2]) => a1 === iataCode || a2 === iataCode) // クリックされた空港と繋がる空港を探す
        .map(([a1, a2]) => (a1 === iataCode ? a2 : a1)) // 繋がる空港をリストアップ
        .filter((airport) => !selectedAirports.includes(airport)); // 未選択の空港のみ追加

      setAvailableAirports(nextAirports); // 次のクリック可能な空港に設定

      // ゴールの AFN に到達した場合、ゲーム終了
      if (iataCode === 'AFN') {
        setGoal(true);
        setIsModalOpen(true); 
      }
    }
  };

   // リセット処理を定義
   const handleReset = () => {
    setSelectedAirports(['HND']); // 初期状態に戻す（HNDのみ選択）
    setSelectedConnections([]);   // 選択された接続をリセット
    setAvailableAirports(['ADK', 'ACV', 'AEA']); // 初期状態に戻す
    setTotalLabelSum(0);  // 総ラベルをリセット
    setGoal(false);  // ゲーム終了フラグをリセット
    setIsModalOpen(false);  // モーダルを閉じる
    setCurrentImageSrc(enso); // 画像を初期状態に戻す
  };

  // 空港ペアの描画
  const renderLines = () => {
    return connections.map(([a1, a2, label], index) => {
      const airport1 = a1 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a1);
      const airport2 = a2 === 'HND' ? hndAirport : airports.find(airport => airport.iata_code === a2);
      if (airport1 && airport2) {
        // この接続が選択されているかどうかを判定
        const isSelectedConnection = selectedConnections.some(
          connection => (connection.from === a1 && connection.to === a2) || (connection.from === a2 && connection.to === a1)
        );
        return (
          <LineWithMidpoint
            key={index}
            airport1={airport1}
            airport2={airport2}
            projection={projection}
            label={label} // 接続に応じたラベルを渡す
            color={isSelectedConnection ? "#0000FF" : "#FF0000"} // 選択されたら青色、それ以外は赤色
            strokeDasharray={isSelectedConnection ? "0" : "4 2"} // 選択されたら実線、それ以外は点線
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
          scale: 400,
          center: [90, 31],
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

        {/* 空港間の線を描画 */}
        {renderLines()}

        {/* 羽田空港のマーカーを表示 */}
        <HNDMarker
          longitude={hndAirport.longitude}
          latitude={hndAirport.latitude}
          selectedAirports={selectedAirports}
          handleMarkerClick={() => handleMarkerClick(hndAirport.iata_code, hndAirport.longitude, hndAirport.latitude)}
        />

        {/* フィルタリングされた空港の赤丸 */}
        {filteredAirports.map((airport) => (
          <Marker
            key={airport.iata_code}
            coordinates={[airport.longitude, airport.latitude]}
          >
            <circle
              r={8}
              fill={
                airport.iata_code === 'AFN' 
                ? selectedAirports.includes(airport.iata_code) 
                  ? "#0000FF"  // ADOが選択されたら青色
                  : "#FFA500"  // ADOが未選択ならオレンジ色
                : selectedAirports.includes(airport.iata_code) 
                ? "#0000FF"  // 他の空港が選択されたら青色
                : "#FF0000"  // 他の空港が未選択なら赤色
              }
              onClick={() => handleMarkerClick(airport.iata_code, airport.longitude, airport.latitude)} // クリックイベントを追加
              style={{ cursor: availableAirports.includes(airport.iata_code) ? "pointer" : "not-allowed" }} // クリック可能かどうか
            />
            <text
              textAnchor="middle"
              style={{ fontFamily: "system-ui", fill: "#000000", fontSize: "1em" }}
              y={-5}
            >
              {airportNames[airport.iata_code] || airport.iata_code}
            </text>
          </Marker>
        ))}

        {/* クリックした空港の右側に画像を表示 */}
        <TotalLabelSum
  totalLabelSum={totalLabelSum}
  clickedAirportCoords={clickedAirportCoords}
  projection={projection}
  textX={10}
  textY={80}
  rectX={5}
  rectY={45}
  rectWidth={180}
  rectHeight={50}
/>

<MovingImage 
        imageSrc={currentImageSrc} 
        clickedAirportCoords={clickedAirportCoords} 
        projection={projection} 
      />
      </ComposableMap>

      <Modal isOpen={isModalOpen} onClose={handleReset} totalLabelSum={totalLabelSum} isWinner={totalLabelSum === 29}/>
    </div>
  );
};

export default NorthAmericaMap;
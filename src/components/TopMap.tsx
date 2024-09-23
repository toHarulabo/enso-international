import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const TopMap: React.FC = () => {
  const navigate = useNavigate();

  const handleEurasiaClick = () => {
    navigate('/eurasia'); // /eurasiaに遷移
  };
  const handleSouthAfricaClick = () => {
    navigate('/southafrica'); // /southafricaに遷移
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 200,
          center: [0, 35],
          rotate: [197, 0, 0],
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

        {/* ユーラシア大陸 */}
        <g>
        <rect
          x={50} // テキストの位置に合わせて調整
          y={115} // テキストの位置に合わせて調整
          width={200} // 背景の幅
          height={50} // 背景の高さ
          fill="yellow" // 背景色を黄色に設定
          rx={5} // 角を丸くする（オプション）
        />
        <text
          x={150} // X座標
          y={150} // Y座標
          textAnchor="middle"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={handleEurasiaClick} // クリックイベントを追加
        >
          ユーラシア大陸
        </text>
        </g>

        {/* 南アフリカ大陸 */}
        <g>
        <rect
          x={-220} // テキストの位置に合わせて調整
          y={345} // テキストの位置に合わせて調整
          width={200} // 背景の幅
          height={50} // 背景の高さ
          fill="yellow" // 背景色を黄色に設定
          rx={5} // 角を丸くする（オプション）
        />
        <text
          x={-120} // X座標
          y={380} // Y座標
          textAnchor="middle"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={handleSouthAfricaClick} // クリックイベントを追加
        >
          南アフリカ大陸
        </text>
        </g>
      </ComposableMap>
    </div>
  );
};

export default TopMap;

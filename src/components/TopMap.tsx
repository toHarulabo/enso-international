import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import enso from '../img/enso/enso ver3.png'; 
import star from '../img/star.png'; 

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const TopMap: React.FC = () => {
  const navigate = useNavigate();

  const handleEurasiaClick = () => {
    navigate('/eurasia');
  };
  const handleSouthAfricaClick = () => {
    navigate('/southafrica');
  };
  const handleNorthAmericaClick = () => {
    navigate('/northamerica');
  };
  const handleSouthAmericaClick = () => {
    navigate('/southamerica');
  };
  const handleAustraliaClick = () => {
    navigate('/australia');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 180,
          center: [0, 25],
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

        {/* enso画像に吹き出しを追加 */}
        <foreignObject x={280} y={220} width={60} height={100}>
          <Tooltip  title={<span style={{ fontSize: '20px', padding: '2px' }}>一緒に世界旅行に出かけよう！どこに行きたい？</span>}  placement="top">
            <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
              <img 
                src={enso} 
                alt="enso"
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          </Tooltip>
        </foreignObject>

        {/* ユーラシア大陸 */}
        <image href={star} x={70} y={70} width={50} height={50} />
        <image href={star} x={110} y={70} width={50} height={50} />
        <image href={star} x={150} y={70} width={50} height={50} />
        <g className="button" onClick={handleEurasiaClick}>
          <rect x={70} y={115} width={200} height={50} fill="yellow" rx={5} />
          <text x={170} y={150} textAnchor="middle" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold' }}>
            ユーラシア大陸
          </text>
        </g>

        {/* 南アフリカ大陸 */}
        <image href={star} x={-160} y={280} width={50} height={50} />
        <g className="button" onClick={handleSouthAfricaClick}>
          <rect x={-160} y={325} width={200} height={50} fill="yellow" rx={5} />
          <text x={-60} y={360} textAnchor="middle" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold' }}>
            南アフリカ大陸
          </text>
        </g>

        {/* 北アメリカ大陸 */}
        <image href={star} x={600} y={110} width={50} height={50} />
        <image href={star} x={640} y={110} width={50} height={50} />
        <g className="button" onClick={handleNorthAmericaClick}>
          <rect x={600} y={155} width={200} height={50} fill="yellow" rx={5} />
          <text x={700} y={190} textAnchor="middle" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold' }}>
            北アメリカ大陸
          </text>
        </g>

        {/* 南アメリカ大陸 */}
        <image href={star} x={740} y={355} width={50} height={50} />
        <g className="button" onClick={handleSouthAmericaClick}>
          <rect x={740} y={400} width={200} height={50} fill="yellow" rx={10} />
          <text x={840} y={435} textAnchor="middle" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold' }}>
            南アメリカ大陸
          </text>
        </g>

        {/* オーストラリア大陸 */}
        <image href={star} x={180} y={395} width={50} height={50} />
        <g className="button" onClick={handleAustraliaClick}>
          <rect x={180} y={440} width={240} height={50} fill="yellow" rx={5} />
          <text x={300} y={475} textAnchor="middle" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fill: '#000000', fontWeight: 'bold' }}>
            オーストラリア大陸
          </text>
        </g>
      </ComposableMap>
    </div>
  );
};

export default TopMap;

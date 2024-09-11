import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoUrl from './world-110m.json';

const SimpleMap: React.FC = () => {
  return (
    <ComposableMap 
      projection="geoMercator" 
      projectionConfig={{ scale: 200 }}
      width={800}
      height={400}
      style={{ width: "100%", height: "auto", backgroundColor: "lightblue" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default SimpleMap;

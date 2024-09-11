import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import * as d3 from 'd3-geo';
import geoUrl from './world-110m.json'; // ここでJSONをインポート

interface MarkerType {
  name: string;
  coordinates: [number, number];
}

const markers: MarkerType[] = [
  { name: "Point A", coordinates: [100, 60] },
  { name: "Point B", coordinates: [120, 40] },
  { name: "Point C", coordinates: [130, 50] },
];

const WorldMap: React.FC = () => {
  const [shortestPath, setShortestPath] = useState<MarkerType[]>([]);

  const calculateDistance = (pointA: [number, number], pointB: [number, number]): number => {
    const [longA, latA] = pointA;
    const [longB, latB] = pointB;
    return d3.geoDistance([longA, latA], [longB, latB]);
  };

  const calculateTSP = (points: MarkerType[]): MarkerType[] => {
    const unvisited = [...points];
    const path: MarkerType[] = [];
    let current = unvisited.shift()!; // 最初の地点を選択
    path.push(current);

    while (unvisited.length > 0) {
      let nearest = unvisited[0];
      let minDistance = calculateDistance(current.coordinates, nearest.coordinates);

      for (const point of unvisited) {
        const distance = calculateDistance(current.coordinates, point.coordinates);
        if (distance < minDistance) {
          nearest = point;
          minDistance = distance;
        }
      }

      current = nearest;
      path.push(current);
      unvisited.splice(unvisited.indexOf(nearest), 1);
    }

    // 最後に出発点に戻る
    path.push(path[0]);

    return path;
  };

  const handleCalculatePath = () => {
    const path = calculateTSP(markers);
    setShortestPath(path);
  };

  return (
    <div>
      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 100 }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto", backgroundColor: "lightblue"}}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={5} fill="#F00" />
          </Marker>
        ))}
        {shortestPath.length > 1 && shortestPath.map((point, index) => {
          if (index === shortestPath.length - 1) return null;
          const nextPoint = shortestPath[index + 1];
          const projection = d3.geoMercator();
          const projectedPoint = projection(point.coordinates);
          const projectedNextPoint = projection(nextPoint.coordinates);
          if (projectedPoint && projectedNextPoint) {
            const [x1, y1] = projectedPoint;
            const [x2, y2] = projectedNextPoint;
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="blue"
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
      </ComposableMap>
      <button onClick={handleCalculatePath}>Calculate Shortest Path</button>
    </div>
  );
};

export default WorldMap;

declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: object;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode; // ここにchildrenを追加
  }

  export class ComposableMap extends React.Component<ComposableMapProps> {}

  export interface GeographiesProps {
    geography: string | object;
    children: (data: {
      geographies: any[];
      projection: any;
    }) => React.ReactNode;
  }

  export class Geographies extends React.Component<GeographiesProps> {}

  export interface GeographyProps {
    geography: any;
    style?: object;
  }

  export class Geography extends React.Component<GeographyProps> {}

  export interface MarkerProps {
    coordinates: [number, number];
    style?: object;
    children?: React.ReactNode;
  }

  export class Marker extends React.Component<MarkerProps> {}
}

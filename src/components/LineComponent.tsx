// LineComponent.tsx
import React from 'react';

interface LineComponentProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  strokeDasharray?: string;
}

const LineComponent: React.FC<LineComponentProps> = ({
  x1,
  y1,
  x2,
  y2,
  color = "#FF0000",
  strokeDasharray = "4 2"
}) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={2}
      strokeDasharray={strokeDasharray}
    />
  );
};

export default LineComponent;

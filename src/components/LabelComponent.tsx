// LabelComponent.tsx
import React from 'react';

interface LabelComponentProps {
  x: number;
  y: number;
  label: string;
  labelColor?: string;
  labelSize?: string;
}

const LabelComponent: React.FC<LabelComponentProps> = ({
  x,
  y,
  label,
  labelColor = "#000000",
  labelSize = "1.5em"
}) => {
  const padding = 5;
  const labelWidth = label.length * 10;
  const labelHeight = 20;

  return (
    <>
      {/* Background for the label */}
      <rect
        x={x - labelWidth / 2 - padding}
        y={y - labelHeight / 2}
        width={labelWidth + padding * 2}
        height={labelHeight}
        fill="white"
        rx={5}
      />
      {/* Label text */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dy="0.35em"
        style={{ fontFamily: "system-ui", fill: labelColor, fontSize: labelSize, fontWeight: "bold" }}
      >
        {label}
      </text>
    </>
  );
};

export default LabelComponent;

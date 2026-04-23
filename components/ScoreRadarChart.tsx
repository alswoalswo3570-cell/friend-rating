"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export type ScoreAxis = {
  axis: string;
  value: number;
};

type Props = {
  data: ScoreAxis[];
  height?: number;
};

export default function ScoreRadarChart({ data, height = 320 }: Props) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius="65%"
          margin={{ top: 12, right: 36, bottom: 12, left: 36 }}
        >
          <defs>
            <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF8BA0" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#C9B6FF" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="rgba(74,43,78,0.15)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "#4A2B4E", fontSize: 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: "rgba(74,43,78,0.35)", fontSize: 10 }}
            stroke="rgba(74,43,78,0.1)"
          />
          <Radar
            name="평균"
            dataKey="value"
            stroke="#FF8BA0"
            strokeWidth={2.5}
            fill="url(#radarFill)"
            fillOpacity={0.7}
            isAnimationActive
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

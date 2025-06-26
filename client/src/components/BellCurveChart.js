import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from 'recharts';

const BellCurveChart = ({ stdScore }) => {
  const data = Array.from({ length: 151 }, (_, x) => {
    const score = x;
    const z = (score - 100) / 15;
    const y = (1 / (15 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    return { score, y: y * 1000 };
  });

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">📉 Bell Curve Interpretation</h3>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="score" type="number" domain={[55, 145]} />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        <ReferenceDot x={stdScore} y={0} r={5} fill="red" stroke="none" />
      </LineChart>
    </div>
  );
};

export default BellCurveChart;

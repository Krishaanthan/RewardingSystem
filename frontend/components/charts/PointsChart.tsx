"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug", points: 2000 },
  { month: "Sep", points: 4500 },
  { month: "Oct", points: 3800 },
  { month: "Nov", points: 6200 },
  { month: "Dec", points: 5800 },
  { month: "Jan", points: 9000 },
  { month: "Feb", points: 11000 },
  { month: "Mar", points: 14500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-2.5">
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        <p className="text-base font-bold text-primary">{payload[0].value.toLocaleString()} pts</p>
      </div>
    );
  }
  return null;
};

export function PointsChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md h-full">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-800">Points Growth</h3>
        <p className="text-sm text-gray-500 mt-0.5">Your points trend over the last 8 months</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#831238" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#831238" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#831238", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="points"
            stroke="#831238"
            strokeWidth={2.5}
            fill="url(#redGradient)"
            dot={{ fill: "#831238", r: 4, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#831238", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

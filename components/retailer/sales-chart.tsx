"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { week: "W1", sold: 420, verified: 380 },
  { week: "W2", sold: 510, verified: 495 },
  { week: "W3", sold: 468, verified: 452 },
  { week: "W4", sold: 590, verified: 570 },
  { week: "W5", sold: 640, verified: 622 },
  { week: "W6", sold: 605, verified: 590 },
]

export default function SalesChart() {
  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sold"
            stroke="hsl(var(--color-chart-1))"
            strokeWidth={2}
            dot={false}
            name="Units Sold"
          />
          <Line
            type="monotone"
            dataKey="verified"
            stroke="hsl(var(--color-chart-2))"
            strokeWidth={2}
            dot={false}
            name="Batches Verified"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

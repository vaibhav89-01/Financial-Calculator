"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface YearWiseData {
  year: string
  investment: number
  returns: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const investment = payload[0].value
    const returns = payload[1].value
    const total = investment + returns
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
        <p className="font-bold text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Investment: ₹{investment.toFixed(2)}L</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Returns: ₹{returns.toFixed(2)}L</p>
        <p className="text-sm font-semibold mt-2 text-gray-900 dark:text-white">Estimated Total: ₹{total.toFixed(2)}L</p>
      </div>
    )
  }
  return null
}

export default function YearWiseStackedChart({ data }: { data: YearWiseData[] }) {
  return (
    <ChartContainer
      config={{
        investment: {
          label: "Investment",
          color: "hsl(270, 70%, 60%)",
        },
        returns: {
          label: "Returns",
          color: "hsl(150, 70%, 50%)",
        },
      }}
      className="h-[400px] mt-8"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" />
          <YAxis
            label={{ value: "Amount (Lakhs)", angle: -90, position: "insideLeft", fill: "#9CA3AF" }}
            tickFormatter={(value) => `${value}L`}
            stroke="#9CA3AF"
          />
          <ChartTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="investment"
            stackId="a"
            fill="hsl(270, 70%, 60%)"
            name="Investment"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="returns"
            stackId="a"
            fill="hsl(150, 70%, 50%)"
            name="Returns"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}


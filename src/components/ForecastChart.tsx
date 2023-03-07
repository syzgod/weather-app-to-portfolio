import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

type forecastData = {
  name: string
  maxTemp: number
  minTemp: number
}

const ForecastChart = ({ data }: any) => {
  console.log(data)
  const chartArray: any = []

  data.list.map((interval: any): any => {
    const forecastData: forecastData = {
      name: `${new Date(interval.dt * 1000).getHours()}`,
      maxTemp: Math.ceil(interval.main.temp_max),
      minTemp: Math.floor(interval.main.temp_min),
    }
    chartArray.push(forecastData)
    return forecastData
  })
  return (
    <div className="h-full w-full rounded-xl bg-white bg-opacity-20">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartArray}
          margin={{ top: 25, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="maxTemp" stroke="rgb(200, 80, 80)" />
          <Line type="monotone" dataKey="minTemp" stroke="rgb(100, 80, 255)" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ForecastChart

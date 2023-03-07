import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

const ForecastChart = () => {
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }]
  return (
    <div className="h-full w-full bg-zinc-600/20">
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#1884d1" />
        <Line type="monotone" dataKey="amt" stroke="#8844d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  )
}

export default ForecastChart

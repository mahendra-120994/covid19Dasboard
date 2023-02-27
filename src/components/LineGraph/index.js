import {format} from 'date-fns'

import {LineChart, Line, Legend, XAxis, YAxis, Tooltip} from 'recharts'

export default function BarGraph(props) {
  const {stateDateData, category, lineColor} = props

  const chartData = stateDateData.map(e => {
    const d = e.date
    let formatDate = format(new Date(d), 'd MMM')
    formatDate = formatDate.toUpperCase()
    return {date: formatDate, case_data: e[category]}
  })
  const chartDataSortData = chartData.slice(Math.max(chartData.length - 10, 0))

  //   console.log('chartData', chartDataSortData)

  return (
    <div>
      <LineChart width={800} height={200} data={chartDataSortData}>
        <Line
          type="monotone"
          dataKey="case_data"
          name={category}
          stroke={lineColor}
        />
        <Tooltip />
        <Legend />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart>
    </div>
  )
}

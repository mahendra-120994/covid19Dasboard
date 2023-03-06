import {LineChart, Line, Legend, XAxis, YAxis, Tooltip} from 'recharts'

export default function LineGraph(props) {
  const {stateDateData, category, lineColor} = props

  const chartData = stateDateData.map(e => ({
    date: e.formatDate,
    case_data: e[category],
  }))

  //   const chartDataSortData = chartData.slice(Math.max(chartData.length - 10, 0))

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <LineChart width={800} height={300} data={chartData}>
      <Line
        type="monotone"
        dataKey="case_data"
        name={category}
        stroke={lineColor}
      />
      <Tooltip />
      <Legend />
      <XAxis dataKey="date" />
      <YAxis tickFormatter={DataFormatter} />
    </LineChart>
  )
}

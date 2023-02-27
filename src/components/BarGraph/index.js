import {Component} from 'react'
import {format} from 'date-fns'

import './index.css'

import {BarChart, Bar, XAxis, Legend, Tooltip} from 'recharts'

import LineGraph from '../LineGraph'

class BarGraph extends Component {
  state = {stateDateWiseData: []}

  componentDidMount() {
    this.getStatesData()
  }

  getStatesData = async () => {
    const {stateCode} = this.props
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const dateData = data[stateCode].dates

      const dateList = Object.keys(dateData)

      const stateDateWiseData = dateList.map(e => {
        const eachDateCase = dateData[e].total
        const date = e
        const Confirmed = eachDateCase.confirmed ? eachDateCase.confirmed : 0

        const Recovered = eachDateCase.recovered ? eachDateCase.recovered : 0

        const Deceased = eachDateCase.deceased ? eachDateCase.deceased : 0

        const Active = Confirmed - Recovered - Deceased
        return {
          date,
          Confirmed,
          Deceased,
          Recovered,
          Active,
        }
      })
      this.setState({stateDateWiseData})
    }
  }

  renderCharts = () => {
    const {stateDateWiseData} = this.state
    return (
      <>
        <div
          className="line-chart-container"
          style={{backgroundColor: '#331427'}}
        >
          <LineGraph
            stateDateData={stateDateWiseData}
            lineColor="#ff073a"
            category="Confirmed"
          />
        </div>
        <div
          className="line-chart-container"
          style={{backgroundColor: '#132240'}}
        >
          <LineGraph
            stateDateData={stateDateWiseData}
            lineColor="#007bff"
            category="Active"
          />
        </div>
        <div
          className="line-chart-container"
          style={{backgroundColor: '#182829'}}
        >
          <LineGraph
            stateDateData={stateDateWiseData}
            lineColor="#28a745"
            category="Recovered"
          />
        </div>
        <div
          className="line-chart-container"
          style={{backgroundColor: '#1C1C2B'}}
        >
          <LineGraph
            stateDateData={stateDateWiseData}
            lineColor="#6c757d"
            category="Deceased"
          />
        </div>
      </>
    )
  }

  render() {
    const {stateDateWiseData} = this.state
    const {activeId, activeColor} = this.props
    const dataForSelectedCase = stateDateWiseData.map(e => {
      const d = e.date
      let formatDate = format(new Date(d), 'd MMM')
      formatDate = formatDate.toUpperCase()
      return {date: formatDate, case_data: e[activeId]}
    })

    const dataForGraph = dataForSelectedCase.slice(
      Math.max(dataForSelectedCase.length - 10, 0),
    )

    return (
      <div>
        <BarChart data={dataForGraph} barSize={40} width={800} height={300}>
          <XAxis
            dataKey="date"
            stroke={activeColor}
            fontSize={16}
            interval={0}
            axisLine={false}
            tick={{
              stroke: '',
              strokeWidth: 1,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="case_data"
            name={activeId}
            fill={activeColor}
            radius={[8, 8, 0, 0]}
            label={{position: 'top', fill: activeColor, fontSize: 12}}
            width={60}
          />
        </BarChart>
        {this.renderCharts()}
      </div>
    )
  }
}
export default BarGraph

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import {BarChart, Bar, XAxis, Legend, Tooltip} from 'recharts'

import LineGraph from '../LineGraph'

const viewStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BarGraph extends Component {
  state = {stateDateWiseData: [], viewStatus: viewStatusConstant.initial}

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
        let formatDate = e
        const d = new Date(formatDate).getDate()
        // const y = new Date(formatDate).getFullYear()
        let m = new Date(formatDate).getMonth()

        const monthNames = [
          'january',
          'february',
          'march',
          'april',
          'may',
          'june',
          'july',
          'august',
          'september',
          'october',
          'november',
          'december',
        ]

        m = monthNames[m].slice(0, 3).toUpperCase()

        formatDate = [d, m].join(' ')
        const Confirmed = eachDateCase.confirmed ? eachDateCase.confirmed : 0

        const Recovered = eachDateCase.recovered ? eachDateCase.recovered : 0

        const Deceased = eachDateCase.deceased ? eachDateCase.deceased : 0

        const Tested = eachDateCase.tested ? eachDateCase.tested : 0

        const Active = Confirmed - Recovered - Deceased
        return {
          formatDate,
          Confirmed,
          Deceased,
          Recovered,
          Active,
          Tested,
        }
      })
      this.setState({stateDateWiseData, viewStatus: viewStatusConstant.success})
    }
  }

  renderCharts = () => {
    const {stateDateWiseData} = this.state
    return (
      <div testid="lineChartsContainer">
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
        <div
          className="line-chart-container"
          style={{backgroundColor: '#230F41'}}
        >
          <LineGraph
            stateDateData={stateDateWiseData}
            lineColor="#9673B9"
            category="Tested"
          />
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {stateDateWiseData} = this.state
    const {activeId, activeColor} = this.props
    const dataForSelectedCase = stateDateWiseData.map(e => ({
      date: e.formatDate,
      case_data: e[activeId],
    }))

    const dataForGraph = dataForSelectedCase.slice(
      Math.max(dataForSelectedCase.length - 10, 0),
    )

    return (
      <>
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
        <h1 className="spread-hdg">Spread Trends</h1>
        {this.renderCharts()}
      </>
    )
  }

  renderLoadingView = () => (
    <div testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {viewStatus} = this.state

    switch (viewStatus) {
      case viewStatusConstant.success:
        return this.renderSuccessView()
      case viewStatusConstant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default BarGraph

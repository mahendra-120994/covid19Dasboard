import {Component} from 'react'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import BarGraph from '../BarGraph'
import Footer from '../Footer'

import StateCard from '../StateCard'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]
const viewStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CovidState extends Component {
  state = {
    viewStatus: viewStatusConstant.initial,
    stateWiseData: {},
    districtDatalist: [],
    totalTested: 0,
    lastUpdatedDate: '',
    stateName: '',
    activeId: 'Confirmed',
    color: '#ff073a',
  }

  componentDidMount() {
    this.getStateData()
  }

  getStateData = async () => {
    this.setState({viewStatus: viewStatusConstant.loading})
    const {match} = this.props
    const {id} = match.params
    const stateCode = id
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const districtList = Object.keys(data[stateCode].districts)

      const districtDatalist = districtList.map(e => {
        const eachDistrictCase = data[stateCode].districts[e].total
        const districtName = e
        const Confirmed = eachDistrictCase.confirmed
          ? eachDistrictCase.confirmed
          : 0

        const Recovered = eachDistrictCase.recovered
          ? eachDistrictCase.recovered
          : 0

        const Deceased = eachDistrictCase.deceased
          ? eachDistrictCase.deceased
          : 0

        const Active = Confirmed - Recovered - Deceased
        return {
          districtName,
          Confirmed,
          Deceased,
          Recovered,
          Active,
        }
      })

      const stateData = data[stateCode].total

      const stateWiseData = stateData

      const totalTested = stateData.tested

      let lastUpdatedDate = data[stateCode].meta.last_updated

      const formatDate = format(new Date(lastUpdatedDate), 'MMMM do yyyy')

      lastUpdatedDate = formatDate.toLowerCase()

      let stateName
      statesList.forEach(e => {
        if (e.state_code === stateCode) {
          stateName = e.state_name
        }
      })

      this.setState({
        stateWiseData,
        districtDatalist,
        stateName,
        lastUpdatedDate,
        totalTested,
        viewStatus: viewStatusConstant.success,
      })
    }
  }

  selectCase = (id, color) => {
    this.setState({activeId: id, color}, this.getStateData)
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {
      stateWiseData,
      districtDatalist,
      activeId,
      stateName,
      totalTested,
      lastUpdatedDate,
      color,
    } = this.state

    // console.log('color', color)

    const {match} = this.props
    const {id} = match.params
    const stateCode = id

    return (
      <div className="state-container">
        <div className="state-header">
          <div className="date-container">
            <h1 className="state-name">{stateName}</h1>
          </div>
          <div className="tested-box">
            <p className="tested-heading">Tested</p>
            <p className="tested-case">{totalTested}</p>
          </div>
        </div>

        <p className="updated-date">{`Last updated on ${lastUpdatedDate}`}</p>

        <StateCard
          stateData={stateWiseData}
          selectCase={this.selectCase}
          activeId={activeId}
        />
        <div className="district-container">
          <h1 className="top-dist-hdg" style={{color}}>
            Top District
          </h1>
          <ul className="district-list">
            {districtDatalist.map(e => {
              if (e[activeId] !== 0) {
                return (
                  <li key={e.districtName} className="district-list-item">
                    <p className="district-case">{e[activeId]}</p>
                    <p className="district-name">{e.districtName}</p>
                  </li>
                )
              }
              return null
            })}
          </ul>
        </div>
        <div className="graph-container">
          {/* testid="lineChartsContainer" */}
          <BarGraph
            stateCode={stateCode}
            activeId={activeId}
            activeColor={color}
          />
        </div>
      </div>
    )
  }

  render() {
    const {viewStatus} = this.state

    let renderView

    switch (viewStatus) {
      case viewStatusConstant.success:
        renderView = this.renderSuccessView()
        break
      case viewStatusConstant.loading:
        renderView = this.renderLoadingView()
        break
      default:
        return null
    }

    return (
      <>
        <Header />
        <div className="state-bg">
          {renderView}
          <Footer />
        </div>
      </>
    )
  }
}
export default CovidState

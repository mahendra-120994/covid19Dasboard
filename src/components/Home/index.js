import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'

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

class Home extends Component {
  state = {
    viewStatus: viewStatusConstant.initial,
    covid19DataList: [],
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    searchInput: '',
    order: 'ASC',
  }

  componentDidMount() {
    this.fetchJobsData()
  }

  fetchJobsData = async () => {
    this.setState({viewStatus: viewStatusConstant.loading})

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      let totalConfirmed = 0
      let totalRecovered = 0
      let totalDeceased = 0

      statesList.forEach(eachState => {
        const {total} = data[eachState.state_code]
        totalConfirmed += total.confirmed
        totalRecovered += total.recovered
        totalDeceased += total.deceased
      })
      const totalActive = totalConfirmed - totalRecovered - totalDeceased

      const covid19DataList = statesList.map(eachState => ({
        stateCode: eachState.state_code,
        stateName: eachState.state_name,
        confirmed: data[eachState.state_code].total.confirmed,
        active:
          data[eachState.state_code].total.confirmed -
          data[eachState.state_code].total.recovered -
          data[eachState.state_code].total.deceased,
        tested: data[eachState.state_code].total.tested,
        recovered: data[eachState.state_code].total.recovered,
        deceased: data[eachState.state_code].total.deceased,
        population: data[eachState.state_code].meta.population,
      }))

      this.setState({
        covid19DataList,
        totalConfirmed,
        totalActive,
        totalRecovered,
        totalDeceased,
        viewStatus: viewStatusConstant.success,
      })
    } else {
      this.setState({
        viewStatus: viewStatusConstant.failure,
      })
    }
  }

  searchState = event => {
    this.setState({searchInput: event.target.value})
  }

  sortList = value => {
    this.setState({order: value})
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      {/* testid="homeRouteLoader" */}
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {
      covid19DataList,
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
      searchInput,
      order,
    } = this.state

    const filterState = covid19DataList.filter(e =>
      e.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let filteredData

    if (order === 'ASC') {
      filteredData = covid19DataList
    } else {
      filteredData = covid19DataList.reverse()
    }

    return (
      <>
        <div className="search-container">
          <BsSearch />
          <input
            type="search"
            placeholder="Enter the state"
            className="search-input"
            value={searchInput}
            onChange={this.searchState}
          />
        </div>
        {searchInput && (
          <ul className="search-list">
            {/* testid="searchResultsUnorderedList" */}
            {filterState.map(e => (
              <li key={e.stateCode} className="search-list-item">
                <p className="search-option">{e.stateName}</p>
                <Link to={`/state/${e.stateCode}`} className="link-item">
                  <button type="button" className="icon-btn">
                    <div className="search-click">
                      <p>{e.stateCode}</p>
                      <BiChevronRightSquare className="arrow-right" />
                    </div>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="total-data-container">
          <div className="total-data confirmed">
            {/*  testid="countryWideConfirmedCases" */}
            <p className="data-type">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/check-mark_sowise.png"
              alt="country wide confirmed cases pic"
            />
            <p className="total-data">{totalConfirmed}</p>
          </div>
          <div className="total-data active">
            {/* testid="countryWideActiveCases" */}
            <p className="data-type">Active</p>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/protection_x7c08c.png"
              alt="country wide active cases pic"
            />
            <p className="total-data">{totalActive}</p>
          </div>
          <div className="total-data recovered">
            {/*  testid="countryWideRecoveredCases" */}
            <p className="data-type">Recovered</p>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/recovered_a62w5v.png"
              alt="country wide recovered cases pic"
            />
            <p className="total-data">{totalRecovered}</p>
          </div>
          <div className="total-data deceased">
            {/*  testid="countryWideDeceasedCases" */}
            <p className="data-type">Deceased</p>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/breathing_enzyun.png"
              alt="country wide deceased cases pic"
            />
            <p className="total-data">{totalDeceased}</p>
          </div>
        </div>
        <div className="home-data-container">
          {/* testid="stateWiseCovidDataTable" */}
          <ul className="covid-list">
            <li className="list-item header-list" key="table">
              <div className="filter-box">
                <p style={{marginRight: 10}}>States/UT</p>
                <button
                  type="button"
                  onClick={() => this.sortList('ASC')}
                  className="icon-btn"
                >
                  <FcGenericSortingAsc />
                </button>
                <button
                  type="button"
                  onClick={() => this.sortList('DESC')}
                  className="icon-btn"
                >
                  <FcGenericSortingDesc />
                </button>
              </div>

              <p className="width-margin">Confirmed</p>
              <p className="width-margin">Active</p>
              <p className="width-margin">Recovered</p>
              <p className="width-margin">Deceased</p>
              <p className="width-margin">Population</p>
            </li>
            {filteredData.map(e => (
              <li key={e.stateCode} className="list-item">
                <Link to={`/state/${e.stateCode}`} className="link-item">
                  <p className="state">{e.stateName}</p>
                </Link>
                <p className="confirmed width-margin">{e.confirmed}</p>
                <p className="active width-margin">{e.active}</p>
                <p className="recovered width-margin">{e.recovered}</p>
                <p className="deceased width-margin">{e.deceased}</p>
                <p className="population width-margin">{e.population}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
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
        <div className="home-background">
          {renderView}
          <Footer />
        </div>
      </>
    )
  }
}
export default Home

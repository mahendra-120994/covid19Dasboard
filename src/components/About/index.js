import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const viewStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    viewStatus: viewStatusConstant.initial,
    fatoidsList: [],
    foqsList: [],
  }

  componentDidMount() {
    console.log(this.props)
    this.getAboutFaqs()
  }

  getAboutFaqs = async () => {
    this.setState({viewStatus: viewStatusConstant.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      console.log(data)

      const fatoidsList = data.factoids
      const foqsList = data.faq
      this.setState({
        fatoidsList,
        foqsList,
        viewStatus: viewStatusConstant.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {fatoidsList, foqsList} = this.state

    return (
      <div className="about-container">
        <h1 className="about-hdg">About</h1>
        {/* <p className="about-date">Last updated on ---</p> */}
        <h1 className="about-msg">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul className="faqs-list">
          {/* testid="faqsUnorderedList" */}
          {foqsList.map(eachFaq => (
            <li key={eachFaq.qno} className="faq-list-item">
              <p className="faq-que">{eachFaq.question}</p>
              <p className="faq-ans">{eachFaq.answer}</p>
            </li>
          ))}
        </ul>
        <h1 className="faqtoids-heading">Factoids</h1>
        <ul className="faqs-list">
          {fatoidsList.map(eachFaqtoid => (
            <li key={eachFaqtoid.id} className="faqtoid-list-item">
              <p className="faqtoid">{eachFaqtoid.banner}</p>
            </li>
          ))}
        </ul>
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
        <div className="about-bg">
          {renderView}
          <Footer />
        </div>
      </>
    )
  }
}
export default About

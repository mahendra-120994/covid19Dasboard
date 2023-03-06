import './index.css'

const NotFound = props => {
  const {history} = props
  const goHome = () => {
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677421613/miniproject/Covid19%20Dashboard/Group_7484_xl9nm3.png"
        alt="not-found-pic"
        className="not-found-img"
      />
      <h1 className="not-found-msg">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" className="not-found-btn" onClick={goHome}>
        Home
      </button>
    </div>
  )
}

export default NotFound

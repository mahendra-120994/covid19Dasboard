import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677421613/miniproject/Covid19%20Dashboard/Group_7484_xl9nm3.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-msg">Page Not Found</h1>
    <p className="not-found-para">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound

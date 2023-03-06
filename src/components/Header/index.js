import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {showNavMenu, showMenu} = props

  const display = showMenu ? '' : 'none'

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-links">
          <span className="nav-logo-covid19">COVID19</span>
          <span className="nav-logo-india">INDIA</span>
        </Link>

        <ul className="nav-menu-container">
          <Link to="/" className="nav-links">
            <li className="nav-list-item" key="Home">
              <button type="button" className="nav-btn">
                Home
              </button>
            </li>
          </Link>

          <Link to="/about" className="nav-links">
            <li className="nav-list-item" key="About">
              <button type="button" className="nav-btn">
                About
              </button>
            </li>
          </Link>
        </ul>

        <li key="Menu" className="nav-mobile-item">
          <button type="button" className="icon-btn" onClick={showNavMenu}>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677498574/miniproject/Covid19%20Dashboard/add-to-queue_cjbi0w.png"
              alt="menu -icon"
            />
          </button>
        </li>
      </nav>

      <ul className={`nav-menu-mobile ${display}`}>
        <li className="nav-mobile-item" key="Home">
          <Link to="/" className="nav-links">
            <button type="button" className="nav-btn">
              Home
            </button>
          </Link>
        </li>

        <Link to="/about" className="nav-links">
          <li className="nav-mobile-item" key="About">
            <button type="button" className="nav-btn">
              About
            </button>
          </li>
        </Link>

        <li className="nav-mobile-item" key="Close">
          <button type="button" className="icon-btn" onClick={showNavMenu}>
            <img
              src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1678007954/miniproject/Covid19%20Dashboard/Shape_hhhjvr.png"
              alt="menu -icon"
            />
          </button>
        </li>
      </ul>
    </>
  )
}
export default Header

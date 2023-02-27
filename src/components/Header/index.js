import {Link} from 'react-router-dom'

import './index.css'

export default function Header() {
  return (
    <nav className="nav-bar">
      <ul className="nav-container">
        <Link to="/" className="nav-links">
          <li className="nav-list-item">
            <p className="nav-logo-covid19">COVID19</p>
            <p className="nav-logo-india">INDIA</p>
          </li>
        </Link>
        <ul className="nav-list-item">
          <Link to="/" className="nav-links">
            <li className="nav-list-item">
              <button type="button" className="nav-btn">
                Home
              </button>
            </li>
          </Link>
          <Link to="/about" className="nav-links">
            <li className="nav-list-item">
              <button type="button" className="nav-btn">
                About
              </button>
            </li>
          </Link>
        </ul>
      </ul>
    </nav>
  )
}

import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="border-item">
      <p className="border-covid19">COVID19</p>
      <p className="border-india">INDIA</p>
    </div>
    <p className="footer-msg">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icon-container">
      <VscGithubAlt />
      <FiInstagram />
      <FaTwitter />
    </div>
  </>
)

export default Footer

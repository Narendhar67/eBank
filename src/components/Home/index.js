import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-bg">
      <nav className="navBar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
          alt="website logo"
          className="website-logo"
        />
        <button type="button" onClick={onLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div className="content-box">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-img"
        />
      </div>
    </div>
  )
}

export default Home

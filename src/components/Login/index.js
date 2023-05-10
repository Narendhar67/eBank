import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  updateUserName = e => {
    this.setState({userName: e.target.value})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {history} = this.props
    const {userName, password} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {
      user_id: userName,
      pin: password,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },

      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 2})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {userName, password, errorMsg} = this.state
    const Token = Cookies.get('jwt_token')

    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <div className="right-part">
            <h1 className="login-heading">Welcome Back!</h1>
            <form onSubmit={this.submitDetails}>
              <div className="input-container">
                <label className="login-label" htmlFor="userId">
                  User ID
                </label>
                <input
                  value={userName}
                  className="input-box"
                  id="userId"
                  placeholder="Enter User ID"
                  onChange={this.updateUserName}
                />
              </div>
              <div className="input-container">
                <label className="login-label" htmlFor="password">
                  PIN
                </label>
                <input
                  className="input-box"
                  id="password"
                  type="password"
                  placeholder="Enter PIN"
                  value={password}
                  onChange={this.updatePassword}
                />
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
            <p className="error-msg">{errorMsg}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

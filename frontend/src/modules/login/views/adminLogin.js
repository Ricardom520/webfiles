import React, { Component } from 'react';
import './adminLogin.less'

class AdminLogin extends Component {
  render() {
    return (
      <div className="loginContainer">
        <div className="videoContainer">
          <video width="100%" height="100%" autoplay="true" src="../../static/bg.mp4" loop="loop" muted="muted" style={{objectFit: 'fill'}}></video>
        </div>
      </div>
    )
  }
}

export default AdminLogin
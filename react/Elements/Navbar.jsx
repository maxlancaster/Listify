import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Navbar extends Component {
  render() {
    return (
      <div className = "Navbar">
        <button className = "LogoutButton">Logout</button>
        <a href ="/"><h1 id = "listify-title">Listify</h1></a>

      </div>
    )
  }
}

export default withRouter(Navbar);

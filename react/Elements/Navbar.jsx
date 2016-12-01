import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';

class Navbar extends Component {
  render() {
    return (
      <div className = "Navbar">
        <a href ="/"><h1 id = "listify-title">Listify</h1></a>
        // testing purposes. TODO: remove once can load from url
    	<li>
            <Link to={'/rankings/edit/583e48898d814322332cd2c0'}>{'click'}</Link>
        </li>
      </div>
    )
  }
}

export default withRouter(Navbar);

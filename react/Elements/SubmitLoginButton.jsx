import React, { Component } from 'react';
import Users from '../../models/Users.js';
import { withRouter } from 'react-router';

class SubmitLoginButton extends Component {
  constructor(props) {
    super(props);
  }

  submitLogin(username, password) {
  	// submit login
  }

  render() {
    const style = { position: 'fixed', bottom: 10, right: 10 }
    return (
      <button style = {style} onClick={this.props.onClick.bind(null)}>Login</button>
    );
  }
}
export default withRouter(SubmitLoginButton);
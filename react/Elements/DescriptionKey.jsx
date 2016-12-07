import React, { Component } from 'react';
import { withRouter } from 'react-router';


class ProfileDescription extends Component {

  render() {
		return (
      <div className = "DescriptionKey">
        <div className = "Description">
          <div className = "RedDot"></div>
          <p>Voting Closed</p>
        </div>
        <div className = "Description">
          <div className = "GreenDot"></div>
          <p>Ranking Submitted</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileDescription);

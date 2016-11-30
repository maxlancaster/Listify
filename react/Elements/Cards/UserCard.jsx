import React, { Component } from 'react';
import { withRouter } from 'react-router';

class UserCard extends Component {

  deletePressed() {
    this.props.deleteInvitedUser(this.props.username);
  }

  render() {
		const { username, index } = this.props;

		return(
        <div className = "UserCard">
          <button className = "ItemCardEditButton"
            onClick={this.deletePressed.bind(this)}>x</button>
          <p className = "UserCardTitle">{username}</p>
        </div>
    );
  }
}

export default withRouter(UserCard);

import React, { Component } from 'react';
import { withRouter } from 'react-router';

class UserCard extends Component {

  deletePressed() {
    this.props.deleteInvitedUser(this.props.user);
  }

  render() {
		const { user, index } = this.props;

		return(
        <div className = "UserCard">
          <button className = "ItemCardEditButton"
            onClick={this.deletePressed.bind(this)}>x</button>
          <p className = "UserCardTitle">{"@"+user.username}</p>
        </div>
    );
  }
}

export default withRouter(UserCard);

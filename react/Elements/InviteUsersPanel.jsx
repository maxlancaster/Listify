import React, { Component } from 'react';
import { withRouter } from 'react-router';
import UserCard from './Cards/UserCard.jsx'


class InviteUsersPanel extends Component {
  constructor(props) {
		super(props);
		this.state = { invitedUsers: []};
	}

  handleChange(event) {
    var searchText = event.target.value;
    this.setState({searchText: event.target.value});
    //HANDLE AUTOCOMPLETE/ SEARCH FOR USERS
  }

  handleSubmit(event) {
    event.preventDefault();
    var invitedUsers = this.state.invitedUsers;
    invitedUsers.push("User");
    this.setState({invitedUsers:invitedUsers});
    console.log(invitedUsers);
  }

  deleteInvitedUser(user) {
    var invitedUsers = this.state.invitedUsers;
    var index = invitedUsers.indexOf(user);
    if (index > -1) {
      invitedUsers.splice(index,1);
    }
    this.setState({invitedUsers:invitedUsers});
  }

	render() {
    var invitedUsers = this.state.invitedUsers;
		return (
      <div className = "InviteUsersPanel">
        <h1 className = "OptionsListTitle"> Invite Users</h1>
          <form onSubmit={this.handleSubmit.bind(this)} className = "UserSearchTextInput">
            <input type="text"
                   placeholder={"Search Username"}
                   onChange={this.handleChange.bind(this)}
            />
          </form>
          {invitedUsers.map((username, index) => {
            return (
              <UserCard
                key={index}
                index={index}
                username={username}
                deleteInvitedUser={this.deleteInvitedUser.bind(this)}
              />
            );
          })}
      </div>
		);
  }
}

export default withRouter(InviteUsersPanel);

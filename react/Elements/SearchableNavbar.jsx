import React, { Component } from 'react';
import { withRouter } from 'react-router';

class SearchableNavbar extends Component {
  constructor(props) {
		super(props);
		this.state = { searchText: ""};
	}

  handleChange(event) {
    var searchText = event.target.value;
    this.setState({searchText: event.target.value});
    //HANDLE AUTOCOMPLETE/ SEARCH FOR USERS
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchText);
  }

  render() {
    return (
      <div className = "SearchableNavbar">
        <button className = "LogoutButton" onClick = {this.props.logout}>Logout</button>
        <a href ="/"><h1 id = "listify-title">Listify</h1></a>
          <form onSubmit={this.handleSubmit.bind(this)} className = "SearchTextInput">
            <input type="text"
                   placeholder={"Search"}
                   onChange={this.handleChange.bind(this)}
            />
          </form>

      </div>
    )
  }
}

export default withRouter(SearchableNavbar);

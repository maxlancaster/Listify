import React, { Component } from 'react';
import CreateRankingsPage from './Pages/CreateRankingsPage.jsx';
import { withRouter } from 'react-router';

class App extends Component {

	render() {
		return ( <CreateRankingsPage />);
	}
}

export default withRouter(App);

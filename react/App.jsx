import React, { Component } from 'react';
import CreateRankingsPage from './Pages/CreateRankingsPage.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
import { withRouter } from 'react-router';

class App extends Component {

	render() {
		return (
			<div className = "App">
				<CreateRankingsPage />
			</div>

	);
	}
}

export default withRouter(App);

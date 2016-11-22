import React, { Component } from 'react';
import CreateRankingsPage from './Pages/CreateRankingsPage.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
import LoginPage from './Pages/LoginPage.jsx'
import ViewConsensusRankingPage from './Pages/ViewConsensusRankingPage.jsx';
import Navbar from './Elements/Navbar.jsx';
import { withRouter } from 'react-router';
import userServices from '../services/userServices.js';

class App extends Component {
	constructor(props){
        super(props);
    }

    componentWillMount(){
        userServices.getCurrentUser()
            .then((res) => {
                if (res.content.loggedIn) {
                    this.setState((prevState) => {
                        prevState.user = res.content.user;
                        return prevState;
                    })
                }
            });
    }

	render(){
        return (
			<div className = "App">
				<ViewConsensusRankingPage />
			</div>
        );
    }
};

// App.propTypes = {
//     children : React.PropTypes.any.isRequired
// };

export default withRouter(App);

import React, { Component } from 'react';
import CreateRankingsPage from './Pages/CreateRankingsPage.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
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
            <LoginPage>
                <NavBar
                    currentUser={this.state.user}
                    logout={this.logout}
                    userServices ={userServices}
                    />
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        userServices : userServices,
                        user : this.state.user,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                    })}
                </div>
            </LoginPage>
        );
    }
};

App.propTypes = {
    children : React.PropTypes.any.isRequired
};

export default withRouter(App);

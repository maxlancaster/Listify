import React, { Component } from 'react';
import CreateListPage from './Pages/CreateListPage.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
import LoginPage from './Pages/LoginPage.jsx'
import ViewConsensusRankingPage from './Pages/ViewConsensusRankingPage.jsx';
import SearchableNavbar from './Elements/SearchableNavbar.jsx';
import { withRouter } from 'react-router';
import userServices from '../services/userServices.js';
import rankingServices from '../services/rankingServices.js'

class App extends Component {
	constructor(props){
        super(props);
        this.state = {
            user : undefined,
        };
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.registerUser = this.registerUser.bind(this);
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

    loginUser(username, password){
        userServices.login(username, password)
            .then((res) => {
                if (res.success){
                    this.setState((prevState) => {
                        prevState.user = res.content.user;
                        return prevState;
                    });
                    this.props.router.push('/');
                }
            }).catch((err) => {
                console.log("Login err: ", err.error.err);
            });
    }

	logout() {
        userServices.logout().then((res) => {
            if (res.success){
                this.setState((prevState) => {
                    prevState.user = 'Not Logged In';
                    return prevState;
                });
                this.props.router.push('/signin');
            }
        });
	}

  registerUser(username, password){
      userServices.register(username, password).then((res) => {
          if (res.success){
              this.loginUser(username, password);
          } else {
              console.log("Error on register user: ",res.err)
          }
      });
  }

	profile() {
		this.props.router.push('your');
	}

	render(){
    return (
			<div id = "app">
				<SearchableNavbar logout = {this.logout.bind(this)} profile = {this.profile.bind(this)}/>
				<div className="content">
					{React.cloneElement(this.props.children, {
                        userServices : userServices,
                        user : this.state.user,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                    })}
				</div>
			</div>
        );
    }
};

// App.propTypes = {
//     children : React.PropTypes.any.isRequired
// };

export default withRouter(App);

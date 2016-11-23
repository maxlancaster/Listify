import { Component } from 'react';
import React from 'react';
import { withRouter } from 'react-router';
import userServices from '../../services/userServices.js';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginUser : '',
            loginPass : '',
            registerUser : '',
            registerPass : '',
            errorMessage: ''
        };
        this.updateFormVal = this.updateFormVal.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    updateFormVal(event){
        var updatedField = event.target.name;
        var updatedValue = event.target.value;
        this.setState((prevState) => {
            prevState[updatedField] = updatedValue;
            return prevState;
        })
    }

    registerUser(username, password){
        userServices.register(this.state.registerUser, this.state.registerPass).then((res) => {
            if (res.success){
                console.log("user created! attempting to login user with info: " + this.state.registerUser + " , " + this.state.registerPass);
                this.state.loginUser = this.state.registerUser;
                this.state.loginPass = this.state.registerPass;
                this.loginUser();
            } else {
                this.setState({errorMessage:res.err});
                console.log("Error on register user: ",res.err)
            }
        });
    }

    loginUser(){
        userServices.login(this.state.loginUser, this.state.loginPass)
            .then((res) => {
                if (res.success){
                    this.setState((prevState) => {
                        prevState.user = res.content.user;
                        return prevState;
                    });
                    this.props.router.push('/');
                }
            }).catch((err) => {
                this.setState({errorMessage:err.error.err});
                console.log("Login err: ", err.error.err);
            });
    }

    render(){
        return (
          <div className = "LoginPage">
            <div className='UserAuthContainer'>
                <div className='SignInForm'>
                    <h1>Sign In</h1>
                    <div className='form'>
                        <div className='form-group'>
                            <input className='username'
                                   name='loginUser'
                                   placeholder='Username'
                                   value={this.state.loginUser}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <div className='form-group'>
                            <input className='password'
                                   type='password'
                                   name='loginPass'
                                   placeholder='Password'
                                   value={this.state.loginPass}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <button className='login-button' onClick={this.loginUser}>Sign In</button>
                    </div>
                </div>
                <div className='RegisterForm'>
                    <h1>Register</h1>
                    <div className='form'>
                        <div className='form-group'>
                            <input className='username'
                                   name='registerUser'
                                   placeholder='Username'
                                   value={this.state.registerUser}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <div className='form-group'>
                            <input className='password'
                                   type='password'
                                   name='registerPass'
                                   placeholder='Password'
                                   value={this.state.registerPass}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <button className='signup-button' onClick={this.registerUser}>Register</button>
                          {this.state.errorMessage &&
                            <p style = {{color:"red"}}>{this.state.errorMessage}</p>
                          }
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

export default withRouter(LoginPage);

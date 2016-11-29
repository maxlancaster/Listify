import { Component } from 'react';
import React from 'react';
import { withRouter } from 'react-router';
// import userServices from '../../services/userServices.js';

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
        this.props.registerUser(this.state.registerUser, this.state.registerPass);
    }

    loginUser(){
        this.props.loginUser(this.state.loginUser, this.state.loginPass);
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

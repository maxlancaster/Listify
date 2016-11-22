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
            registerPass : ''
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
                    this.props.router.push('/ranking');
                }
            }).catch((err) => {
                console.log("Login err: ", err.error.err);
            });
    }

    render(){
        return (
            <div className='container'>
                <div className='col-md-4 col-md-push-1'>
                    <h1>Sign In</h1>
                    <div className='form'>
                        <div className='form-group'>
                            <input className='form-control'
                                   name='loginUser'
                                   placeholder='Username'
                                   value={this.state.loginUser}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <div className='form-group'>
                            <input className='form-control'
                                   type='password'
                                   name='loginPass'
                                   placeholder='Password'
                                   value={this.state.loginPass}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <button className='btn btn-default' onClick={this.loginUser}>Sign In</button>
                    </div>
                </div>
                <div className='col-md-4 col-md-push-2'>
                    <h1>Register</h1>
                    <div className='form'>
                        <div className='form-group'>
                            <input className='form-control'
                                   name='registerUser'
                                   placeholder='Username'
                                   value={this.state.registerUser}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <div className='form-group'>
                            <input className='form-control'
                                   type='password'
                                   name='registerPass'
                                   placeholder='Password'
                                   value={this.state.registerPass}
                                   onChange={this.updateFormVal}
                                />
                        </div>
                        <button className='btn btn-default' onClick={this.registerUser}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);
import App from './App.jsx';
// import services from '../services';
import LoginPage from './Pages/LoginPage.jsx';
import services from '../services/userServices.js';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Stubbed out authCheck will automatically redirect to the signin route
// if there's no current user.  Example implementation online:
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

//ToDo

// const authCheck = (nextState, replace, callback) => {
//     services.user.getCurrentUser().then((response) => {
//         if (!response.content.loggedIn){
//             replace('/signin');
//         }
//         callback();
//     }).catch((err) => {
//         console.log("Err on getCurrentUser() : ", err);
//         callback();
//     });
// };

export default (
    <Router history={browserHistory} >
        <Route path='/' component={App}  >
            <Route path="signin"
                   component={LoginPage} />
        </Route>
    </Router>
);
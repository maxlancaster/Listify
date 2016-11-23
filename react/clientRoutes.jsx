import App from './App.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
import CreateRankingsPage from './Pages/CreateRankingsPage.jsx';
import ViewConsensusRankingPage from './Pages/ViewConsensusRankingPage.jsx';
import ViewCompletedRankingsPage from './Pages/ViewCompletedRankingsPage.jsx';
// import services from '../services';
import LoginPage from './Pages/LoginPage.jsx';
import userServices from '../services/userServices.js';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Stubbed out authCheck will automatically redirect to the signin route
// if there's no current user.  Example implementation online:
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

//ToDo

// const authCheck = (nextState, replace, callback) => {
//     userServices.getCurrentUser().then((response) => {
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
        <Route path='/' component={LoginPage} />
        <Route path="rankings" component={CreateRankingsPage} />
        <Route path="rankings/edit" component={EditRankingsPage} />
        <Route path="consensus" component={ViewConsensusRankingPage} />
        <Route path="rankings" component={ViewCompletedRankingsPage} />
    </Router>
);

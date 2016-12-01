import App from './App.jsx';
import EditRankingsPage from './Pages/EditRankingsPage.jsx';
import ViewRankingPage from './Pages/ViewRankingPage.jsx';
import CreateListPage from './Pages/CreateListPage.jsx';
import ViewConsensusRankingPage from './Pages/ViewConsensusRankingPage.jsx';
import ViewListsPage from './Pages/ViewListsPage.jsx';
import NotFound from './Pages/NotFound.jsx';
import StandardRankingsPage from './Pages/StandardRankingsPage.jsx';
import ListsSearchResultsPage from './Pages/ListsSearchResultsPage.jsx'
import ViewYourRankingsPage from './Pages/ViewYourRankingsPage.jsx'
// import services from '../services';
import LoginPage from './Pages/LoginPage.jsx';
import userServices from '../services/userServices.js';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Stubbed out authCheck will automatically redirect to the signin route
// if there's no current user.  Example implementation online:
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

//ToDo

const authCheck = (nextState, replace, callback) => {
    userServices.getCurrentUser().then((response) => {
        if (!response.content.loggedIn){
            replace('/signin');
        }
        callback();
    }).catch((err) => {
        console.log("Err on getCurrentUser() : ", err);
        callback();
    });
};

export default (
    <Router history={browserHistory} >
      <Route path='/' component={App}  >
        <IndexRoute component={ViewListsPage} onEnter={authCheck}/>
        <Route path="signin" component={LoginPage} />
        <Route path="your" component={ViewYourRankingsPage} />
        //TODO: WHY WON'T CSS LOAD?
        <Route path="lists/search/:searchString" component={ListsSearchResultsPage} onEnter={authCheck}/>
        <Route path="rankings" component={CreateListPage} onEnter={authCheck}/>
        //TODO:CHANGE TO rankings/:id once we figure out why it collides with api
        //TODO:WHY WON'T CSS LOAD?
        <Route path="get_ranking" component={ViewRankingPage}/>
        <Route path="rankings/edit" component={EditRankingsPage} onEnter={authCheck} />
        <Route path="rankings/edit/*" component={StandardRankingsPage} />
        <Route path="consensus" component={ViewConsensusRankingPage} />
        <Route path="current" component={StandardRankingsPage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
);

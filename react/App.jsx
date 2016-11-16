import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { Component } from 'react';
import RankingElement from './Elements/RankingElement.jsx';

var colors = ["Red","Green","Blue","Yellow","Black","White","Orange"];

class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
              <RankingElement data = {colors} />
            </div>
        );
    }
};

export default withRouter(App);

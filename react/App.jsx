import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { Component } from 'react';
import DraggableList from './Elements/DraggableList.jsx';

var items = ["Red","Green","Blue","Yellow","Black","White","Orange"];

class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
              <DraggableList data = {items} />
            </div>
        );
    }
};

export default withRouter(App);

import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import { withRouter } from 'react-router';

const uuid = require('uuid');
//TODO: remove later
var Card = function(title, description, photo) {
   var that = Object.create(Card.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class ListsSearchResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {foundLists:[], searchString: this.props.params.searchString};
  }

  componentWillMount() {
    //TODO: LOAD SEARCH RESULTS
    var foundLists = [Card('Ranking 1'),Card('Ranking 2')];
    this.setState({foundLists:foundLists});
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("rankings");
  }

  render() {
    const foundLists = this.state.foundLists;
    const headerTitle = 'Search Results for "' + this.state.searchString + '" | '+this.state.foundLists.length+' results';
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h2>{headerTitle}</h2>
            <ViewableList id={1} lists = {foundLists} showRankingNumber = {false}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ListsSearchResultsPage);

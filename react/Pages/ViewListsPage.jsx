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

var DisplayOptionEnum= {
    TRENDING : "TRENDING",
    MOST_RECENT : "MOST_RECENT"
}


//TODO: GET ALL CONSENSUES THE USER HAS CONTRIBUTED TO AND LOAD THEM
class ViewListsPage extends Component {
  constructor(props) {
    super(props);
    var rankingTitle = "Test Title";
    var rankingDescription = "created by Phillip Ou";
    //LOAD COMPLETED CONSENSUSES ONTO COMPLETED RANKINGS
    var completedRankings = [Card('Ranking 1',rankingDescription),Card('Ranking 2',rankingDescription), Card('Ranking 3',rankingDescription)];
    this.state = {completedRankings:completedRankings};
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("rankings");
  }

  didSwitchHeader(headerSide) {
    if (headerSide === "LEFT") {
      console.log("fetch trending");
    } else {
      console.log("fetch most recent");
    }
    //ISSUE GET REQUEST TO UPDATE LIST
  }

  render() {
    const completedRankings = this.state.completedRankings;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <SwitchableHeader leftTitle = "Trending"
                              rightTitle = "Most Recent"
                              didSwitchHeader = {this.didSwitchHeader.bind(this)}
            />
            <ViewableList id={1} list = {completedRankings} showRankingNumber = {true}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewListsPage);

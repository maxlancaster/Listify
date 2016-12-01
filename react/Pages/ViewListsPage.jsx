import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
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
    this.state = {completedRankings:completedRankings, displayOption : DisplayOptionEnum.TRENDING};
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("rankings");
  }

  changeDisplayOption(displayOption) {
    this.setState({displayOption:displayOption});
    //ISSUE GET REQUEST TO UPDATE LIST
  }

  render() {
    const completedRankings = this.state.completedRankings;
    var trendingHeaderStyle = {
      color: this.state.displayOption === DisplayOptionEnum.TRENDING ? "#4A4A4A" : "#C4BFBF"
    };
    var mostRecentHeaderStyle = {
      color: this.state.displayOption === DisplayOptionEnum.MOST_RECENT ? "#4A4A4A" : "#C4BFBF"
    };
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <a href="#"
               onClick={this.changeDisplayOption.bind(this, DisplayOptionEnum.TRENDING)}
               style = {trendingHeaderStyle}>Trending</a>
            <a href ="#"> | </a>
            <a href="#"
               onClick={this.changeDisplayOption.bind(this, DisplayOptionEnum.MOST_RECENT)}
               style = {mostRecentHeaderStyle}> Most Recent</a>
            <ViewableList id={1} list = {completedRankings} showRankingNumber = {true}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewListsPage);

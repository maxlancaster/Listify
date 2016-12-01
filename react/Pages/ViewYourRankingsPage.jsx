import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableRankingsList from '../Elements/ViewableRankingsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import { withRouter } from 'react-router';

const uuid = require('uuid');


//TODO: remove later
var Rank = function(title, description, photo) {
   var that = Object.create(Rank.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class ViewYourRankingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {ranks:[]};
  }

  componentWillMount() {
    var ranks = [Rank('Your Ranking 1'),Rank('Your Ranking 2')];
    this.setState({ranks:ranks});
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("rankings");
  }

  didSwitchHeader(headerSide) {
    if (headerSide === "LEFT") {
      console.log("fetch your ranks");
    } else {
      console.log("fetch lists you're invited to");
    }
    //TODO: ISSUE GET REQUEST TO UPDATE LIST
  }

  didClickRanking(event) {
    console.log(event);
  }

  render() {
    const ranks = this.state.ranks;
    console.log(this.state);
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <SwitchableHeader leftTitle = "Your Rankings"
                              rightTitle = "Rankings Invited To"
                              didSwitchHeader = {this.didSwitchHeader.bind(this)}
            />
          <ViewableRankingsList id={1} ranks = {ranks} showRankingNumber = {false} onClick = {this.didClickRanking.bind(this)}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewYourRankingsPage);

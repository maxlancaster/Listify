import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import { withRouter } from 'react-router';

const uuid = require('uuid');


//TODO: remove later
var List = function(title, description, photo) {
   var that = Object.create(List.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class ViewListsPage extends Component {
  constructor(props) {
    super(props);
    //LOAD COMPLETED CONSENSUSES ONTO COMPLETED RANKINGS
    this.state = {lists:[]};
  }

  componentWillMount() {
    var lists = [List('List 1'),List('List 2'), List('List 3')];
    this.setState({lists:lists});
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
    //TODO: ISSUE GET REQUEST TO UPDATE LIST
  }

  render() {
    const lists = this.state.lists;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <SwitchableHeader leftTitle = "Trending"
                              rightTitle = "Most Recent"
                              didSwitchHeader = {this.didSwitchHeader.bind(this)}
            />
          <ViewableList id={1} lists = {lists} showRankingNumber = {false}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewListsPage);

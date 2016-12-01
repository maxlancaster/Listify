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

class ViewYourListsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {lists:[]};
  }

  componentWillMount() {
    var lists = [Card('Your List 1'),Card('Your List 2')];
    this.setState({lists:lists});
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("rankings");
  }

  didSwitchHeader(headerSide) {
    if (headerSide === "LEFT") {
      console.log("fetch your lists");
    } else {
      console.log("fetch lists you're invited to");
    }
    //TODO: ISSUE GET REQUEST TO UPDATE LIST
  }

  render() {
    const lists = this.state.lists;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <SwitchableHeader leftTitle = "Your Rankings"
                              rightTitle = "Rankings Invited To"
                              didSwitchHeader = {this.didSwitchHeader.bind(this)}
            />
          <ViewableList id={1} lists = {lists} showRankingNumber = {true}/>
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewYourListsPage);

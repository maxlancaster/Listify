import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import { withRouter } from 'react-router';

const uuid = require('uuid');
//TODO: remove later
var Item = function(title, description, photo) {
   var that = Object.create(Item.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class ViewConsensusRankingPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    var rankingTitle = "Test Title"
    var rankingAuthor = "Phillip Ou";
    var order = [Item('Lebron'),Item('Kobe'), Item('Carmelo')];
    this.state = {title:rankingTitle, author: rankingAuthor, order: order};
  }

  currentUserIsCreatorOfConsensus() {
    return true;
  }

  //lock consensus
  lockList() {
    console.log("lock!")
  }

  render() {
    const order = this.state.order;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h1 className = "RankingTitle">{this.state.title}</h1>
            <h2 className = "RankingAuthor">{"created by "+this.state.author}</h2>
            <ViewableList id={1} list = {order} showRankingNumber = {true}/>
          </div>
      </div>
      {this.currentUserIsCreatorOfConsensus() &&
        <BottomRightButton title = {"Lock"} onClick = {this.lockList.bind(this)}/>
      }
    </div>
		);
	}
}

export default withRouter(ViewConsensusRankingPage);

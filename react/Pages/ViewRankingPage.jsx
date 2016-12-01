import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'

class ViewRankingPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    var rankingTitle = "Test Title"
    var rankingAuthor = "Phillip Ou";
    var order = [Items('Lebron'),Items('Kobe'), Items('Carmelo')];
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
    console.log("yup");
    console.log(order);
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h1 className = "RankingTitle">{this.state.title}</h1>
            <h2 className = "RankingAuthor">{"created by "+this.state.author}</h2>
            <ViewableItemsList id={1} items = {order} showRankingNumber = {true}/>
          </div>
      </div>
      {this.currentUserIsCreatorOfConsensus() &&
        <BottomRightButton title = {"Lock"} onClick = {this.lockList.bind(this)}/>
      }
    </div>
		);
	}
}

export default withRouter(ViewRankingPage);

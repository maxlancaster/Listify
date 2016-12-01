import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import ConsensusRankingDescription from '../Elements/ConsensusRankingDescription.jsx';
import { withRouter } from 'react-router';
import Items from '../../Models/Items.js'

const uuid = require('uuid');
//TODO: REMOVE WHEN WE HAVE SERVERSIDE WORKING
var Ranking = function(title, author, order, capacity) {
   var that = Object.create(Ranking.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.order = order;
   that.author = author;
   that.capacity = capacity;
   Object.freeze(that);
   return that;
};

//This page allows you to View a consensus ranking
class ViewConsensusRankingPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    this.state = {ranking:null};
  }

  componentWillMount() {
    //TODO: Get consensus ranking with ranking_id, via server request
    var rankingId = this.props.params.id;
    var rankingTitle = "CONSENSUS RANKING"
    var rankingAuthor = "Phillip Ou";
    var order = [Items('Lebron'),Items('Kobe'), Items('Carmelo')];
    var ranking = Ranking(rankingTitle, rankingAuthor, order);
    this.setState({ranking:ranking});
  }

  currentUserIsCreatorOfConsensus() {
    return true;
  }

  //lock consensus
  lockList() {
    console.log("lock!")
  }

  render() {
    const ranking = this.state.ranking;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h1 className = "RankingTitle">{ranking.title}</h1>
            <h2 className = "RankingAuthor">{"created by "+ranking.author}</h2>
            <ViewableItemsList id={1} items = {ranking.order} showRankingNumber = {true}/>
          </div>
      </div>
      {this.currentUserIsCreatorOfConsensus() &&
        <BottomRightButton title = {"Lock"} onClick = {this.lockList.bind(this)}/>
      }
      <ConsensusRankingDescription lock = {true} title = {ranking.title} votes = {25}/>
    </div>
		);
	}
}

export default withRouter(ViewConsensusRankingPage);

import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import RankingNavigationOptions from '../Elements/RankingNavigationOptions.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'

const uuid = require('uuid');
//TODO: REMOVE WHEN WE HAVE SERVERSIDE WORKING
var Ranking = function(title, user, order, capacity) {
   var that = Object.create(Ranking.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.order = order;
   that.user = user;
   that.capacity = capacity;
   Object.freeze(that);
   return that;
};
//This page allows you to View a ranking
class ViewRankingPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    this.state = {ranking:null};
  }

  componentWillMount() {
    //TODO: Get ranking with ranking_id, via server request
    var rankingId = this.props.params.id;
    var rankingTitle = "Test Title"
    var rankingAuthor = "Phillip Ou";
    var order = [Items('Lebron', "fdjklsajflkjioewj. Here's a description"),Items('Kobe'), Items('Carmelo')];
    var ranking = Ranking(rankingTitle, rankingAuthor, order, 8);
    this.setState({ranking:ranking});
  }

  viewConsensus() {
    //GET LIST ID;
    var list_id = this.state.ranking.list;
    var path = "lists/"+list_id+"/consensus";
    this.props.router.push(path);
  }

  render() {
    const ranking = this.state.ranking;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h1 className = "RankingTitle">{ranking.title}</h1>
            <h2 className = "RankingAuthor">{"created by "+ranking.user}</h2>
            <ViewableItemsList id={1} items = {ranking.order} showRankingNumber = {true}/>
          </div>
      </div>
      <RankingNavigationOptions
        editRanking = {this.editRanking.bind(this)}
        viewConsensus = {this.viewConsensus.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewRankingPage);

import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import ConsensusRankingDescription from '../Elements/ConsensusRankingDescription.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'
import listServices from '../../services/listServices.js';

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
    this.state = {list:null, order:[]};
  }

  componentWillMount() {
    //TODO: Get consensus ranking with ranking_id, via server request
    var listId = this.props.params.listId;
    listServices.getListDataFromId(listId).then((res) => {
      var list = res.content.list;
      //TODO: DELETE LATER AFTER WE CALCULATE ORDER WITH ALGORITHM AND SET ORDER HERE
      var order = [Items('Lebron'),Items('Kobe'), Items('Carmelo')];
      this.setState({list:list, order:order});
    });
  }

  //returns null if there isn't one
  getSubmittedRankingId() {
    var current_user = this.props.user;
    // find intersection of list.rankings and current_user.rankings
    var ranking_ids = this.state.lists.rankings.filter(function(ranking) {
      return current_user.rankings.indexOf(ranking) != -1;
    });
    return ranking_ids.length > 0 ? ranking_ids[0] : null;
  }

  currentUserIsCreatorOfConsensus() {
    return true;
  }

  //lock consensus
  lockList() {
      var listId = this.props.params.listId;
      listServices.lockList(listId).then((res) => {
          if (res.success) {
            var list = this.state.list;
            list.locked = true;
            this.setState({list:list});
          } else {
              console.log("unsuccessful lock");
          }
      });
  }

  viewYourRanking() {
    var ranking_id = this.getSubmittedRankingId();
    var path = "rankings/"+ranking_id;
    //TODO: NAVIGATE TO PATH (WITHOUT PUSH)
  }

  render() {
    const list = this.state.list;
    const order = this.state.order;
		return (
      <div>
    			<div className = "EditRankingsPage">
            {list &&
            <div className = "EditRankingRankingList" >
              <h1 className = "RankingTitle">{list.title}</h1>
              <h2 className = "RankingAuthor">{"created by "+list.creator}</h2>
              <ViewableItemsList id={1} items = {order} showRankingNumber = {true}/>
            </div>
            }
        </div>

        {this.currentUserIsCreatorOfConsensus() && list && !list.locked &&
          <BottomRightButton title = {"Lock"} onClick = {this.lockList.bind(this)}/>
        }
        {list &&
          <ConsensusRankingDescription viewYourRanking = {this.viewYourRanking.bind(this)}
                                       lock = {true}
                                       title = {list.title}
                                       votes = {25}
                                       />
        }
    </div>
		);
	}
}

export default withRouter(ViewConsensusRankingPage);

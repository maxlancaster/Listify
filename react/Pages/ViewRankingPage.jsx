import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import RankingNavigationOptions from '../Elements/RankingNavigationOptions.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'
import rankingServices from '../../services/rankingServices.js';

const uuid = require('uuid');

//This page allows you to View a ranking
class ViewRankingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {ranking:null};
  }

  componentWillMount() {
    var rankingId = this.props.params.id;

    rankingServices.getRankingById(rankingId).then((response) => {
      console.log(response);
      var ranking = response.content.ranking;
      if (response.success) {
        this.setState({ranking:ranking});
      } else {
        console.log(response.err);
      }
    });
  }

  viewConsensus() {
    //GET LIST ID;
    var list_id = this.state.ranking.list;
    var path = "lists/"+list_id+"/consensus";
    this.props.router.push(path);
  }

  editRanking() {
    console.log("edit this ranking");
  }

  render() {
    if (this.state.list === '') {
      return null;
    }

    var ranking = this.state.ranking;
    console.log(ranking);

    return (
      <div>
        <div className = "EditRankingsPage">
          {ranking &&
          <div className = "EditRankingRankingList" >


            <div className = "RankingTitleContainer">
              <h1 className = "RankingTitle">{ranking.listTitle}</h1>
            </div>
            <div className = "TitleSecondRow" id = "RankingPageSecondRow">
              <h2 className = "RankingAuthor">{"created by "+ranking.listCreatorUsername}</h2>
            </div>
            <ViewableItemsList id={1} items = {ranking.order} showRankingNumber = {true}/>
          </div>
        }
      </div>
      <RankingNavigationOptions
        editRanking = {this.editRanking.bind(this)}
        viewConsensus = {this.viewConsensus.bind(this)}/>
    </div>
    );
  }
}

export default withRouter(ViewRankingPage);

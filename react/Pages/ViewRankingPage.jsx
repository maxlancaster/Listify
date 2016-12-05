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
    this.state = {
      order : [{}],
      user : '',
      user_id : '',
      list : '',
      comment : ''
    };
  }

  componentWillMount() {
    var rankingId = this.props.params.id;

    rankingServices.getRankingById(rankingId).then((response) => {
      if (response.success) {
        this.setState({
          order : response.content.order,
          user : repsonse.content.user,
          user_id : response.content.user_id,
          list : response.content.list,
          comment : response.content.comment
        });
      } else {
        console.log(repsonse.err);
      }
    });
  }

  viewConsensus() {
    //GET LIST ID;
    var list_id = this.state.list;
    var path = "lists/"+list_id+"/consensus";
    this.props.router.push(path);
  }

  editRanking() {
    console.log("edit this ranking");
  }

  render() {
    console.log(this.state.order);
    if (this.state.list === '') {
      return null;
    }

    return (
      <div>
        <div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <div className = "RankingTitleContainer">
              <h1 className = "RankingTitle">{this.state.title}</h1>
            </div>
            <div className = "TitleSecondRow">
              <h2 className = "RankingAuthor">{"created by "+this.state.user}</h2>
            </div>
            <ViewableItemsList id={1} items = {this.state.order} showRankingNumber = {true}/>
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

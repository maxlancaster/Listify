import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import RankingNavigationOptions from '../Elements/RankingNavigationOptions.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'
import rankingServices from '../../services/rankingServices.js';
import listServices from '../../services/listServices.js';

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
      comment : '',
      title : ''
    };
  }

  componentWillMount() {
    var rankingId = this.props.params.id;

    rankingServices.getRankingById(rankingId).then((response1) => {
      if (response1.success) {
        console.log(response1.content);
        listServices.getListDataFromId(response1.content.ranking.list).then((response2) => {
          if (response2.success) {
            this.setState({
              order : response1.content.ranking.order,
              user : response1.content.ranking.user,
              user_id : response1.content.ranking.user_id,
              list : response1.content.ranking.list,
              comment : response1.content.ranking.comment,
              title : response2.content.list.title
            });
          } else {
            console.log(response2.err);
          }
        });
      } else {
        console.log(response1.err);
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

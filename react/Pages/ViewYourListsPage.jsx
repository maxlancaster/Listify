import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import { withRouter } from 'react-router';
import listServices from '../../services/listServices.js';
import userServices from '../../services/userServices.js';

class ViewYourListsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {lists:[]};
  }

  componentWillMount() {
    listServices.getInvitedLists(this.props.user.username).then((res) => {
      var lists = res.content.lists;
      this.setState({lists:lists});
    });
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("lists/create");
  }

  didSwitchHeader(headerSide) {
    if (headerSide === "LEFT") {
      console.log("fetch your ranks");
    } else {
      userServices.updateLastViewedInvitationsDate().then((res) => {
        console.log(res);
      });
      console.log("fetch lists you're invited to");
    }
    //TODO: ISSUE GET REQUEST TO UPDATE LIST
  }

  determineCorrectPathForUser(list) {
    var current_user = this.props.user;
    var is_creator_of_list = current_user.lists.indexOf(list._id) > -1;

    // find intersection of list.rankings and current_user.rankings
    var ranking_ids = list.rankings.filter(function(ranking) {
      return current_user.rankings.indexOf(ranking) != -1;
    });
    var has_submitted_ranking_for_list = ranking_ids.length > 0;
    //TODO:DELETE LATER;
    ranking_ids = ["boom_bang"];
    if (has_submitted_ranking_for_list) {
      return "rankings/"+ranking_ids[0];
    } else {
      return "rankings/edit/"+list._id;
    }
  }

  didClickOnListCard(list) {
    var path = this.determineCorrectPathForUser(list);
    this.props.router.push(path);
  }

  render() {
    const lists = this.state.lists;
		return (
      <div>
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <div className = "RankingTitleContainer">
              <SwitchableHeader leftTitle = "Your Lists"
                                rightTitle = "Lists Invited To"
                                didSwitchHeader = {this.didSwitchHeader.bind(this)}
              />
            <h2 className = "InviteNumber">{"("+3+")"}</h2>
            </div>
            <ViewableList id={1}
                          lists = {lists}
                          showRankingNumber = {false}
                          didClickOnListCard = {this.didClickOnListCard.bind(this)}
                          />
          </div>
      </div>
      <BottomRightButton title = {"Create Ranking"} onClick = {this.navigateToCreateRankingsPage.bind(this)}/>
    </div>
		);
	}
}

export default withRouter(ViewYourListsPage);

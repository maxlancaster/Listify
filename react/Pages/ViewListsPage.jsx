import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import SearchableNavbar from '../Elements/SearchableNavbar.jsx';
import { withRouter } from 'react-router';
import listServices from '../../services/listServices.js';

class ViewListsPage extends Component {
  constructor(props) {
    super(props);
    //LOAD COMPLETED CONSENSUSES ONTO COMPLETED RANKINGS
    this.state = {lists:[]};
  }

  componentWillMount() {
    this.props.showNavbar(false);
    listServices.getTrendingLists().then((res) => {
      var lists = res.content.lists;
      this.setState({lists:lists});
    });
  }

  componentWillUnmount() {
    this.props.showNavbar(true);
  }

  //navigate to create rankings page
  navigateToCreateRankingsPage() {
    this.props.router.push("lists/create");
  }

  didSwitchHeader(headerSide) {
    if (headerSide === "LEFT") {
      listServices.getTrendingLists().then((res) => {
        var lists = res.content.lists;
        this.setState({lists:lists});
      });
    } else {
      listServices.getMostRecentLists().then((res) => {
        console.log(res);
        var lists = res.content.lists;
        this.setState({lists:lists});
      });
    }
    //TODO: ISSUE GET REQUEST TO UPDATE LIST
  }


  determineCorrectPathForUser(list) {
    var current_user = this.props.user;
    var is_creator_of_list = current_user.lists.indexOf(list._id) > -1;

    // find intersection of list.rankings and current_user.rankings

    console.log("current user rankings");
    console.log(current_user.rankings);

    console.log("list rankings");
    console.log(list.rankings);

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

  searchLists(searchString) {
    var path = "/lists/search/"+searchString;
    this.props.router.push(path);
  }

  didClickOnListCard(list) {
    var path = this.determineCorrectPathForUser(list);
    this.props.router.push(path);
  }

  render() {
    const lists = this.state.lists;
		return (
      <div>
        <SearchableNavbar
            logout = {this.props.logout}
            profile = {this.props.profile}
            searchLists = {this.searchLists.bind(this)}
            />
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <SwitchableHeader leftTitle = "Trending"
                              rightTitle = "Most Recent"
                              didSwitchHeader = {this.didSwitchHeader.bind(this)}
            />
          <ViewableList id={1}
                        lists = {this.state.lists}
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

export default withRouter(ViewListsPage);

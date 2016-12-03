import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableList from '../Elements/ViewableList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import SwitchableHeader from '../Elements/SwitchableHeader.jsx';
import { withRouter } from 'react-router';
import listServices from '../../services/listServices.js';

const uuid = require('uuid');


//TODO: remove later
var List = function(title, description, photo) {
   var that = Object.create(List.prototype);
   that._id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class ViewListsPage extends Component {
  constructor(props) {
    super(props);
    //LOAD COMPLETED CONSENSUSES ONTO COMPLETED RANKINGS
    this.state = {lists:[]};
  }

  componentWillMount() {
    listServices.getTrendingLists().then((res) => {
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
    console.log(list);
    return "rankings/edit/"+list._id;
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

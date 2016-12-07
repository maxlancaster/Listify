import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Vote from '../Vote.jsx'
import listServices from '../../../services/listServices.js';

class StaticListCard extends Component {

  constructor(props) {
    super(props);
    this.state = {list : props.list,
                  currentUserVoteScore : 0};
  }

  handleClick(event) {
    this.props.didClickOnListCard(this.state.list);
    return true;
  }

  handleUpvote(event) {
      // var listId = this.props.list._id;
      var currentUserVoteScore = this.state.currentUserVoteScore;

      if (this.state.currentUserVoteScore ===  -1) {
          this.setState({currentUserVoteScore: currentUserVoteScore + 2});
        // listServices.removeVote(listId, "downvote").then((res) => {
        //   listServices.upvote(listId).then((response) => {
        //       console.log(this.props.list.upvotes);
        //   });
        // });
      } else if (this.state.currentUserVoteScore === 0) {
          this.setState({currentUserVoteScore: currentUserVoteScore + 1});
          // listServices.upvote(listId).then((response) => {
          //     console.log(this.props.list.upvotes);
          // });
      } else if (this.state.currentUserVoteScore === 1) {
          //hitting upvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore : 0});
          // listServices.removeVote(listId, "upvote").then((res) => {
          //     listServices.upvote(listId).then((response) => {
          //         console.log(this.props.list.upvotes);
          //     });
          // });
      }
      // console.log(this.props.list.upvotes);
  }

  handleDownvote(event) {
      // var listId = this.props.params.listId;
      var currentUserVoteScore = this.state.currentUserVoteScore;

      if (this.state.currentUserVoteScore ===  -1) {
          //hitting downvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore:0});
          // listServices.removeVote(listId, "downvote").then((res) => {
          //     listServices.upvote(listId).then((response) => {
          //     });
          // });
      } else if (this.state.currentUserVoteScore === 0) {
          this.setState({currentUserVoteScore: currentUserVoteScore - 1});
          // listServices.upvote(listId).then((response) => {
          // });
      } else if (this.state.currentUserVoteScore === 1) {
          //hitting upvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore : currentUserVoteScore - 2});
          // listServices.removeVote(listId, "upvote").then((res) => {
          //     listServices.upvote(listId).then((response) => {
          //     });
          // });
      }
  }

  render() {
		const { list } = this.props;
    //when user clicks on a list, you navigate him to EditRankingsPage if he hasn't voted yet
    // else you navigate him to ViewRankingPage
    var upvoteColor = list.upvotes > 0 ? "#66B110" : "#E52F4F";
    var upvoteStyle = {
      color:upvoteColor
    };
		return (
      <a href = "#" onClick = {this.handleClick.bind(this)}>
        <div className = "StaticListCard" >
          <Vote
              currentUserVoteScore = {this.state.currentUserVoteScore}
              handleUpvote = {this.handleUpvote.bind(this)}
              handleDownvote = {this.handleDownvote.bind(this)}/>
          <div className = "StaticListCardFirstLineContainer">
            {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
            <p className = "StaticListCardTitle">{list.title}</p>
            {list.upvotes !== 0 &&
              <p className = "StaticListCardUpvotes" style = {upvoteStyle}>{"+10"}</p>
            }
          </div>
          <p className = "StaticListCardCreator">{"Created by "+list.creator}</p>
            {list.locked &&
              <div className="LockedListMarker"></div>
            }
        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

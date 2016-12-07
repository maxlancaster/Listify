import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Vote from '../Vote.jsx'
import listServices from '../../../services/listServices.js';

class StaticListCard extends Component {

  constructor(props) {
    super(props);
    var currentUserVoteScore = this.calculateCurrentUserVoteScore(props.list,props.user_id);
    this.state = {list : props.list,
                  currentUserVoteScore : currentUserVoteScore,
                  upvotes: props.list.upvotes};
  }

  calculateCurrentUserVoteScore(list, user_id) {
    if (list.upvoters.indexOf(user_id) > -1) {
      return 1;
    } else if (list.downvoters.indexOf(user_id) > -1) {
      return -1;
    }
    return 0;
  }

  handleClick(event) {
    this.props.didClickOnListCard(this.state.list);
    return true;
  }

  handleUpvote(event) {
      var listId = this.props.list._id;
      var currentUserVoteScore = this.state.currentUserVoteScore;
      var upvotes = this.state.upvotes;

      if (this.state.currentUserVoteScore ===  -1) {
          this.setState({currentUserVoteScore: currentUserVoteScore + 2, upvotes:upvotes+2 });
      } else if (this.state.currentUserVoteScore === 0) {
          this.setState({currentUserVoteScore: currentUserVoteScore + 1, upvotes:upvotes+1});
      } else if (this.state.currentUserVoteScore === 1) {
          //hitting upvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore : 0, upvotes:upvotes - 1});
      }
      listServices.upvote(listId).then((res) => {
        console.log(res);
      });
      // console.log(this.props.list.upvotes);
  }

  handleDownvote(event) {
      var listId = this.props.list._id;
      var currentUserVoteScore = this.state.currentUserVoteScore;
      var upvotes = this.state.upvotes;

      if (this.state.currentUserVoteScore ===  -1) {
          //hitting downvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore:0, upvotes:upvotes+1});
      } else if (this.state.currentUserVoteScore === 0) {
          this.setState({currentUserVoteScore: currentUserVoteScore - 1, upvotes:upvotes-1});
      } else if (this.state.currentUserVoteScore === 1) {
          //hitting upvote again returns currentUserVoteScore to 0
          this.setState({currentUserVoteScore : currentUserVoteScore - 2, upvotes:upvotes-2});
      }
      listServices.downvote(listId).then((res) => {
        console.log(res);
      });
  }

  render() {
		const { list } = this.props;
    console.log(this.state.currentUserVoteScore);
    //when user clicks on a list, you navigate him to EditRankingsPage if he hasn't voted yet
    // else you navigate him to ViewRankingPage
		return (
      <a href = "#" onClick = {this.handleClick.bind(this)}>
        <div className = "StaticListCard" >
          <Vote
              upvotes = {this.state.upvotes}
              currentUserVoteScore = {this.state.currentUserVoteScore}
              handleUpvote = {this.handleUpvote.bind(this)}
              handleDownvote = {this.handleDownvote.bind(this)}/>
          <div className = "StaticListCardFirstLineContainer">
            {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
            <p className = "StaticListCardTitle">{list.title}</p>
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

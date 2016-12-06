import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Vote from '../Vote.jsx'
import listServices from '../../services/listServices.js';

class StaticListCard extends Component {

  constructor(props) {
    super(props);
    this.state = {list : props.list,
                  voteScore : props.voteScore};
  }

  handleClick(event) {
    this.props.didClickOnListCard(this.state.list);
    return true;
  }

  handleUpvote(event) {
      var listId = this.props.params.listId;
      var voteScore = this.state.voteScore;

      if (this.state.voteScore ===  -1) {
          this.setState({voteScore: voteScore + 2});
        listServices.removeVote(listId, "downvote").then((res) => {
          listServices.upvote(listId).then((response) => {
          });
        });
      } else if (this.state.voteScore === 0) {
          this.setState({voteScore: voteScore + 1});
          listServices.upvote(listId).then((response) => {
          });
      } else if (this.state.voteScore === 1) {
          //hitting upvote again returns voteScore to 0
          this.setState({voteScore : 0});
          listServices.removeVote(listId, "upvote").then((res) => {
              listServices.upvote(listId).then((response) => {
              });
          });
      }
  }

  handleDownvote(event) {
      var listId = this.props.params.listId;
      var voteScore = this.state.voteScore;

      if (this.state.voteScore ===  -1) {
          //hitting downvote again returns voteScore to 0
          this.setState({voteScore:0});
          listServices.removeVote(listId, "downvote").then((res) => {
              listServices.upvote(listId).then((response) => {
              });
          });
      } else if (this.state.voteScore === 0) {
          this.setState({voteScore: voteScore - 1});
          listServices.upvote(listId).then((response) => {
          });
      } else if (this.state.voteScore === 1) {
          //hitting upvote again returns voteScore to 0
          this.setState({voteScore : voteScore - 2});
          listServices.removeVote(listId, "upvote").then((res) => {
              listServices.upvote(listId).then((response) => {
              });
          });
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
          {list.locked &&
            <div className="CircleMarker"></div>
          }
          <Vote
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

        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

import React, { Component } from 'react';
import { withRouter } from 'react-router';


class ConsensusRankingDescription extends Component {

  render() {
    console.log(this.props.title);
    var isLocked = this.props.lock;
    var description = "This is the consensus ranking for "+ this.props.title +" according to "+this.props.votes+" votes.";
    if (isLocked) {
      description += " Voting has finished for this list."
    }
		return (
      <div className = "ConsensusRankingDescription">
        <p>{description}</p>
        <button onClick = {this.props.viewYourRanking}>View Your Ranking</button>
      </div>
    );
  }
}

export default withRouter(ConsensusRankingDescription);

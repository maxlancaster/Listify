import React, { Component } from 'react';
import { withRouter } from 'react-router';


class ConsensusRankingDescription extends Component {

  render() {
    var isLocked = this.props.lock;
    var description = "This is the consensus ranking for "+ this.props.title +" according to "+this.props.votes+" votes.";
    var buttonText = this.props.already_submitted ? "View Your Ranking" : "Submit a Ranking";

    var viewOrSubmitRankingFunction = this.props.already_submitted ? this.props.viewYourRanking : this.props.submitRanking;

    if (isLocked) {
      description += " Voting has finished for this list."
    }
		return (
      <div className = "ConsensusRankingDescription">
        <p>{description}</p>
        {
          <button onClick = {viewOrSubmitRankingFunction}>{buttonText}</button>
        }
        {this.props.showAddItems && !isLocked &&
          <button onClick = {this.props.addNewItems}>Add New Items</button>
        }
      </div>
    );
  }
}

export default withRouter(ConsensusRankingDescription);

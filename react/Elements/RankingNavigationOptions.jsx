import React, { Component } from 'react';
import { withRouter } from 'react-router';


class RankingNavigationOptions extends Component {

  render() {
  		var is_unlocked = this.props.editRanking;
		return (
      <div className = "RankingNavigationOptions">
        <p>{"This was your ranking for this list"}</p>
        <button onClick = {this.props.viewConsensus}>View Consensus</button>
        {is_unlocked && <button onClick = {this.props.editRanking}>Edit Ranking</button>}
      </div>
    );
  }
}

export default withRouter(RankingNavigationOptions);

import React, { Component } from 'react';
import { withRouter } from 'react-router';


class RankingNavigationOptions extends Component {

  render() {
		return (
      <div className = "RankingNavigationOptions">
        <p>{"This was your ranking for this list"}</p>
        <button onClick = {this.props.viewConsensus}>View Consensus</button>
        <button onClick = {this.props.editRanking}>Edit Ranking</button>
      </div>
    );
  }
}

export default withRouter(RankingNavigationOptions);

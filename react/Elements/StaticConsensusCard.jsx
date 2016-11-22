import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticConsensusCard extends Component {

  render() {
		const { consensus } = this.props;
		return (
        <div className = "ItemCard" style={style}>
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "ItemCardTitle">{consensus.title}</p>
          <p className = "ItemCardTitle">{consensus.description}</p>
        </div>
    );
  }
}

export default withRouter(StaticConsensusCard);

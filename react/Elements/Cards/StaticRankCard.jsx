import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticRankCard extends Component {

  render() {
		const { rank } = this.props;

		return (
      <a href="#">
        <div className = "StaticListCard" >
          {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "StaticListCardTitle">{rank.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticRankCard);

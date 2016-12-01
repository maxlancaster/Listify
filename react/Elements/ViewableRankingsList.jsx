import React, { Component } from 'react';
import update from 'react/lib/update';
import StaticRankCard from './Cards/StaticRankCard.jsx';
import { withRouter } from 'react-router';

class ViewableRankingsList extends Component {
  constructor(props) {
		super(props);
		this.state = { ranks: props.ranks };
	}

	render() {
		const { ranks } = this.state;
		return (
        <div>
          {ranks.map((rank, index) => {
            return (
              <StaticRankCard
                key={rank.id}
                index={index}
                listId={this.props.id}
                rank={rank}
                canEdit = {false}
                showRankingNumber = {this.props.showRankingNumber}/>
            );
          })}
      </div>
		);
  }
}

export default withRouter(ViewableRankingsList);

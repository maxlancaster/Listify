import React, { Component } from 'react';
import update from 'react/lib/update';
import StaticItemCard from './StaticItemCard.jsx';
import { withRouter } from 'react-router';

class ViewableList extends Component {
  constructor(props) {
		super(props);
		this.state = { cards: props.list };
	}

	render() {
		const { cards } = this.state;
		return (
        <div>
          {cards.map((card, index) => {
            return (
              <StaticItemCard
                key={card.id}
                index={index}
                listId={this.props.id}
                item={card}
                canEdit = {false}
                showRankingNumber = {this.props.showRankingNumber}/>
            );
          })}
      </div>
		);
  }
}

export default withRouter(ViewableList);

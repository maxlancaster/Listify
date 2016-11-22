import React, { Component } from 'react';
import update from 'react/lib/update';
import StaticItemCard from './StaticItemCard.jsx';
import { withRouter } from 'react-router';

class ViewableList extends Component {
  constructor(props) {
		super(props);
		this.state = { items: props.list };
	}

	render() {
		const { items } = this.state;
		return (
        <div>
          {items.map((item, index) => {
            return (
              <StaticItemCard
                key={item.id}
                index={index}
                listId={this.props.id}
                item={item}
                canEdit = {false}
                showRankingNumber = {this.props.showRankingNumber}/>
            );
          })}
      </div>
		);
  }
}

export default withRouter(ViewableList);

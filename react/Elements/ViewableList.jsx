import React, { Component } from 'react';
import update from 'react/lib/update';
import StaticListCard from './StaticListCard.jsx';
import { withRouter } from 'react-router';

class ViewableList extends Component {
  constructor(props) {
		super(props);
		this.state = { lists: props.lists };
	}

	render() {
		const { lists } = this.state;
		return (
        <div>
          {lists.map((list, index) => {
            return (
              <StaticListCard
                key={list.id}
                index={index}
                listId={this.props.id}
                item={list}
                canEdit = {false}
                showRankingNumber = {this.props.showRankingNumber}/>
            );
          })}
      </div>
		);
  }
}

export default withRouter(ViewableList);

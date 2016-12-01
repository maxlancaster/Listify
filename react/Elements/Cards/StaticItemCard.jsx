import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticListCard extends Component {

  render() {
		const { item } = this.props;

		return (
      <a href="#">
        <div className = "ItemCard" >
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "ItemCardTitle">{item.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

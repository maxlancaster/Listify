import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticListCard extends Component {

  render() {
		const { list } = this.props;

		return (
      <a href="#">
        <div className = "StaticListCard" >
          {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "StaticListCardTitle">{list.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

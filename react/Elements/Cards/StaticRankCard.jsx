import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticRankCard extends Component {

  //TODO: Implement this
  listIsLocked() {
    return false;
  }

  render() {
		const { rank } = this.props;

		return (
      <a href="#">
        <div className = "StaticListCard" >
          {this.listIsLocked() &&
            <div className="CircleMarker"></div>
          }
          <div className = "StaticListCardFirstLineContainer">
            {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
            <p className = "StaticListCardTitle">{rank.title}</p>
          </div>
          <p className = "StaticListCardCreator">{"Created by "+rank.user}</p>
        </div>
      </a>
    );
  }
}

export default withRouter(StaticRankCard);

import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticListCard extends Component {

  render() {
		const { list } = this.props;
    //when user clicks on a list, you navigate him to EditRankingsPage if he hasn't voted yet
    // else you navigate him to ViewRankingPage
    var link = "#";
		return (
      <a href={link}>
        <div className = "StaticListCard" >
          {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "StaticListCardTitle">{list.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

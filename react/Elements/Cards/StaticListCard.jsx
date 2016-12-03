import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticListCard extends Component {

    constructor(props) {
      super(props);
      this.state = {list : props.list};
    }


  determineCorrectPathForUser() {
    return "rankings/edit/"+this.state.list._id;
  }

  render() {
		const { list } = this.props;
    //when user clicks on a list, you navigate him to EditRankingsPage if he hasn't voted yet
    // else you navigate him to ViewRankingPage
    var path = this.determineCorrectPathForUser();
		return (
      <a href={path}>
        <div className = "StaticListCard" >
          {this.props.showRankingNumber && <p className = "StaticListCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "StaticListCardTitle">{list.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticListCard);

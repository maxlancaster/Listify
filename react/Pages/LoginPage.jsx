import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import UsernameForm from '../Elements/UsernameForm.jsx';
import { DragDropContext } from 'react-dnd';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], i:0, rankingTitle:''};
  }
  addItem(itemTitle) {
    var items = this.state.items;
    var item = Item(itemTitle,'','');
    items.push(item);
    this.setState({items:items});
  }

  didChangeRankingTitle(rankingTitle) {
    this.setState({rankingTitle:rankingTitle});
  }

  createRanking() {
    const rankingTitle = this.state.rankingTitle;
    const items = this.state.items;
    //TODO: Create Ranking and Consensus Ranking here
  }

  render() {
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

    const items = this.state.items;

		return (
      <div>
        <UsernameForm placeholder={"Username"} />
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

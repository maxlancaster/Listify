import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import Item from '../../models/Item.js';
import { DragDropContext } from 'react-dnd';


class CreateRankingsPage extends Component {
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
      <div style={style}>
        <RankingTitleForm placehodler={"Name of ranking"} didChangeRankingTitle = {this.didChangeRankingTitle.bind(this)} />
        <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
        <OptionsList id={1} list={items} canEdit = {true} />
        <BottomRightButton onClick = {this.createRanking.bind(this)}/>
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

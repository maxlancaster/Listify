import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import EditRankingsPage from './EditRankingsPage.jsx';

const uuid = require('uuid');

//TEMPORARY
var Item = function(title, description, photo) {
   var that = Object.create(Item.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

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

  //TODO: NAVIGATE TO EDITRANKINGPAGE
  navigateToEditRanking() {
    if (this.state.items.length !== 0 && this.state.rankingTitle !== '') {
      // return  <EditRankingsPage data={this.state} />;
      var this_state = this.state;
      this.props.router.push({
        pathname : '/rankings/edit',
        state : this_state
      });
    }
  }

  render() {
    const style = {
      backgroundColor: "white"
    };

    const items = this.state.items;

		return (
      <div>
        <RankingTitleForm placeholder={"Name of ranking"} didChangeRankingTitle = {this.didChangeRankingTitle.bind(this)} />
        <div className = "AddItemForm">
          <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
        </div>
        <div className = "CreateRankingsOptionsList">
          <OptionsList style = {style}  id={1} list={items} canEdit = {true} style={style}/>
        </div>
        <BottomRightButton onClick = {this.navigateToEditRanking.bind(this)}/>
      </div>
		);
	}
}

export default withRouter(DragDropContext(HTML5Backend)(CreateRankingsPage));

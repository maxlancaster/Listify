import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import Navbar from '../Elements/Navbar.jsx';
import { DragDropContext } from 'react-dnd';

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
    this.state = {items: [], i:0, rankingTitle:'', showCreateRankingConfirm: false};
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

  showCreateRankingConfirm() {
    this.setState({showCreateRankingConfirm: true})
  }

  closeCreateRankingConfirm() {
    this.setState({showCreateRankingConfirm: false})
  }

  createRanking() {
    const rankingTitle = this.state.rankingTitle;
    const items = this.state.items;
    //TODO: Create Ranking and Consensus Ranking here
  }

  render() {
    const style = {
      backgroundColor: "white"
    };

    const items = this.state.items;

		return (
      <div>
        <Navbar />
          {
            this.state.showCreateRankingConfirm &&
            <ConfirmAlertView
              showModal = {this.state.showCreateRankingConfirm}
              onClose = {this.closeCreateRankingConfirm.bind(this)}
              title = {"Would you like to publish this ranking?"}
              link = {"https://listify.com/list/fdjp493q8jf9e8jffJ98905OJFDSFFfdsjkldsj409j34o34"}
            />
        }
        <RankingTitleForm placeholder={"Name of ranking"} didChangeRankingTitle = {this.didChangeRankingTitle.bind(this)} />
        <div className = "AddItemForm">
          <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
        </div>
        <div className = "CreateRankingsOptionsList">
          <OptionsList style = {style}  id={1} list={items} canEdit = {true} style={style}/>
        </div>
        <BottomRightButton onClick = {this.showCreateRankingConfirm.bind(this)}/>
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

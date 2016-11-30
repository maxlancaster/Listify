import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import Navbar from '../Elements/Navbar.jsx';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import EditRankingsPage from './EditRankingsPage.jsx';
import SetListCapacityPopupView from '../Elements/PopupViews/SetListCapacityPopupView.jsx';

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

class CreateListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], i:0, rankingTitle:'', showPopup:false};
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

  createListWithCapacity(capacity) {
    const listTitle = this.state.rankingTitle;
    const items = this.state.items;

    //TODO: Create List Here and navigate to EditRankingsPage
    console.log(capacity);
  }
  navigateToEditRanking() {
    if (this.state.items.length !== 0 && this.state.rankingTitle !== '') {
      var this_state = this.state;
      this.props.router.push({
        pathname : '/rankings/edit',
        state : this_state
      });
    }

  }


  showCapacityPopup() {
    this.setState({showPopup:true});
  }

  closePopup() {
    this.setState({showPopup:false});
  }

  render() {
    const style = {
      backgroundColor: "white"
    };

    const items = this.state.items;

		return (
      <div>

        {
          this.state.showPopup &&
          <SetListCapacityPopupView
            onClose = {this.closePopup.bind(this)}
            createListWithCapacity = {this.createListWithCapacity.bind(this)}
          />
      }



        <RankingTitleForm placeholder={"Name of List"} didChangeRankingTitle = {this.didChangeRankingTitle.bind(this)} />
        <div className = "AddItemForm">
          <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
        </div>
        <div className = "CreateRankingsOptionsList">
          <OptionsList style = {style}  id={1} items={items} canEdit = {true} style={style}/>
        </div>
        <BottomRightButton onClick = {this.showCapacityPopup.bind(this)}/>
      </div>
		);
	}
}

export default withRouter(DragDropContext(HTML5Backend)(CreateListPage));

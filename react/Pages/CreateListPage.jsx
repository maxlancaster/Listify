import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import Navbar from '../Elements/Navbar.jsx';
import InviteUsersPanel from '../Elements/InviteUsersPanel.jsx';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import EditRankingsPage from './EditRankingsPage.jsx';
import SetListCapacityPopupView from '../Elements/PopupViews/SetListCapacityPopupView.jsx';
import Items from '../../Models/Items.js'

class CreateListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], i:0, rankingTitle:'', publicList: true, showPopup:false};
  }
  addItem(itemTitle) {
    var items = this.state.items;
    var item = Items(itemTitle,'','');
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

  changePrivacySetting() {
    var isPublic = this.state.publicList;
    this.setState({publicList:!isPublic});
  }

  render() {
    const items = this.state.items;
    const publicPrivateIndicator = (
        <div className = "PublicPrivateIndicator">
          <h3>|</h3>
          <button onClick = {this.changePrivacySetting.bind(this)}>
              {this.state.publicList ? "UnlockImage" : "LockImage"}
          </button>
          <h3>{this.state.publicList ? "Public" : "Private"}</h3>
        </div>
    );

		return (
      <div>
        {this.state.showPopup &&
            <SetListCapacityPopupView
              onClose = {this.closePopup.bind(this)}
              createListWithCapacity = {this.createListWithCapacity.bind(this)}
            />
        }
        {!this.state.publicList &&
          <InviteUsersPanel />
        }

        <RankingTitleForm placeholder={"Name of List"} didChangeRankingTitle = {this.didChangeRankingTitle.bind(this)} />
        {publicPrivateIndicator}
        <div className = "AddItemForm">
          <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
        </div>
        <div className = "CreateListOptionsList">
          <OptionsList  id={1} items={items} canEdit = {true} />
        </div>
        <BottomRightButton onClick = {this.showCapacityPopup.bind(this)}/>
      </div>
		);
	}
}

export default withRouter(DragDropContext(HTML5Backend)(CreateListPage));

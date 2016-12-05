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
import CreateListPopupView from '../Elements/PopupViews/CreateListPopupView.jsx';
import Items from '../../models/Items.js'
import listServices from '../../services/listServices.js';
import userServices from '../../services/userServices.js';

class CreateListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], invitedUsers:[], i:0, rankingTitle:'', publicList: true, showPopup:false};
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

  createList(capacity, description) {
    const listTitle = this.state.rankingTitle;
    const items = this.state.items;
    const maxLength = capacity;
    const listDescription = description;
    listServices.createList(
        {
          title : listTitle,
          items : items,
          isPublic : this.state.publicList,
          maxLength : maxLength,
          description : listDescription

        }
      ).then((res) => {
        if (res.success){
              this.closePopup();
              // navigate to edit page for creator to submit a Ranking
              // uncomment when /rankings/edit/:listId isn't broken!!
              var pathname = '/rankings/edit/' + res.content._id;
              var data = res.content;
              this.props.router.push({
                pathname : pathname,
                state : { data }
              });
            } else {
              console.log("Error on submitOriginalRanking: ",res.err)
        }
      });

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

  updateInvitedUsers(invitedUsers) {
    this.setState({invitedUsers:invitedUsers});
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
            <CreateListPopupView
              onClose = {this.closePopup.bind(this)}
              title = {this.state.rankingTitle}
              createList = {this.createList.bind(this)}
              itemsCount = {items.length}
            />
        }
        {!this.state.publicList &&
          <InviteUsersPanel updateInvitedUsers = {this.updateInvitedUsers.bind(this)}/>
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

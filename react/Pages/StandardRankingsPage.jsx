import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import rankingServices from '../../services/rankingServices.js';

const uuid = require('uuid');

class EditRankingsPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    var data = [] //props.location.state;
    var rankingTitle = 'test' //data.rankingTitle;
    var rankingAuthor = "Phillip Ou";
    var items = [] //data.items;
    var copy_items = [] //items.slice(0);
    var ranking = {order:{}, items:items, title:rankingTitle, author:rankingAuthor}; //props.ranking;
    this.state = {ranking: ranking, order: [], showCreateRankingConfirm: false, originalItems: copy_items};
  }

    componentWillMount() {
      rankingServices.getEditPage();
      // ToDO : populate the state for this page using data from the consensus

      // rankingServices.populateStandardRankingPage().then((res) => {
      //   if (res.success) {
      //     console.log("success!");
      //   } else {
      //     console.log("Error on populateStandardRankingPage: ", res.err);
      //   }
      // });
    }

    submitOriginalRanking() {
      rankingServices.submitOriginalRanking(
        {
          title : this.state.ranking.title,
          all_items : this.state.originalItems,
          submitted_items : this.state.order
        }
      ).then((res) => {
        if (res.success){
                console.log("success!");
            } else {
                console.log("Error on submitOriginalRanking: ",res.err)
        }
        this.showShareDialog();
      });
    }

    showShareDialog() {
      this.setState({showCreateRankingConfirm: true})
    }

    closeShareDialog() {
      this.setState({showCreateRankingConfirm: false})
    }

  render() {
    const options = this.state.options;
		return (
      <div>
        {
          this.state.showCreateRankingConfirm &&
          <ConfirmAlertView
            showModal = {this.state.showCreateRankingConfirm}
            onClose = {this.closeShareDialog.bind(this)}
            title = {"Share this ranking"}
            link = {"https://listify.com/list/fdjp493q8jf9e8jffJ98905OJFDSFFfdsjkldsj409j34o34"}
          />
      }
  			<div className = "EditRankingsPage">
          <div className = "EditRankingRankingList" >
            <h1 className = "RankingTitle">{this.state.ranking.title}</h1>
            <h2 className = "RankingAuthor">{"created by "+this.state.ranking.author}</h2>
            <RankingList id={1} list = {this.state.order} canEdit = {false} />
          </div>
          <div className = "EditRankingOptionsList" >
            <h1 className = "OptionsListTitle"> Options</h1>
            <OptionsList  id={2} list={this.state.ranking.items} canEdit = {false} defaultBackGroundColor = {"FAF9F9"} />
          </div>
  			</div>
        <BottomRightButton onClick = {this.submitOriginalRanking.bind(this)}/>
      </div>
		);
	}

  finishEdittingRanking() {
    console.log(this.state.order);
  }
}

export default DragDropContext(HTML5Backend)(EditRankingsPage);

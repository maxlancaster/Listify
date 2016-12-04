import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import listServices from '../../services/listServices.js';

const uuid = require('uuid');

class EditRankingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // data.title,
      creator: '', //data.creator,
      items: [], //data.items || [],
      rankings: [], //data.rankings,
      isPublic: false, //data.isPublic,
      upvotes : 0, //data.upvotes,
      locked: false, //data.locked,
      maxLength : 5, //data.maxLength,
      usersSharedWith : [], //data.usersSharedWith,
      description: '',
      showCreateRankingConfirm : false,
      submission: []
    }
  }

    componentWillMount() {
      // var request = this.props.rankingServices.loadEditPage(this.props.params.consensusID);
      // this.props.updateEditPage(request);

      listServices.getListDataFromId(this.props.params.listId).then((response) => {
        console.log(response);
        if (response.success) {
          this.setState({
            title : response.content.list.title,
            creator: response.content.list.creator,
            items: response.content.list.items,
            rankings: response.content.list.rankings,
            isPublic: response.content.list.isPublic,
            upvotes : response.content.list.upvotes,
            locked: response.content.list.locked,
            maxLength : response.content.list.maxLength,
            usersSharedWith : response.content.list.usersSharedWith,
            description: ''
          });
        } else {
          console.log("error");
        }
      })
    }

    submitRanking() {
      console.log("submit");
      console.log(this.state.submission);

      //TODO : submit Ranking to the associated List
    }

    showShareDialog() {
      this.setState({showCreateRankingConfirm: true})
    }

    closeShareDialog() {
      this.setState({showCreateRankingConfirm: false})
    }

    render() {
      if (this.state.items.length === 0) {
        return null;
      }
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
              <div className = "RankingTitleContainer">
                <h1 className = "RankingTitle">{this.state.title}</h1>
                <h1 className = "RankingLimit"> {" | Top "+this.state.maxLength}</h1>
              </div>
              <h2 className = "RankingAuthor">{"created by "+this.state.creator}</h2>
              <RankingList id={1}
                           items = {this.state.submission}
                           canEdit = {false}
                           showStandbyCard = {true}
                           maxLength = {this.state.maxLength}/>
            </div>
            <div className = "EditRankingOptionsList" >
              <h1 className = "OptionsListTitle"> Options</h1>
              <OptionsList  id={2} items={this.state.items} canEdit = {false} defaultBackGroundColor = {"FAF9F9"} />
            </div>
          </div>
          <BottomRightButton onClick = {this.submitRanking.bind(this)}/>
        </div>
      );
    }

    finishEdittingRanking() {
      // console.log(this.state.order);
    }
  }

export default DragDropContext(HTML5Backend)(EditRankingsPage);

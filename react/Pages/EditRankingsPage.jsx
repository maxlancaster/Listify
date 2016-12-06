import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import CommentsList from '../Elements/CommentsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import CommentPopupView from '../Elements/PopupViews/CommentPopupView.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import listServices from '../../services/listServices.js';
import rankingServices from '../../services/rankingServices.js';
import Comment from '../../models/Comment.js';

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
      maxLength : 0, //data.maxLength,
      usersSharedWith : [], //data.usersSharedWith,
      description: '',
      showCreateRankingConfirm : false,
      submission: [],
      comment : '',
      showComments : false,
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

      var order = []
      var listId = this.props.params.listId;
      // var user = req.session.user.username;
      // var user_id = req.session.user._id;
      var comment = this.state.comment;
      // description, id, photo, title
      this.state.submission.forEach(function(item, index) {
        var itemCopy = item;
        itemCopy.rank = index+1;
        order.push(itemCopy); // start indexing at 1
      });

      rankingServices.submitRanking(
        {
          order : order,
          list : listId,
          comment : comment,
          listTitle:this.state.title,
          listCreatorUsername:this.state.creator
        }
      ).then((response) => {
        if (response.success) {
          this.props.router.push("/");
        } else {
          console.log("failed to submit ranking.");
        }
      });

      //TODO : submit Ranking to the associated List
    }

    showShareDialog() {
      this.setState({showCreateRankingConfirm: true})
    }

    closeShareDialog() {
      this.setState({showCreateRankingConfirm: false})
    }

    commentClicked() {
      if (!this.state.comment) {
        this.setState({showComments:true});
      }
    }

    closePopup() {
      this.setState({showComments:false});
    }

    comment(text) {
      this.closePopup();
      console.log("CREATOR");
      console.log(this.state.creator);
      var comment = new Comment(text,this.state.creator);
      this.setState({comment:comment});
    }

    render() {
      if (this.state.items.length === 0) {
        return null;
      }
      var hasCommented = this.state.comment && this.state.comment.text.length > 0;
      var commentButtonTitle = hasCommented > 0 ? "Commented Already" : "Comment";
      return (
        <div>
          {
            this.state.showCreateRankingConfirm &&
            <ConfirmAlertView
              showModal = {this.state.showCreateRankingConfirm}
              onClose = {this.closeShareDialog.bind(this)}
              title = {"Share this ranking"}
            />
          }
          {this.state.showComments &&
              <CommentPopupView
                onClose = {this.closePopup.bind(this)}
                comment = {this.comment.bind(this)}
              />
          }
          <div className = "EditRankingsPage">
            <div className = "EditRankingRankingList" >
              <div className = "RankingTitleContainer">
                <h1 className = "RankingTitle">{this.state.title}</h1>
                <h1 className = "RankingLimit"> {" | Top "+this.state.maxLength}</h1>
              </div>
              <div className = "TitleSecondRow">
                <h2 className = "RankingAuthor">{"created by "+this.state.creator}</h2>
                <button onClick = {this.commentClicked.bind(this)}>{commentButtonTitle}</button>
              </div>
              <RankingList id={1}
                           items = {this.state.submission}
                           canEdit = {false}
                           showStandbyCard = {true}
                           maxLength = {this.state.maxLength}/>
             {this.state.comment &&
               <div>
                 <h3>Comments</h3>
                 <CommentsList comments = {[this.state.comment]}/>
               </div>
             }

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

export default withRouter(DragDropContext(HTML5Backend)(EditRankingsPage));

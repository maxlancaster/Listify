import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import { withRouter } from 'react-router';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import listServices from '../../services/listServices.js';
import rankingServices from '../../services/rankingServices.js';

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
            maxLength : 0, //data.maxLength,
            usersSharedWith : [], //data.usersSharedWith,
            description: '',
            showCreateRankingConfirm : false,
            submission: [],
            comment : ''
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

    hasUserSubmittedThisRanking() {
        if (this.state.rankings.length === 0) {
            return false;
        }
        var current_user = this.props.user;

        // find intersection of list.rankings and current_user.rankings
        var ranking_ids = this.state.rankings.filter(function(ranking) {
            return current_user.rankings.indexOf(ranking) != -1;
        });

        var user_has_submitted_this_ranking = ranking_ids.length >= 1 ? true : false;

        return user_has_submitted_this_ranking;
    }

    submitRanking() {
        console.log("submitting");
        var order = [];
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

    updateRanking() {
        console.log("updating");

        var order = [];
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

        listServices.getListDataFromId(this.props.params.listId).then((response) => {
            var listRankingIds = response.content.list.rankings;
            var current_user_rankings = this.props.user.rankings;

            var ranking_ids = listRankingIds.filter(function(ranking) {
                return current_user_rankings.indexOf(ranking) != -1;
            });

            rankingServices.updateRanking({
                ranking_id : ranking_ids[0],
                order : order,
                comment : comment
            }).then((res) => {
                if (res.success) {
                    this.props.router.push("/");
                } else {
                    console.log("failed to update ranking");
                }
            });
        });
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

        var updateOrSubmitRankingButtonFunction = this.hasUserSubmittedThisRanking() ? this.updateRanking.bind(this) : this.submitRanking.bind(this);

        var buttonTitle = this.hasUserSubmittedThisRanking() ? "Update" : "Submit";


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
              <div className = "EditRankingsPage">
                <div className = "EditRankingRankingList" >
                  <div className = "RankingTitleContainer">
                    <h1 className = "RankingTitle">{this.state.title}</h1>
                    <h1 className = "RankingLimit"> {" | Top "+this.state.maxLength}</h1>
                  </div>
                  <div className = "TitleSecondRow">
                    <h2 className = "RankingAuthor">{"created by "+this.state.creator}</h2>
                  </div>
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
              <BottomRightButton onClick = {updateOrSubmitRankingButtonFunction} title = {buttonTitle}/>
            </div>
        );
    }

    finishEdittingRanking() {
        // console.log(this.state.order);
    }
}

export default withRouter(DragDropContext(HTML5Backend)(EditRankingsPage));

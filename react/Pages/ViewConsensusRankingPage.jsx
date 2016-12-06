import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ViewableItemsList from '../Elements/ViewableItemsList.jsx';
import Navbar from '../Elements/Navbar.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import ConsensusRankingDescription from '../Elements/ConsensusRankingDescription.jsx';
import { withRouter } from 'react-router';
import Items from '../../models/Items.js'
import listServices from '../../services/listServices.js';

//This page allows you to View a consensus ranking
class ViewConsensusRankingPage extends Component {
    constructor(props) {
        super(props);
        //TODO: TEMP, REMOVE LATER
        this.state = {list:null, order:[]};
    }

    componentWillMount() {
        var listId = this.props.params.listId;
        listServices.getListDataFromId(listId).then((res) => {
            var list = res.content.list;
            listServices.calculateOrdering(list._id).then((res) => {
                var order = res.content.order;
                this.setState({list:list, order:order});
            });

        });
    }

    //returns null if there isn't one
    getSubmittedRankingId() {
        var current_user = this.props.user;
        // find intersection of list.rankings and current_user.rankings
        var ranking_ids = this.state.list.rankings.filter(function(ranking) {
            return current_user.rankings.indexOf(ranking) != -1;
        });
        return ranking_ids.length > 0 ? ranking_ids[0] : null;
    }

    currentUserIsCreatorOfConsensus() {
        if (this.state.list === null) {
            return false;
        }
        var creator = this.state.list.creator;
        var current_user = this.props.user.username;

        if (creator === current_user) {
            return true;
        } else {
            return false;
        }
    }

    //lock consensus
    lockList() {
        if (this.state.list && !this.state.list.locked) {
            var listId = this.props.params.listId;
            listServices.lockList(listId).then((res) => {
                if (res.success) {
                    var list = this.state.list;
                    list.locked = true;
                    this.setState({list:list});
                } else {
                    console.log("unsuccessful lock");
                }
            });
        }
    }

    viewYourRanking() {
        var ranking_id = this.getSubmittedRankingId();
        var path = "rankings/"+ranking_id;
        console.log(path);
        this.props.router.push(path);
    }

    addNewItems() {
      console.log("CLICKED");
      var path = "lists/"+this.state.list._id+"/add_items";
      this.props.router.push(path);
    }

    render() {
        const list = this.state.list;
        const order = this.state.order;

        var buttonTitle = "";

        if (list && list.locked) {
            buttonTitle = "Voting Closed";
        } else {
            if (this.currentUserIsCreatorOfConsensus()) {
                buttonTitle = "Close Voting";
            }
        }

        var buttonColor = (list && list.locked) ? "#E52F4F" : "#66B110";
        var buttonStyle = {
            background:buttonColor
        }
        return (
            <div>
                <div className = "EditRankingsPage">
                    {list &&
                    <div className = "EditRankingRankingList" >
                        <div className = "RankingTitleContainer">
                            <h1 className = "RankingTitle">{list.title}</h1>
                            <h1 className = "RankingLimit"> {" | Top "+list.maxLength}</h1>
                        </div>
                        <div className = "TitleSecondRow">
                            <h2 className = "RankingAuthor">{"created by "+list.creator}</h2>
                            {this.currentUserIsCreatorOfConsensus() && <button className = "CloseVotingButton"
                                    onClick = {this.lockList.bind(this)}
                                    style = {buttonStyle}>{buttonTitle}</button>}
                        </div>
                        <ViewableItemsList id={1} items = {order} showRankingNumber = {true}/>
                    </div>
                    }
                </div>
                {list && list.description &&
                <div className = "ConsensusRankingDescription">
                    {list.description}
                </div>
                }

                {list &&
                <ConsensusRankingDescription viewYourRanking = {this.viewYourRanking.bind(this)}
                                             addNewItems = {this.addNewItems.bind(this)}
                                             lock = {true}
                                             title = {list.title}
                                             votes = {list.rankings ? list.rankings.length : 0}
                                             showAddItems = {true}

                />
                }
            </div>
        );
    }
}

export default withRouter(ViewConsensusRankingPage);

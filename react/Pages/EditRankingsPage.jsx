import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import Navbar from '../Elements/Navbar.jsx';
import ConfirmAlertView from '../Elements/ConfirmAlertView.jsx';
import BottomRightButton from '../Elements/BottomRightButton.jsx';

const uuid = require('uuid');
//TODO: remove later
var Item = function(title, description, photo) {
   var that = Object.create(Item.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

class EditRankingsPage extends Component {
  constructor(props) {
    super(props);
    //TODO: TEMP, REMOVE LATER
    var rankingTitle = "Test Title"
    var rankingAuthor = "Phillip Ou";
    var items = [Item('Lebron'),Item('Kobe'), Item('Carmelo')];
    var ranking = {order:{}, items:items, title:rankingTitle, author:rankingAuthor}; //props.ranking;
    this.state = {ranking: ranking, order: [], showAlertDialog: false};
  }

  showAlertDialog() {
    this.setState({showAlertDialog: true})
  }

  closeAlertDialog() {
    this.setState({showAlertDialog: false})
  }

  render() {
    console.log(this.state.showAlertDialog);
    const options = this.state.options;
		return (
      <div>
        <Navbar />
          {
            this.state.showFinishRankingConfirm &&
            <ConfirmAlertView
              showModal = {this.state.showAlertDialog.bind(this)}
              onClose = {this.closeAlertDialog.bind(this)}
              title = {"Would you like to submit this ranking?"}
              description = {"You would not be able to change your preferences after this."}
            />
          }
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
        <BottomRightButton onClick = {this.finishEdittingRanking.bind(this)}/>
      </div>
		);
	}

  finishEdittingRanking() {
    console.log(this.state.order);
  }
}

export default DragDropContext(HTML5Backend)(EditRankingsPage);

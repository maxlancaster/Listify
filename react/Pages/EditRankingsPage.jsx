import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import RankingList from '../Elements/RankingList.jsx';
import OptionsList from '../Elements/OptionsList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import Navbar from '../Elements/Navbar.jsx';
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
    var ranking = {order:{}, items:[Item('Lebron'),Item('Kobe'), Item('Carmelo')], title:"Test Title", author:"Phillip Ou"}; //props.ranking;
    this.state = {ranking: ranking, order: [Item('Lebron'),Item('Kobe'), Item('Carmelo')]};
  }

  render() {
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

    const options = this.state.options;
    var authorLabelText = "Created by "+this.state.ranking.author;

		return (
      <div>
        <Navbar />
        <h1 className = "RankingTitle">{this.state.ranking.title}</h1>
        <h2 className = "RankingAuthor">{authorLabelText}</h2>
  			<div style={style}>
          <RankingList  id={1} list = {this.state.order} />
          <div className = "EditRankingOptionsList" >
            <h2> Options</h2>
            <OptionsList  id={2} list={this.state.ranking.items} canEdit = {false} />
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

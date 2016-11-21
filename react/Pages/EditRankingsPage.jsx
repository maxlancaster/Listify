import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableList from '../Elements/DraggableList.jsx';
import RankingList from '../Elements/RankingList.jsx'; 
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';
import BottomRightButton from '../Elements/BottomRightButton.jsx';
import Item from '../../models/Item.js';
// import Ranking from '../../models/Ranking.js';
// import Consensus from '../../models/Ranking.js';


class EditRankingsPage extends Component {
  constructor(props) {
    super(props);
    var ranking = {order:{}, items:[Item("Kobe",'',''),Item("Jordan",'',''),Item("Lebron",'','')]} //props.ranking;
    this.state = {ranking: ranking, order: []};
  }

  render() {
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

    const options = this.state.options;

		return (
      <div>
  			<div style={style}>
          <RankingList id={1} list = {this.state.order} />
  				<DraggableList id={2} list={this.state.ranking.items} canEdit = {false} showRankingNumber = {false}/>
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

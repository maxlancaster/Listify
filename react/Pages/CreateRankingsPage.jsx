import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableList from '../Elements/DraggableList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import RankingTitleForm from '../Elements/RankingTitleForm.jsx';
import { DragDropContext } from 'react-dnd';


class CreateRankingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {options: [], i:0};
  }
  addItem(itemTitle) {
    //TODO: PUSH ITEMS INSTEAD OF JUST TITLE
    var options = this.state.options;
    //TODO: Temporary until we generate unique id's
    var i = this.state.i;
    i++;
    var item = {id:i, title:itemTitle};
    options.push(item);
    this.setState({options:options, i:i});
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
        <RankingTitleForm placehodler={"Name of ranking"} />
        <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
  			<div style={style}>
  				<DraggableList id={1} list={options} />
  			</div>
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

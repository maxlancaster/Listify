import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableList from '../Elements/DraggableList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';


class EditRankingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {rankings: [], options: props.options, i:0};
  }
  addItem(itemTitle) {
    //TODO: PUSH ITEMS INSTEAD OF JUST TITLE
    var items = this.state.items;
    //TODO: Temporary until we generate unique id's
    var i = this.state.i;
    i++;
    var item = {id:i, title:itemTitle};
    items.push(item);
    this.setState({items:items, i:i});
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
  				<DraggableList id={1} list={this.state.rankings} />
  				<DraggableList id={2} list={options} />
  			</div>
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(EditRankingsPage);

import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableList from '../Elements/DraggableList.jsx';
import AddItemForm from '../Elements/AddItemForm.jsx';
import { DragDropContext } from 'react-dnd';


class CreateRankingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], i:0};
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

		const options = [
			{ id: 1000000, title: "Item 1" },
			{ id: 22222222, title: "Item 2" },
			{ id: 3333333, title: "Item 3" }
		];

    const items = this.state.items;

		return (
      <div>
      <AddItemForm placeholder={"Enter a Suggestion"} addItem = {this.addItem.bind(this)} />
  			<div style={style}>
  				<DraggableList id={1} list={items} />
  				<DraggableList id={2} list={options} />
  			</div>
      </div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

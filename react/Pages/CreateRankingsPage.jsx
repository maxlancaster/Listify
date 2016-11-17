import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableList from '../Elements/DraggableList.jsx';
import { DragDropContext } from 'react-dnd';


class CreateRankingsPage extends Component {
  render() {
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
			{ id: 1, title: "Item 1" },
			{ id: 2, title: "Item 2" },
			{ id: 3, title: "Item 3" }
		];

		const listTwo = [
			{ id: 4, title: "Item 4" },
			{ id: 5, title: "Item 5" },
			{ id: 6, title: "Item 6" }
		];

		return (
			<div style={style}>
				<DraggableList id={1} list={listOne} />
				<DraggableList id={2} list={listTwo} />
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(CreateRankingsPage);

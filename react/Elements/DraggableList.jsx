import React, { Component } from 'react';
import update from 'react/lib/update';
import ItemCard from './ItemCard.jsx';
import { DropTarget } from 'react-dnd';

class DraggableList extends Component {
  constructor(props) {
		super(props);
		this.state = { items: props.list };
	}

	addItem(item) {
    var items = this.state.items;
    items.push(item);
    this.setState({items:items});
	}

	removeItem(index) {
    var items = this.state.items;
    items.splice(index,1);
    this.setState({items:items});
	}

	moveItem(dragIndex, hoverIndex) {
    var items = this.state.items;
		const draggedItem = items[dragIndex];
    items.splice(dragIndex,1);
    items.splice(hoverIndex,0, draggedItem);
    this.setState({items:items});
	}

	render() {
		const { items } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
    const backgroundColor = isActive ? 'lightgreen' : '#FFF';
		const style = {
			width: "200px",
			height: "404px",
			border: '1px dashed gray',
      backgroundColor: backgroundColor
		};

		return connectDropTarget(
			<div style={style}>
				{items.map((item, index) => {
					return (
						<ItemCard
							key={item.id}
							index={index}
							listId={this.props.id}
							item={item}
							removeItem={this.removeItem.bind(this)}
							moveItem={this.moveItem.bind(this)} />
					);
				})}
			</div>
		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if ( id !== sourceObj.listId ) {
      component.addItem(sourceObj.item);
    }
		return {
			listId: id
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(DraggableList);

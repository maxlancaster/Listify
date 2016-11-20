import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

class ItemCard extends Component {

  render() {
		const { item, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		const style = {
			border: '1px dashed blue',
			padding: '0.5rem 1rem',
			margin: '.5rem',
			backgroundColor: 'white',
			opacity: opacity
		};

		return connectDragSource(connectDropTarget(
        <div style={style}>
          <p>{item.title}</p>
          <button onClick={this.props.deleteItem.bind(null, item)}>x</button>
        </div>

    ));
  }
}

const CardSource = {
	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			item: props.item
		};
	},
	endDrag(props, monitor) {
		const itemCard = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult && dropResult.listId !== itemCard.listId ) {
			props.removeItem(itemCard.index);
		}
	}
};

const CardTarget = {
	hover(props, monitor, component) {
		const originalIndex = monitor.getItem().index;
		const hoverIndex = props.index; //index your mouse is hovering over
		const sourceListId = monitor.getItem().listId;
		// Optimization: No need to replace originIndex if we're just hovering over it
		if (originalIndex === hoverIndex) {
			return;
		}
		if (props.listId === sourceListId ) {
			props.moveItem(originalIndex, hoverIndex);
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("CARD", CardTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", CardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(ItemCard);

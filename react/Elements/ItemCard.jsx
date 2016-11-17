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

		return connectDragSource(connectDropTarget(<div style={style}>{item.title}</div>
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
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		// Determine mouse position
		const clientOffset = monitor.getClientOffset();
		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		if (props.listId === sourceListId ) {
			props.moveItem(dragIndex, hoverIndex);
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("CARD", CardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", CardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(ItemCard);

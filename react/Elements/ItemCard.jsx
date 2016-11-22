import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

class ItemCard extends Component {

  render() {
		const { item, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		const style = {
			opacity: opacity
		};

		return connectDragSource(connectDropTarget(
        <div className = "ItemCard" style={style}>
          <button className = "ItemCardEditButton" onClick={this.props.deleteItem.bind(null, item)}>x</button>
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "ItemCardTitle">{item.title}</p>

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

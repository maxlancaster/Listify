import React, { Component } from 'react';
import update from 'react/lib/update';
import ItemCard from './ItemCard.jsx';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

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

  deleteItem(item) {
    var items = this.state.items;
    var index = items.indexOf(item);
    if (index > -1) {
      items.splice(index,1);
    }
    this.setState({items:items});
  }

	removeItem(index) {
    var items = this.state.items;
    items.splice(index,1);
    this.setState({items:items});
	}

	moveItem(originalIndex, hoverIndex) {
    var items = this.state.items;
		const draggedItem = items[originalIndex];
    items.splice(originalIndex,1);
    items.splice(hoverIndex,0, draggedItem);
    this.setState({items:items});
	}



	render() {
		const { items } = this.state;
		const { canDrop, isOver, connectDropTarget} = this.props;
		const isActive = canDrop && isOver;
    console.log(this.props.showRankingNumber);
    const defaultBackGroundColor = this.props.showRankingNumber ? "white" : '#FAF9F9';
    const backgroundColor = isActive ? '#9B9B9B' : defaultBackGroundColor;
    const style = {
      backgroundColor: backgroundColor,
      height:"100%"
    }

		return connectDropTarget(
        <div style = {style}>
          {items.map((item, index) => {
            return (
              <ItemCard
                key={item.id}
                index={index}
                listId={this.props.id}
                item={item}
                removeItem={this.removeItem.bind(this)}
                moveItem={this.moveItem.bind(this)}
                deleteItem={this.deleteItem.bind(this)}
                canEdit = {this.props.canEdit}
                showRankingNumber = {this.props.showRankingNumber}/>
            );
          })}
      </div>
		);
  }
}

const CardTarget = {
	drop(props, monitor, component ) {
    const cardTargetList = props;
		const sourceObj = monitor.getItem();
		if (cardTargetList.id !== sourceObj.listId ) {
      component.addItem(sourceObj.item);
    }
		return {listId: cardTargetList.id};
	},

  // hover(props, monitor, component) {
  //   //props = information about list you're hovering over
  //   //monitor.getItem() gets teh item you dragged
	// 	const dragIndex = monitor.getItem().index;
	// 	const hoverIndex = props.index;
	// 	const sourceListId = monitor.getItem().listId;
	// 	if (component.props.id !== sourceListId) {
  //
  //     const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
  //
  //     // Get vertical middle
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //
  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();
  //
  //     // Get pixels to the top
  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
	// 		component.moveItem(dragIndex, hoverIndex);
	// 		monitor.getItem().index = hoverIndex;
	// 	}
	// }
}

export default DropTarget("CARD", CardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(DraggableList);

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import Items from '../../models/Items.js'

class ItemCard extends Component {

  constructor(props) {
    super(props);
    this.state = {editMode:false,
                  descriptionMode:false,
                  newTitle:this.props.item.title,
                  newDescription:this.props.item.description};
  }

  turnOnEditMode() {
    this.setState({editMode:true});
  }

  turnOffEditMode() {
    this.setState({editMode:false, descriptionMode:false});
  }

  turnOnDescriptionMode() {
    this.setState({descriptionMode:true});
  }

  savePressed() {
    this.turnOffEditMode();
    var newTitle = this.state.newTitle
    var newDescription = this.state.newDescription;
    var newItem = Items(newTitle,newDescription,'');
    var index = this.props.index;
    this.props.updateItem(index,newItem);
  }

  onTitleChange(event) {
    this.setState({newTitle:event.target.value});
  }

  onDescriptionChange(event) {
    this.setState({newDescription:event.target.value});
  }

  editableItemCard() {
    const { item } = this.props;
    return (
      <div className = "EditableItemCard">
        <div className = "ItemContainer">
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <input className = "TitleInput"
                 type="text"
                 placeholder={item.title}
                 onChange = {this.onTitleChange.bind(this)}
          />
        {this.state.descriptionMode &&
          <textarea placeholder="Description (Optional)" onChange = {this.onDescriptionChange.bind(this)}/>
        }
        </div>
        <div className = "ButtonContainer">
          <button className = "AddDescriptionButton" onClick={this.turnOnDescriptionMode.bind(this)} >Add Info</button>
          <button className = "AddPhotoButton" >Add Photo</button>
          <button className = "DeleteButton" onClick={this.props.deleteItem.bind(null, item)}>Delete</button>
        </div>
        <div className = "ExitButtonContainer">
          <button onClick = {this.savePressed.bind(this)}>Save</button>
          <button onClick = {this.turnOffEditMode.bind(this)}>Cancel</button>
        </div>
      </div>
    );
  }

  itemCard() {
    const { item, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		const style = {
			opacity: opacity
		};

		return connectDragSource(connectDropTarget(
        <div className = "ItemCard" style={style}>
          {this.props.canEdit &&
            <button className = "ItemCardEditButton" onClick={this.turnOnEditMode.bind(this)}>edit</button>
          }
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "ItemCardTitle">{item.title}</p>

        </div>
    ));
  }

  render() {
    return this.state.editMode ? this.editableItemCard() : this.itemCard();
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
    var canDropIntoTarget = dropResult.targetCanDrop === undefined || dropResult.targetCanDrop === true;
		if (dropResult && canDropIntoTarget && dropResult.listId !== itemCard.listId ) {
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

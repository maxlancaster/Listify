import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { Component } from 'react';

var placeholder = document.createElement("li");
var ALLOWED_EFFECT_MOVE = 'move';
placeholder.className = "placeholder";

var RankingElement = React.createClass({
  getInitialState: function() {
    return {data:this.props.data}
  },

  dragStart: function(dragEvent) {
    this.dragged = dragEvent.currentTarget;
    dragEvent.dataTransfer.effectAllowed = "move";
    dragEvent.dataTransfer.setData("text/html", dragEvent.currentTarget);
  },
  dragEnd: function(dragEvent) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    var data = this.state.data;

    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to){
      to--;
    }
    if (this.nodePlacement === "after") {
      to++;
    }
    data.splice(to,0,data.splice(from,1)[0]);
    this.setState({data:data});
  },
  dragOver: function(dragEvent) {
    dragEvent.preventDefault();
    this.dragged.style.display = "none";
    if (dragEvent.target.className === "placeholder") {
      return;
    }
    this.over = dragEvent.target;
    // Inside the dragOver method
    var relY = dragEvent.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = dragEvent.target.parentNode;

    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, dragEvent.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(placeholder, dragEvent.target);
    }
  },
  render: function() {
    return <ul onDragOver = {this.dragOver}>
      {this.state.data.map(function(item,i) {
        return (
          <li
            data-id = {i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
          >{item}</li>

        )
      }, this)}
    </ul>
  }
});

export default withRouter(RankingElement);

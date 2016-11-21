import React, { Component } from 'react';
import DraggableList from './DraggableList.jsx'
import { withRouter } from 'react-router';

class OptionsList extends DraggableList {
  render() {
    return (
      <DraggableList id={this.props.id}
                     list={this.props.list}
                     canEdit = {this.props.canEdit}
                     showRankingNumber = {false}/>
    );
  }

}

export default withRouter(OptionsList);

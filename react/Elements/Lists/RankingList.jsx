import React, { Component } from 'react';
import DraggableList from './DraggableList.jsx'
import { withRouter } from 'react-router';

class Rankinglist extends DraggableList {
  render() {
    return (
      <DraggableList id={this.props.id}
                     items={this.props.items}
                     canEdit = {false}
                     showRankingNumber = {true}
                     showStandbyCard = {this.props.showStandbyCard}
                     canDrop = {this.props.maxLength && this.props.items.length < this.props.maxLength}/>
    );
  }

}

export default withRouter(Rankinglist);

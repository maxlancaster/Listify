import React, { Component } from 'react';
import DraggableList from './DraggableList.jsx'
import { withRouter } from 'react-router';

class Rankinglist extends DraggableList {
  render() {
    return (
      <DraggableList id={this.props.id}
                     items={this.props.items}
                     canEdit = {false}
                     showRankingNumber = {true}/>
    );
  }

}

export default withRouter(Rankinglist);

import React, { Component } from 'react';
import DraggableList from './DraggableList.jsx'
import { withRouter } from 'react-router';

class Rankinglist extends DraggableList {
  render() {
    return (
      <DraggableList id={this.props.id}
                     list={this.props.list}
                     canEdit = {false}
                     showRankingNumber = {true}/>
    );
  }

}

export default withRouter(Rankinglist);

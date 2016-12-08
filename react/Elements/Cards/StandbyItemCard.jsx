import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StandbyItemCard extends Component {

  onClick(event) {
    event.preventDefault();
  }

  render() {
		return (
      <a href="#" onClick = {this.onClick.bind(this)}>
        <div className = "StandbyItemCard">
          <p className = "ItemCardTitle">{"Drag & Drop Options"}</p>
          <p className = "ItemCardDescription">{"to update rankings"}</p>
        </div>
      </a>
    );
  }
}

export default withRouter(StandbyItemCard);

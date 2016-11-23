import React, { Component } from 'react';
import { withRouter } from 'react-router';


class StaticItemCard extends Component {

  render() {
		const { item, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		const style = {
			opacity: opacity
		};

		return (
      <a href="#">
        <div className = "ItemCard" style={style}>
          {this.props.showRankingNumber && <p className = "ItemCardRanking">{this.props.index+1 + "."}</p>}
          <p className = "ItemCardTitle">{item.title}</p>

        </div>
      </a>
    );
  }
}

export default withRouter(StaticItemCard);

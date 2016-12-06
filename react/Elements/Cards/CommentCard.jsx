import React, { Component } from 'react';
import { withRouter } from 'react-router';


class CommentCard extends Component {

  render() {
		const { comment} = this.props;
    console.log(comment);

		return (
      <a href="#">
        <div className = "ItemCard">
          <p className = "ItemCardTitle">{comment.text}</p>
          <p className = "ItemCardDescription">{"commented by "+comment.username}</p>
        </div>
      </a>
    );
  }
}

export default withRouter(CommentCard);

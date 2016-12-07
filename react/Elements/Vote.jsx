import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router';


class Vote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserVoteScore: props.currentUserVoteScore
        };
    }


    componentWillReceiveProps(props) {
      this.setState({currentUserVoteScore: props.currentUserVoteScore});
    }

    didUpvote(event) {
      event.stopPropagation();
      this.props.handleUpvote();
    }

    didDownVote(event) {
      event.stopPropagation();
      this.props.handleDownvote();
    }
    /**/
    render() {
      var upvoteImageType = this.state.currentUserVoteScore === 1 ? 'ActiveUpvote.svg'  : 'Upvote.svg'
      var UpvoteImage = require('../../public/assets/'+upvoteImageType);
      var downvoteImageType = this.state.currentUserVoteScore === -1 ? 'ActiveDownvote.svg'  : 'Downvote.svg'
      var DownvoteImage = require('../../public/assets/'+ downvoteImageType);
      const votingButtonStyle = {
          width:"30px",
          height:"30px"
        }

      const downvotetyle = {

      }
        let upvote =  (
          <div>
          <img style = {votingButtonStyle}
               className="upvote"
               src={UpvoteImage}
               onClick={this.didUpvote.bind(this)}/>

          </div>
        );


        let downvote =  (
          <div>
          <img style = {votingButtonStyle}
               className="downvote"
               src={DownvoteImage}
               onClick={this.didDownVote.bind(this)}/>

          </div>
          );

        return (
                <div className={ `VoteButtons` }>
                    { upvote }
                    <p className = "VoteCount">{"0"}</p>
                    { downvote }
                </div>
        );
    }
}

Vote.propTypes = {
    currentUserVoteScore: React.PropTypes.number,
};

Vote.defaultProps = {
    className: 'react-upvote',

    currentUserVoteScore: 0
};

export default withRouter(Vote);

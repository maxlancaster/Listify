import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router';


class Vote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteScore: props.voteScore
        };
    }

    render() {

        let upvote =  (
                <div className="upvote" onClick={ () => this.props.handleUpvote() }>
                    ^
                </div>
            );


        let downvote =  (
                <div className="downvote" onClick={ () => this.props.handleDownvote() }>
                  v
                </div>
            );

        return (
            <div >
                <div className={ `VoteButtons` }>
                    { upvote }
                    { downvote }
                </div>
            </div>
        );
    }
}

Vote.propTypes = {
    voteScore: React.PropTypes.number,
};

Vote.defaultProps = {
    className: 'react-upvote',

    voteScore: 0
};

export default withRouter(Vote);

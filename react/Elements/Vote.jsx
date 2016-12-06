import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
// import List from '../../models/List.js'
// import cx from 'classnames';
import { withRouter } from 'react-router';


class Vote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteScore: props.voteScore
        };
    }

    componentWillReceiveProps(nextProps) {
        let oldVoteStatus = this.props.voteStatus;
        let newVoteStatus = nextProps.voteStatus;

        // don't update unless post's vote status changes
        if (oldVoteStatus === newVoteStatus) {
            return;
        }

        this.setState({
            updating: false,
            voteStatus: nextProps.voteStatus
        });
    }

    render() {
        let {
            voteStatus,
            updating
        } = this.state;

        let {
            beforeContent,
            afterContent
        } = this.props;


        let upvote =  (
                <div className="upvote" onClick={ () => this.props.handleUpvote() }>
                </div>
            );

        let downvote =  (
                <div className="downvote" onClick={ () => this.props.handleDownvote() }>
                  {}
                </div>
            );

        return (
            <div >

                { beforeContent }

                <div className={ `VoteButtons` }>
                    { upvote }
                    { downvote }
                </div>

                { afterContent }

            </div>
        );
    }
}

Vote.propTypes = {
    className: React.PropTypes.string,

    voteStatus: React.PropTypes.number,
    upvoteCount: React.PropTypes.number,

    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
    onRemoveVote: React.PropTypes.func,

    upvoteContent: React.PropTypes.element,
    downvoteContent: React.PropTypes.element,
    beforeContent: React.PropTypes.element,
    afterContent: React.PropTypes.element
};

Vote.defaultProps = {
    className: 'react-upvote',

    voteStatus: 0,
    upvoteCount: 0,

    onUpvote: null,
    onDownvote: null,
    onRemoveVote: null,

    upvoteContent: null,
    downvoteContent: null,
    beforeContent: null,
    afterContent: null
};

export default withRouter(Vote);

import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { withRouter } from 'react-router';

class ConfirmAlertView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
        <ModalContainer onClose={this.props.onClose}>
          <ModalDialog onClose={this.props.onClose}>
            <h1>Dialog Content</h1>
            <p>More Content. Anything goes here</p>
          </ModalDialog>
        </ModalContainer>
    </div>;
  }
}

export default withRouter(ConfirmAlertView);

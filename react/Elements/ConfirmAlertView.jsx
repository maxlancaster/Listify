import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { withRouter } from 'react-router';

class ConfirmAlertView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var style = {backgroundColor:"black"}
    return <div>
        <ModalContainer onClose={this.props.onClose}>
          <ModalDialog onClose={this.props.onClose}>
            <h1>{this.props.title}</h1>
            {this.props.link && this.props.link.length > 0 &&
              <div>
              <p>Shareable link</p>
              <input type="text" value={this.props.link} readonly="readonly" />
              </div>
            }
            {this.props.description && this.props.description.length > 0 &&
              <div>
              <p>this.props.description</p>
              <button>Yes</button>
              <button>Cancel</button>
              </div>
            }
          </ModalDialog>
        </ModalContainer>
    </div>;
  }
}

export default withRouter(ConfirmAlertView);

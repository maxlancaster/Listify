import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { withRouter } from 'react-router';

class SetListCapacityPopupView extends Component {
  constructor(props) {
    super(props);
    this.state = {capacity : this.props.itemsCount};
  }
  createButtonClicked() {
    this.props.createListWithCapacity(this.state.capacity);
  }

  handleChange(event) {
    var capacity = event.target.value;
    this.setState({capacity: capacity});
  }

  render() {
    var itemsCount = this.props.itemsCount;
    return (<div>
        <ModalContainer onClose={this.props.onClose}>
          <ModalDialog onClose={this.props.onClose}>
            <h1>{"Your List has "+itemsCount}</h1>
              <div>
              <p>{"How many items do you want people to rank?"}</p>
              <input type="number"
                      name="capacity"
                      min="1" max={itemsCount}
                      value = {this.state.capacity}
                      onChange={this.handleChange.bind(this)}
              />
              </div>
            <button onClick = {this.createButtonClicked.bind(this)}>Create</button>
          </ModalDialog>
        </ModalContainer>
    </div>);
  }
}

export default withRouter(SetListCapacityPopupView);

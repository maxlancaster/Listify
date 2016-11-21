import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BottomRightButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = { position: 'fixed', bottom: 10, right: 10 }
    return (
      <button style = {style} onClick={this.props.onClick.bind(null)}>OK</button>
    );
  }
}
export default withRouter(BottomRightButton);

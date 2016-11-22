import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BottomRightButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = { position: 'fixed',
                    bottom: 25,
                    right: 25,
                    borderRadius: "50%",
                    width:"70px",
                    height:"70px",
                    backgroundColor: "#66B110",
                    color:"white",
                    border: "none"}
    return (
      <button className="BottomRightButton" onClick={this.props.onClick.bind(null)}>OK</button>
    );
  }
}
export default withRouter(BottomRightButton);

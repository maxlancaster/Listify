import React, { Component } from 'react';
import { withRouter } from 'react-router';

class BottomRightButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title ? this.props.title : "OK";
    const style = {   position: 'fixed',
                      bottom: '25px',
                      right: '25px',
                      borderRadius: '50%',
                      width:'70px',
                      height:'70px',
                      background: ' #66B110 url(../../public/assets/GreyPencil.svg) no-repeat',
                      color:'white',
                      border: 'none'
                  }
    return (
      <button style = {style} className="BottomRightButton" onClick={this.props.onClick.bind(null)}>{title}</button>
    );
  }
}
export default withRouter(BottomRightButton);

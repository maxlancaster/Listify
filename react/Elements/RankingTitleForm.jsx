import React, { Component } from 'react';
import { withRouter } from 'react-router';

class RankingTitleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    return false;
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    var placeholder = this.props.placeholder;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder = {placeholder} value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}
export default withRouter(RankingTitleForm);

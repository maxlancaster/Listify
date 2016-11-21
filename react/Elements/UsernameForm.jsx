import React, { Component } from 'react';
import { withRouter } from 'react-router';

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.value;
    this.props.addItem(title);
    this.setState({value: ''});
  }

  render() {
    var placeholder = this.props.placeholder;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder = 'Username' value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Add" />
      </form>
    );
  }
}
export default withRouter(UsernameForm);

var React = require('react');

var Board = React.createClass({
  render() {
    return (<h1>Board: {this.props.foo}</h1>);
  }
});

module.exports = Board;

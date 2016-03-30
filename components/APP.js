var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
  getInitialState() {
    return {
      status: 'disconnected',
      title: ''
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  },

  connect() {
    this.setState({status: 'connected'});
    console.log('Connected to socket: %s.', this.socket.id);
  },

  disconnect() {
    this.setState({status: 'disconnected'});
  },

  welcome(serverState) {
    this.setState({title: serverState.title});
  },

  render() {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />
        <div>{this.props.children}</div>
      </div>
    );
  }
});

module.exports = APP;

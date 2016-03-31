var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
  getInitialState() {
    return {
      status: 'disconnected',
      title: '',
      member: {},
      audience: []
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
  },

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  },

  connect() {
    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    if (member) {
      this.emit('join', member);
    }
    this.setState({status: 'connected'});
    console.log('Connected to socket: %s.', this.socket.id);
  },

  disconnect() {
    this.setState({status: 'disconnected'});
  },

  welcome(serverState) {
    this.setState({title: serverState.title});
  },

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({member: member});
  },

  updateAudience(newAudience) {
    this.setState({audience: newAudience});
  },

  render() {
    {/* When we nest components in the react-router, passing state from the parent component
        down to the children is a bit involved. It's done cloning the child component and
        passing the state to the clone(using the spread operator comes in handy),
        which is gonna be the one we render.
        The emit prop has to be passed explicitely */}
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {...this.state, emit: this.emit});
    });

    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />
        {childrenWithProps}
      </div>
    );
  }
});

module.exports = APP;

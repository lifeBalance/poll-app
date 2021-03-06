var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
  getInitialState() {
    return {
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: '',
      questions: [],
      currentQuestion: false,
      results: {}
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
    this.socket.on('results', this.updateResults);
  },

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  },

  connect() {
    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

    if (member && member.type === 'audience') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', { name: member.name, title: sessionStorage.title })
    }

    this.setState({status: 'connected'});
    console.log('Connected to socket: %s.', this.socket.id);
  },

  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: ''
    });
  },

  updateState(serverState) {
    this.setState(serverState);
  },

  joined(member) {
    {/* When this event handler fires we save information (both in the sessionStorage and in
      the state) about the user who joined, wether is an audience member or a speaker */}
    sessionStorage.member = JSON.stringify(member);
    this.setState({member: member});
  },

  updateAudience(newAudience) {
    this.setState({audience: newAudience});
  },

  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  },

  ask(question) {
    sessionStorage.answer = '';
    this.setState({ currentQuestion: question});
  },

  updateResults(data) {
    this.setState({results: data});
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
        <Header {...this.state} />
        {childrenWithProps}
      </div>
    );
  }
});

module.exports = APP;

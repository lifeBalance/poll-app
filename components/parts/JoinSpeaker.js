var React     = require('react');
var ReactDOM  = require('react-dom');

var JoinSpeaker = React.createClass({
  start() {
    var speakerName = ReactDOM.findDOMNode(this.refs.name).value;
    var title       = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start', { name: speakerName, title: title });
  },
  render() {
    return (
      <form action='javascript:void(0)' onSubmit={this.start}>
        <label>Full Name</label>
        <input  ref='name'
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required />

        <label>Presentation title</label>
        <input  ref='title'
                type="text"
                className="form-control"
                placeholder="Enter a title for the presentation"
                required />

        <button className='btn btn-primary'>Join</button>
      </form>
    );
  }
});

module.exports = JoinSpeaker;

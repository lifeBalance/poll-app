var React     = require('react');
var ReactDOM  = require('react-dom');
var Link      = require('react-router').Link;

var Join = React.createClass({
  join() {
    var memberName = ReactDOM.findDOMNode(this.refs.name).value;
    this.props.emit('join', {name: memberName});
  },
  render() {
    return (
      <form action='javascript:void(0)' onSubmit={this.join}>
        <label htmlFor="">Full Name</label>
        <input  ref='name'
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required />

        <button className='btn btn-primary'>Join</button>

        <Link to='/speaker' >Join as a Speaker</Link>
        <Link to='/board' >Go to the board</Link>
      </form>
    );
  }
});

module.exports = Join;

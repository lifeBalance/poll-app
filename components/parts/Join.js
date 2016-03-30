var React   = require('react');

var Join = React.createClass({
  join() {
    var memberName = React.findDOMNode(this.refs.name).value;
    alert('TODO: Join Member: ' + memberName);
  },
  render() {
    return (
      <form action='javascript:void(0)' onSubmit={this.join}>
        <label htmlFor="">Full Name</label>
        <input  ref='name'
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required/>
        <button className='btn btn-primary'>Join</button>
      </form>
    );
  }
});

module.exports = Join;

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Whoops = React.createClass({
  render() {
    return (
      <div id='not-found'>
        <h1>Whoops...</h1>
        <p>We cannot find the page you have requested :( </p>
        <p>Maybe you were looking for some of these: </p>
        <ul>
          <li>
            <Link to='/'>Join as Audience</Link>
          </li>
          <li>
            <Link to='/speaker'>Start the presentation</Link>
          </li>
          <li>
            <Link to='/board'>View the board</Link>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Whoops;

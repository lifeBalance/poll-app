var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;
var IndexRoute  = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var APP       = require('./components/APP');
var Audience  = require('./components/Audience');
var Speaker   = require('./components/Speaker');
var Board     = require('./components/Board');

var routes = (
  <Route path='/' component={APP}>
    <IndexRoute component={Audience} />
    <Route path='speaker' component={Speaker} />
    <Route path='board' component={Board} />
  </Route>
);

var mount = document.getElementById('react-container');

ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, mount);

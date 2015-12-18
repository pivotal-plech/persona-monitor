var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout');
var Home = require('./components/home');
var Persona = require('./components/persona');

var routes = (
  <Route name="layout" path="/" handler={Layout}>
    <Route handler={Home} />
    <Route handler={Persona} path="/persona/:name" component={Persona}/>
  </Route>
);

exports.start = function() {

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById('content'));
  });
}

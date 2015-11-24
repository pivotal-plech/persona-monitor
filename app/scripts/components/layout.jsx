var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header = require('./header');
var Footer = require('./footer');

var Layout = React.createClass({

  render: function() {

    return (
      <div className="App">
        <Header />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
});

module.exports = Layout;

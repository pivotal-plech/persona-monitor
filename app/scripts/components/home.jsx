var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navigation = require('react-router').Navigation;

var Hero = require('./hero.jsx');

var TileLayout = require('pui-react-tile-layout');
var BasicPanelAlt = require('pui-react-panels').BasicPanelAlt;

var Header = require('./header');

// Firebase
var Firebase = require("firebase");
var ReactFireMixin = require("reactfire");
var PersonaTile = require('./persona_tile.jsx');


var Home = React.createClass({

  mixins: [ReactFireMixin, Navigation],

  getInitialState: function() {
    return {
      personas: []
    };
  },

  componentWillMount: function() {
    var myFirebaseRef = new Firebase("https://persona-monitor.firebaseio.com/personas");
    this.bindAsArray(myFirebaseRef, "personas");
  },

  render: function() {
    var self = this;

    var personas = this.state.personas.map(function(persona) {
      return (
        <PersonaTile name={ persona['.key'] }>
        </PersonaTile>
      );
    });

    return (
      <div className="wrap">
        <div className="home">
          <div className="container">
            <h1 className="em-low">PCF Personas</h1>
            <hr />
            <TileLayout columns={{xs: 1, sm: 2, md: 2}}>
              {personas}
            </TileLayout>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;

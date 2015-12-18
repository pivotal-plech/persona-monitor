var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// Firebase
var Firebase = require("firebase");
var ReactFireMixin = require("reactfire");

var Row = require('pui-react-grids').Row;
var Col = require('pui-react-grids').Col;
var TileLayout = require('pui-react-tile-layout');

var Persona = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      persona: {
        "details": {},
        "demographics": [],
        "behaviors": [],
        "needs": []
      }
    };
  },

  componentWillMount: function() {
    this.bindAsObject(new Firebase("https://persona-monitor.firebaseio.com/personas/" + this.props.params.name), "persona");
  },

  render: function() {
    return (
      <div className="persona">
        <header className="persona-header">
          <div className="persona-blur-bg"></div>
        </header>
        <TileLayout columns={{xs: 1, sm: 2}}>
          <TileLayout.Item className="text-center">
            <img className="avatar" src={this.state.persona.pic} />
            <h1>{this.state.persona.details.nickname}</h1>
            <p>{this.state.persona.details.description}</p>
            <p>{this.state.persona.details.quote}</p>
            <p>{this.state.persona.details.jobTitle}</p>
          </TileLayout.Item>
          <TileLayout.Item>
            <h3 className="title type-dark-1 em-low">Demographics</h3>
            <hr />
            { this.state.persona.demographics.map(function(object, i){
              return <p>{object}</p>;
            })}
          </TileLayout.Item>
          <TileLayout.Item>
            <h3 className="title type-dark-1 em-low">Behaviors / Activities</h3>
            <hr />
            { this.state.persona.behaviors.map(function(object, i){
              return <p>{object}</p>;
            })}
          </TileLayout.Item>
          <TileLayout.Item>
            <h3 className="title type-dark-1 em-low">Needs / Goals</h3>
            <hr />
            { this.state.persona.needs.map(function(object, i){
              return <p>{object}</p>;
            })}
          </TileLayout.Item>
        </TileLayout>
      </div>
    );
  }
});

module.exports = Persona;

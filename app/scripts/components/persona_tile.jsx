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

var PersonaTile = React.createClass({

  mixins: [ReactFireMixin, Navigation],

  getInitialState: function() {
    return {
      persona: {
        "details": {},
        "demographics": [],
        "behaviors": [],
        "needs": []
      },
      trackerData: []
    };
  },

  componentWillMount: function() {
    this.bindAsObject(new Firebase("https://persona-monitor.firebaseio.com/personas/" + this.props.name), "persona");
  },

  getStories: function(personaType) {
    var self = this;
    var type = _.snakeCase(personaType)
    var jqxhr = $.get( "https://www.pivotaltracker.com/services/v5/projects/1502228/stories?with_label=" + type, function(d) {
      self.state.trackerData = d;
      console.log(d);
    });
  },

  render: function() {
      return (
        <TileLayout.Item>
          <Link to={`/persona/${this.props.name}`}>
          <BasicPanelAlt className="pvxl persona-panel text-center">
            <div className="persona-bg"/>
              <img className="avatar centered" src={this.state.persona.pic} />
              <p className="em-high mtl h3 type-dark-1 txt-c">{this.props.name}</p>
              <p>{this.state.persona.details.jobTitle}</p>
              <h3 className="h3 em-low type-dark-1 txt-c">{ this.state.persona.nickname }</h3>
              <p>{this.state.persona.external ? '' : ''}</p>
              <hr />
              <div className="stats">
                <div>
                  <p className="type-dark-1 h4 mvn">1</p>
                  <p className="em-alt type-dark-5 mvn">Completed this Week</p>
                </div>
                <div>
                  <p className="type-dark-1 h4 mvn">0</p>
                  <p className="em-alt type-dark-5 mvn">Total in Backlog</p>
                </div>
              </div>
            </BasicPanelAlt>
          </Link>
        </TileLayout.Item>
      );
  }
});

module.exports = PersonaTile;

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


var Home = React.createClass({

  mixins: [ReactFireMixin, Navigation],

  getInitialState: function() {
    return {
      trackerData: {},
      personas: []
    };
  },

  componentDidMount: function() {
    console.log(this.state.persona);
    $.get("https://www.pivotaltracker.com/services/v5/projects/1502228/stories?with_label=" + _.snakeCase(this.state.persona.details.nickname), function(result) {
      var results = result[0];
      if (this.isMounted()) {
        this.setState({
          trackerData: results,
        });
      }
    }.bind(this));
  },

  componentWillMount: function() {
    var myFirebaseRef = new Firebase("https://persona-monitor.firebaseio.com/personas");
    this.bindAsArray(myFirebaseRef, "personas");
    this.personas.trackerData = this.getStories();
  },

  getStories: function() {
    $.get("https://www.pivotaltracker.com/services/v5/projects/1502228/stories?with_label=the_architect", function(d) {
      return d;
    })
  },

  render: function() {

    var personas = this.state.personas.map(function(persona) {
      return (
        <TileLayout.Item key={ persona['.key'] }>
          <Link to={`/persona/${persona['.key']}`}>
          <BasicPanelAlt className="pvxl persona-panel text-center">
            <div className="persona-bg"/>
              <img className="avatar centered" src={persona.pic} />
              <p className="em-high mtl h3 type-dark-1 txt-c">{persona['.key']}</p>
              <p>{persona.details.jobTitle}</p>
              <h3 className="h3 em-low type-dark-1 txt-c">{ persona.nickname }</h3>
              <p>{persona.external ? '' : ''}</p>
            </BasicPanelAlt>
          </Link>
        </TileLayout.Item>
      );
    });

    return (
      <div className="wrap">
        <div className="home">
          <div className="container">
            <h1 className="em-low">Pivotal Software</h1>
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

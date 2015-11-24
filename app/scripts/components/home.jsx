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
      products: []
    };
  },

  componentWillMount: function() {
    var myFirebaseRef = new Firebase("https://pivotal-docs.firebaseio.com/products");
    this.bindAsArray(myFirebaseRef, "products");
  },

  render: function() {

    var products = this.state.products.map(function(product) {

      return (
        <TileLayout.Item key={ product['.key'] }>
          <a href="/#/product" className="panel-link">
            <BasicPanelAlt className="pvxl">
              <p className="em-high mvn h3 type-dark-1 txt-c">Pivotal</p>
              <h3 className="h3 em-low type-dark-1 txt-c">{ product.productName }</h3>
            </BasicPanelAlt>
          </a>
        </TileLayout.Item>
      );

    });

    return (
      <div className="wrap">
        <div className="home">
          <Hero />
          <div className="container">
            <h1 className="em-low">Pivotal Software</h1>
            <hr />
            <TileLayout columns={3}>
              {products}
            </TileLayout>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;

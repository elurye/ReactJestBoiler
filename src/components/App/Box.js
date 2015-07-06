'use strict';
var React = require('react');

var Box = React.createClass({
  getInitialState: function() {
    return {
      windowWidth: 0,
      windowHeight: 0
    };
  },

  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    return <div>Current window: {this.state.windowWidth + ' x ' + this.state.windowHeight}</div>;
  }
});

export default Box;

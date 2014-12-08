var React = require('react');

var anotherValidComponent = React.createClass({
  displayName: 'anotherValidComponent',
  getDefaultProps: function () {
    return {
      some: 'prop'
    };
  },
  render: function () {
    var id = 0;
    return (
      React.createElement("ul", null,
        Object.keys(this.props).map(function (key) {
          return (React.createElement("li", {key: ++id}, key, " : ", this.props[key]));
        }, this)
      )
    );
  }
});

module.exports = anotherValidComponent;

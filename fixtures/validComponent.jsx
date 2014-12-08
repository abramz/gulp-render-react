var React = require('react');

var validComponent = React.createClass({
  getDefaultProps: function () {
    return {
      some: 'prop'
    };
  },
  render: function () {
    var id = 0;
    return (
      <ul>
        {Object.keys(this.props).map(function (key) {
          return (<li key={++id}>{key} : {this.props[key]}</li>);
        }, this)}
      </ul>
    );
  }
});

module.exports = validComponent;

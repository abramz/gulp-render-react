var React = require('react');

var validComponent = React.createClass({
  getDefaultProps: function () {
    return {};
  },
  render: function () {
    var id = 0;
    return (
      <invalidtag>
        {Object.keys(this.props).forEach(function (key) {
          return (<li key={++id}>{prop.text}</li>);
        })}
      </invalidtag>
    );
  }
});

module.exports = validComponent;

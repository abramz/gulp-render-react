/*! Gulp Render React | MIT License */

import React, { Component, PropTypes } from 'react';
import { createMemoryHistory, Router, Route, IndexRoute } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <h2>Home</h2>
    );
  }
}

class About extends Component {
  render() {
    return (
      <h2>About</h2>
    );
  }
}

class MyRouter extends Component {
  static propTypes = {
    location: PropTypes.string,
  };

  static defaultProps = {
    location: '/',
  };

  render() {
    const history = createMemoryHistory(this.props.location);

    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path='home' component={Home} />
          <Route path='about' component={About} />
        </Route>
      </Router>
    );
  }
}

export default MyRouter;

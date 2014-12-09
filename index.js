'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var React = require('react');
var nodejsx = require('node-jsx');

function renderToString(filePath, props) {
  var component = React.createFactory(require(filePath));
  var element = component(props);
  return new Buffer(React.renderToString(element));
}

function renderToStaticMarkup(filePath, props) {
  var component = React.createFactory(require(filePath));
  var element = component(props);
  return new Buffer(React.renderToStaticMarkup(element));
}

module.exports = function (type, props) {
  props = props || {};

  if (type !== 'string' && type !== 'markup') {
    throw new gutil.PluginError('gulp-react-render', '`type` required (`string` or `markup`)');
  }

  return through.obj(function (file, enc, cb) {
    try {
      // temporary before we allow src extension in options
      nodejsx.install({ extension: '.jsx' });
      if (type === 'string') {
        file.contents = renderToString(file.path, props);
      } else if (type === 'markup') {
        file.contents = renderToStaticMarkup(file.path, props);
      }
      // temporary before we allow dest extension in options
      file.path = gutil.replaceExtension(file.path, '.html');
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-react-render', err, {fileName: file.path }));
    }
    return cb();
  });
};

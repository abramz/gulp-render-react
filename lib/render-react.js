'use strict';

var _gulpUtil = require('gulp-util');var _gulpUtil2 = _interopRequireDefault(_gulpUtil);
var _through = require('through2');var _through2 = _interopRequireDefault(_through);
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _server = require('react-dom/server');var _server2 = _interopRequireDefault(_server);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                        * Requires a file containing a React component and create an instance of it
                                                                                                                                                                                        * @param  {String} filePath file path to the React component to render
                                                                                                                                                                                        * @param  {Object} props    properties to apply to the element
                                                                                                                                                                                        * @return {Element}         the created React element
                                                                                                                                                                                        */ /*! Gulp Render React | MIT License */
function createElement(filePath, props) {
  if (!filePath || typeof filePath !== 'string' || filePath.length === 0) {
    throw new Error('Expected filePath to be a string');
  }

  // clear the require cache if we have already imported the file (if we are watching it)
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }

  var component = require(filePath); // eslint-disable-line global-require, import/no-dynamic-require
  var element = _react2.default.createElement(component.default || component, props || {});

  return element;
}

/**
   * Uses ReactDOMServer.renderToString on a component at filePath. Will apply optional pro
   * https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
   *
   * @param  {String} filePath react component to render
   * @param  {Object} props    properties to apply to the React component
   * @return {Buffer}          buffer of the component rendered to a string
   */
function renderToString(filePath, props) {
  var element = createElement(filePath, props);
  var elementString = _server2.default.renderToString(element);

  return new Buffer(elementString);
}

/**
   * Uses ReactDOMServer.renderToStatic on a component at filePath. Will apply optional props
   * https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
   *
   * @param  {String} filePath react component to render
   * @param  {Object} props    properties to apply to the React component
   * @return {Buffer}          buffer of the component rendered to a string
   */
function renderToStaticMarkup(filePath, props) {
  var element = createElement(filePath, props);
  var elementMarkup = _server2.default.renderToStaticMarkup(element);

  return new Buffer(elementMarkup);
}

module.exports = function (options) {
  var opts = options || {};

  if (!opts.type || opts.type !== 'string' && opts.type !== 'markup') {
    throw new _gulpUtil2.default.PluginError('gulp-render-react', '`type` required (`string` or `markup`)');
  }

  return _through2.default.obj(function process(file, enc, callback) {
    try {
      var newFile = file;
      // temporary before we allow src extension in options
      if (opts.type === 'string') {
        newFile.contents = renderToString(file.path, opts.props ? opts.props : {});
      } else if (opts.type === 'markup') {
        newFile.contents = renderToStaticMarkup(file.path, opts.props ? opts.props : {});
      }
      // temporary before we allow dest extension in options
      newFile.path = _gulpUtil2.default.replaceExtension(file.path, '.html');
      this.push(newFile);
    } catch (err) {
      this.emit('error', new _gulpUtil2.default.PluginError('gulp-render-react', err, { fileName: file.path }));
    }
    callback();
  });
};
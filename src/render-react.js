/*! Gulp Render React | MIT License */

import gutil from 'gulp-util';
import through from 'through2';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Requires a file containing a React component and create an instance of it
 * @param  {String} filePath file path to the React component to render
 * @param  {Object} props    properties to apply to the element
 * @return {Element}         the created React element
 */
function createElement(filePath, props) {
  if (!filePath || typeof filePath !== 'string' || filePath.length === 0) {
    throw new Error('Expected filePath to be a string');
  }

  // clear the require cache if we have already imported the file (if we are watching it)
  if (require.cache[filePath]) {
    delete require.cache[filePath];
  }

  const component = require(filePath); // eslint-disable-line global-require, import/no-dynamic-require
  const element = React.createElement(component.default || component, props || {});

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
  const element = createElement(filePath, props);
  const elementString = ReactDOMServer.renderToString(element);

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
  const element = createElement(filePath, props);
  const elementMarkup = ReactDOMServer.renderToStaticMarkup(element);

  return new Buffer(elementMarkup);
}

module.exports = (options) => {
  const opts = options || {};

  if (!opts.type || (opts.type !== 'string' && opts.type !== 'markup')) {
    throw new gutil.PluginError('gulp-render-react', '`type` required (`string` or `markup`)');
  }

  return through.obj(function process(file, enc, callback) {
    try {
      const newFile = file;
      // temporary before we allow src extension in options
      if (opts.type === 'string') {
        newFile.contents = renderToString(file.path, opts.props ? opts.props : {});
      } else if (opts.type === 'markup') {
        newFile.contents = renderToStaticMarkup(file.path, opts.props ? opts.props : {});
      }
      // temporary before we allow dest extension in options
      newFile.path = gutil.replaceExtension(file.path, '.html');
      this.push(newFile);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-render-react', err, { fileName: file.path }));
    }
    callback();
  });
};

/*! Gulp Render React | MIT License */

import 'babel/polyfill';
import gutil from 'gulp-util';
import through from 'through2';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Require a file containing a React component and render it to a string
 * using ReactDOMServer.renderToString
 * https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
 *
 * @param  {String} filePath React component to render
 * @param  {Object} props    Properties to apply to the React component
 * @return {Buffer} buffer of the component rendered to a string
 */
function renderToString(filePath, props) {
	const component = React.createFactory(require(filePath));
	const element = component(props);
	return new Buffer(ReactDOMServer.renderToString(element));
}

/**
 * Require a file containing a React component and render it to a string
 * using ReactDOMServer.renderToStatic
 * https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
 *
 * @param  {String} filePath React component to render
 * @param  {Object} props    Properties to apply to the React component
 * @return {Buffer} buffer of the component rendered to a string
 */
function renderToStaticMarkup(filePath, props) {
	const component = React.createFactory(require(filePath));
	const element = component(props);
	return new Buffer(ReactDOMServer.renderToStaticMarkup(element));
}

module.exports = (options) => {
	const opts = options || {};

	if (!opts.type || (opts.type !== 'string' && opts.type !== 'markup')) {
		throw new gutil.PluginError('gulp-render-react', '`type` required (`string` or `markup`)');
	}

	return through.obj(function process(file, enc, cb) {
		try {
			// temporary before we allow src extension in options
			if (opts.type === 'string') {
				file.contents = renderToString(file.path, opts.props ? opts.props : {});
			} else if (opts.type === 'markup') {
				file.contents = renderToStaticMarkup(file.path, opts.props ? opts.props : {});
			}
			// temporary before we allow dest extension in options
			file.path = gutil.replaceExtension(file.path, '.html');
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-render-react', err, {fileName: file.path }));
		}
		cb();
	});
};

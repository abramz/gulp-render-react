/*! React Starter Kit | MIT License */'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}require(

'babel/polyfill');var _gulpUtil = require(
'gulp-util');var _gulpUtil2 = _interopRequireDefault(_gulpUtil);var _through2 = require(
'through2');var _through22 = _interopRequireDefault(_through2);var _react = require(
'react');var _react2 = _interopRequireDefault(_react);var _reactDomServer = require(
'react-dom/server');var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

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
	var component = _react2['default'].createFactory(require(filePath));
	var element = component(props);
	return new Buffer(_reactDomServer2['default'].renderToString(element));}


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
	var component = _react2['default'].createFactory(require(filePath));
	var element = component(props);
	return new Buffer(_reactDomServer2['default'].renderToStaticMarkup(element));}


module.exports = function (options) {
	var opts = options || {};

	if (!opts.type || opts.type !== 'string' && opts.type !== 'markup') {
		throw new _gulpUtil2['default'].PluginError('gulp-render-react', '`type` required (`string` or `markup`)');}


	return _through22['default'].obj(function process(file, enc, cb) {
		try {
			// temporary before we allow src extension in options
			if (opts.type === 'string') {
				file.contents = renderToString(file.path, opts.props ? opts.props : {});} else 
			if (opts.type === 'markup') {
				file.contents = renderToStaticMarkup(file.path, opts.props ? opts.props : {});}

			// temporary before we allow dest extension in options
			file.path = _gulpUtil2['default'].replaceExtension(file.path, '.html');
			this.push(file);} 
		catch (err) {
			this.emit('error', new _gulpUtil2['default'].PluginError('gulp-render-react', err, { fileName: file.path }));}

		cb();});};
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

module.exports = function (opts) {
	opts = opts || {};

	if (!opts.type || (opts.type !== 'string' && opts.type !== 'markup')) {
		throw new gutil.PluginError('gulp-render-react', '`type` required (`string` or `markup`)');
		return;
	}

	return through.obj(function (file, enc, cb) {
		try {
			// temporary before we allow src extension in options
			nodejsx.install({ extension: '.jsx' });
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

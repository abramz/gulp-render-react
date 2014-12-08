/* global it */
'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var render = require('./');

it('should render valid React components to string', function (cb) {
  var stream = render('string');
  stream.on('data', function (file) {
    var pattern = /<ul data-reactid=".*?" data-react-checksum=".*?"><li data-reactid=".*?"><span data-reactid=".*?">some<\/span><span data-reactid=".*?"> : <\/span><span data-reactid=".*?">prop<\/span><\/li><\/ul>/;
    assert(pattern.test(file.contents.toString()));
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixtures/validComponent.jsx'
  }));
});

it('should render valid React components to static markup', function (cb) {
  var stream = render('markup');
  stream.on('data', function (file) {
    var pattern = /<ul><li>some : prop<\/li><\/ul>/;
    assert(pattern.test(file.contents.toString()));
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixtures/validComponent.jsx'
  }));
});

it('should render provided props', function (cb) {
  var stream = render('markup', {
    props: {
      a: 'prop',
      b: 'thing',
      c: 'stuff'
    }
  });
  stream.on('data', function (file) {
    var pattern = /<ul><li>a : prop<\/li><li>b : thing<\/li><li>c : stuff<\/li><li>some : prop<\/li><\/ul>/;
    assert(pattern.test(file.contents.toString()));
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixtures/validComponent.jsx'
  }));
});

it('should render when given js', function (cb) {
    var stream = render('markup');
    stream.on('data', function (file) {
      var pattern = /<ul><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: __dirname + '/fixtures/anotherValidComponent.js'
    }));
});

it('should have an error if `type` is not `string` or `markup`', function (cb) {
  assert.throws(render, gutil.PluginError);
  cb();
});

it('should emit an error for invalid React components', function (cb) {
  var stream = render('string');
  stream.on('error', function () {
    cb();
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/fixtures/invalidComponent.jsx'
  }));
});

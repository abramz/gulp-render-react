/*! Gulp Render React | MIT License */

/* global describe, it */
import assert from 'assert';
import gutil from 'gulp-util';
import render from '../src/render-react.js';

describe('gulp-render-react', () => {
  it('should render valid React components to string', (cb) => {
    const stream = render({
      type: 'string',
    });

    stream.on('data', (file) => {
      const extensionPattern = /.*?\.html/;
      const contentsPattern = /<ul data-reactid=".*?" data-react-checksum=".*?"><li data-reactid=".*?"><span data-reactid=".*?">some<\/span><span data-reactid=".*?"> : <\/span><span data-reactid=".*?">prop<\/span><\/li><\/ul>/;
      assert(extensionPattern.test(file.path));
      assert(contentsPattern.test(file.contents.toString()));
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/validComponent.js`,
    }));
  });

  it('should render valid React components to static markup', (cb) => {
    const stream = render({
      type: 'markup',
    });

    stream.on('data', (file) => {
      const pattern = /<ul><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/validComponent.js`,
    }));
  });

  it('should render provided props', (cb) => {
    const stream = render({
      type: 'markup',
      props: {
        a: 'prop',
        b: 'thing',
        c: 'stuff',
      },
    });

    stream.on('data', (file) => {
      const pattern = /<ul><li>a : prop<\/li><li>b : thing<\/li><li>c : stuff<\/li><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/validComponent.js`,
    }));
  });

  it('should render when given js', (cb) => {
    const stream = render({
      type: 'markup',
    });

    stream.on('data', (file) => {
      const pattern = /<ul><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/anotherValidComponent.js`,
    }));
  });

  it('should have an error if `type` is not `string` or `markup`', (cb) => {
    assert.throws(render, gutil.PluginError);
    cb();
  });

  it('should emit an error for invalid React components', (cb) => {
    const stream = render({
      type: 'string',
    });

    stream.on('error', () => {
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/invalidComponent.js`,
    }));
  });
});

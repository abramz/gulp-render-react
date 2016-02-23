/*! Gulp Render React | MIT License */

/* global describe, it */
import assert from 'assert';
import gutil from 'gulp-util';
import render from '../src/render-react.js';

describe('gulp-render-react', () => {
  it('should render valid React components to string', (done) => {
    const stream = render({
      type: 'string',
    });

    stream.on('data', (file) => {
      const extensionPattern = /.*?\.html/;
      const contentsPattern = /<ul data-reactid=".*?" data-react-checksum=".*?"><li data-reactid=".*?"><span data-reactid=".*?">some<\/span><span data-reactid=".*?"> : <\/span><span data-reactid=".*?">prop<\/span><\/li><\/ul>/;
      assert(extensionPattern.test(file.path));
      assert(contentsPattern.test(file.contents.toString()));
      done();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/valid-component.js`,
    }));
  });

  it('should render valid React components to static markup', (done) => {
    const stream = render({
      type: 'markup',
    });

    stream.on('data', (file) => {
      const pattern = /<ul><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      done();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/valid-component.js`,
    }));
  });

  it('should render provided props', (done) => {
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
      done();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/valid-component.js`,
    }));
  });

  it('should render when given js', (done) => {
    const stream = render({
      type: 'markup',
    });

    stream.on('data', (file) => {
      const pattern = /<ul><li>some : prop<\/li><\/ul>/;
      assert(pattern.test(file.contents.toString()));
      done();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/another-valid-component.js`,
    }));
  });

  it('should have an error if `type` is not `string` or `markup`', (done) => {
    assert.throws(render, gutil.PluginError);
    done();
  });

  it('should emit an error for invalid React components', (done) => {
    const stream = render({
      type: 'string',
    });

    stream.on('error', () => {
      done();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: `${__dirname}/fixtures/invalid-component.js`,
    }));
  });

  describe('With react-router', () => {
    const appPattern = /<h1 data-reactid=".*?">App<\/h1>/;
    const homePattern = /<h2 data-reactid=".*?">Home<\/h2>/;
    const aboutPattern = /<h2 data-reactid=".*?">About<\/h2>/;

    it('should render the default route', (done) => {
      const stream = render({
        type: 'string',
      });

      stream.on('data', (file) => {
        assert(appPattern.test(file.contents.toString()));
        assert(homePattern.test(file.contents.toString()));
        done();
      });

      stream.write(new gutil.File({
        base: __dirname,
        path: `${__dirname}/fixtures/react-router.js`,
      }));
    });

    it('should render the "/home" route', (done) => {
      const stream = render({
        type: 'string',
        props: {
          location: 'home',
        },
      });

      stream.on('data', (file) => {
        assert(appPattern.test(file.contents.toString()));
        assert(homePattern.test(file.contents.toString()));
        done();
      });

      stream.write(new gutil.File({
        base: __dirname,
        path: `${__dirname}/fixtures/react-router.js`,
      }));
    });

    it('should render the "/about" route', (done) => {
      const stream = render({
        type: 'string',
        props: {
          location: 'about',
        },
      });

      stream.on('data', (file) => {
        assert(appPattern.test(file.contents.toString()));
        assert(aboutPattern.test(file.contents.toString()));
        done();
      });

      stream.write(new gutil.File({
        base: __dirname,
        path: `${__dirname}/fixtures/react-router.js`,
      }));
    });
  });
});

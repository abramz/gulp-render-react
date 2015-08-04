# [gulp](http://gulpjs.com)-render-react [![Build Status](https://travis-ci.org/abramz/gulp-react-render.svg)](https://travis-ci.org/abramz/gulp-react-render)

> Render React components to string or static markup

Will render React component with [React.renderToString](http://facebook.github.io/react/docs/top-level-api.html#react.rendertostring) or [React.renderToStaticMarkup](http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup)

## Install
```sh
$ npm install --save-dev gulp-render-react
```

## Usage
```js
var gulp = require('gulp');
var render = require('gulp-render-react');

var SRC = 'src/*.jsx';
var DEST = 'dist';

gulp.task('default', function () {
  return gulp.src(SRC, { read: false })
    .pipe(render('string', {
      some: 'default'
      props: 'to',
      pass: 'on'
    }))
    .pipe(gulp.dest(DEST));
});
```
## API

### render(type, props)

* `type` is
  * `string` for React.renderToString()
  * `markup` for React.renderToStaticMarkup()
* `props` are the properties to create the component with

## License

MIT © [Andrew Shapro](https://github.com/abramz)

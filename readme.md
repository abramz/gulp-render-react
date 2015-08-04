[![Build Status](https://travis-ci.org/abramz/gulp-render-react.svg)](https://travis-ci.org/abramz/gulp-render-react)
[![Dependency Status](https://david-dm.org/abramz/gulp-render-react.svg)](https://david-dm.org/abramz/gulp-render-react)
# [gulp](http://gulpjs.com)-render-react 
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
    .pipe(render({
    	type: 'string',
    	props: {
	      some: 'default'
	      props: 'to',
	      pass: 'on'
      }
    }))
    .pipe(gulp.dest(DEST));
});
```
## API

### render(opts)

* `type` is
  * `string` for React.renderToString()
  * `markup` for React.renderToStaticMarkup()
* `props` are the properties to create the component with

## License

Copyright (c) 2014-2015 Andrew Shapro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

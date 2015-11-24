# sub-error [![Build Status](https://travis-ci.org/golyshevd/sub-error.svg)](https://travis-ci.org/golyshevd/sub-error)

_Easy sub errors_

## Installation

The module available via [npm](https://www.npmjs.com/package/sub-error)

```bash
npm i sub-error --save
```

## API

#### `SubError new SubError(msg[, arg[, arg]])`

_class_

Creates new SubError

```js
var SubError = require('sub-error');
var subError = new SubError('There is an error (%s)!', 'OMG');
```

#### `Function SubError.subError(String name)`

_method_

Creates an descendant class of SubError

```js
var SubError = require('sub-error');
var AppError = SubError.subError('AppError');
var AppRuntimeError = AppError.subError('AppRuntimeError');
var appRuntimeError = new AppRuntimeError('Some badness happened...');
```

#### `SubError subError.extend(Object obj)`

_method_

Extends subError object with any data

```js
var SubError = require('sub-error');
throw new SubError('An error occurred').extend({
    code: 'FOOBAR',
    some: 'details'
});
```

---------
LICENSE [MIT](LICENCE)

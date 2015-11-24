'use strict';

var f2 = require('f2');

var isIdentifier = require('./utils/is-identifier');

function strfErrorConstructor(name) {
    var tmpl = [
        'return function %(name)s() {',
        '   var argc = arguments.length;',
        '   var args = new Array(argc);',
        '',
        '   while (argc > 0) {',
        '       argc -= 1;',
        '       args[argc] = arguments[argc];',
        '   }',
        '',
        '   Object.defineProperty(this, \'message\', {',
        '       value: fargs(args),',
        '       configurable: true,',
        '       enumerable: false,',
        '       writable: true',
        '   });',
        '',
        '   Error.captureStackTrace(this, this.constructor);',
        '};',
        ''
    ].join('\n');

    return f2.format(tmpl, {name: name});
}

function createErrorConstructor(name) {
    if (isIdentifier(name)) {
        return (new Function('fargs', strfErrorConstructor(name)))(function (args) {
            return f2.applyArgs(args);
        });
    }

    throw new TypeError('Class name should be a valid identifier, not ' + name);
}

function subError(BaseError, name) {
    var SubError = createErrorConstructor(name);

    SubError.prototype = Object.create(BaseError.prototype);
    SubError.prototype.constructor = SubError;
    SubError.prototype.name = name;

    SubError.subError = function (name) {
        return subError(this, name);
    };

    return SubError;
}

/**
 * @class SubError
 * @extends Error
 * */
var SubError = subError(Error, 'SubError');

/**
 * @public
 * @memberOf {SubError}
 * @property
 *
 * @type {String}
 * */
SubError.prototype.message = '';

/**
 * @public
 * @memberOf {SubError}
 * @method
 *
 * @param {Object} obj
 *
 * @returns {SubError}
 * */
SubError.prototype.extend = function (obj) {
    obj = Object(obj);

    Object.keys(obj).forEach(function (k) {
        this[k] = obj[k];
    }, this);

    return this;
};

module.exports = SubError;

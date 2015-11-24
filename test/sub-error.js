#!/usr/bin/env mocha
/*global describe, it*/
'use strict';

var assert = require('assert');

describe('sub-error', function () {
    var SubError = require('../sub-error');

    it('Should be a SubError class', function () {
        var E = SubError.subError('E');
        assert.strictEqual(typeof SubError, 'function');
        assert.strictEqual(SubError.name, 'SubError');
        assert.strictEqual(typeof SubError.subError, 'function');
    });

    describe('{SubError}.message', function () {
        it('Should support sprintf for error messages', function () {
            var e = new SubError('User is %s.', 'golyshevd');
            assert.strictEqual(e.message, 'User is golyshevd.');
        });
        it('Should be not enumerable', function () {
            var e = new SubError('foo');
            assert.strictEqual(Object.keys(e).indexOf('message'), -1);
        });
    });

    describe('{SubError}.stack', function () {
        it('Should have .stack', function () {
            var e = new SubError('foo');
            assert.strictEqual(Object.keys(e).indexOf('stack'), -1);
            assert.ok(/^SubError:\s*foo/.test(e.stack));
        });
    });

    describe('{SubError}.extend()', function () {
        it('Should extend error with object', function () {
            var e = new SubError();
            var res = e.extend({
                code: 'ERROR'
            }).extend({
                foo: 'bar'
            });

            assert.strictEqual(e.code, 'ERROR');
            assert.strictEqual(res.code, 'ERROR');
            assert.strictEqual(e.foo, 'bar');
            assert.strictEqual(res.foo, 'bar');

            assert.strictEqual(e, res);
        });
    });

    describe('SubError.subError', function () {
        it('Errors should create subErrors', function () {
            var E = SubError.subError('E');
            var e = new E('msg1');
            var E2 = E.subError('E2');
            var e2 = new E2('msg2');

            assert.ok(e instanceof Error);
            assert.ok(e instanceof E);
            assert.strictEqual(e.constructor, E);
            assert.strictEqual(e.name, 'E');
            assert.strictEqual(e.message, 'msg1');
            assert.strictEqual(typeof e.stack, 'string');

            assert.strictEqual(typeof E2, 'function');
            assert.strictEqual(E2.name, 'E2');
            assert.strictEqual(typeof E2, 'function');

            assert.ok(e2 instanceof Error);
            assert.ok(e2 instanceof E);
            assert.ok(e2 instanceof E2);

            assert.strictEqual(e2.constructor, E2);
            assert.strictEqual(e2.name, 'E2');
            assert.strictEqual(e2.message, 'msg2');
            assert.strictEqual(typeof e2.stack, 'string');
        });
        it('Should not allow to pass not an identifiers as error names', function () {
            assert.throws(function () {
                return SubError.subError('1');
            });
            assert.throws(function () {
                return SubError.subError('a-1');
            });
            assert.throws(function () {
                return SubError.subError('var');
            });
            assert.doesNotThrow(function () {
                return SubError.subError('a1');
            });
        });
    });
});

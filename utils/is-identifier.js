'use strict';

var isKeyword = require('./is-keyword');

function isIdentifier(name) {
    return typeof name === 'string' && /^[$_a-z][$\w]*$/i.test(name) && !isKeyword(name);
}

module.exports = isIdentifier;

'use strict';

let path = require('path');

module.exports = function(filename) {
  return /(\.js$)/i.test(path.extname(filename));
};
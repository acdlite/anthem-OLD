'use strict';

// Promisification
let Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
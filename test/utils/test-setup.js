'use strict';

require('co-mocha');

let mockgoose = require('mockgoose');
let mongoose = require('mongoose');
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/test');

let Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
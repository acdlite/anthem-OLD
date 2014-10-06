'use strict';

require('./utils/test-setup');

let expect = require('chai').expect;
let mockgoose = require('mockgoose');
let _ = require('lodash');

describe('Content', function() {
  beforeEach(function() {
    mockgoose.reset();
  });

  afterEach(function() {
    mockgoose.reset();
  });

  let Post = require('../models/Post');
  let User = require('../models/User');

  let u1 = {
    email: 'joe@example.com',
    password: 'abcd1234',
  };

  let p1 = {
    contentType: 'number',
    content: 1234,
  };

  let p2 = {
    contentType: 'text',
    content: 'Lorem ipsum',
  };

  it('should accept any SchemaType as content', function *() {
    let author = yield User.create(u1);
    let _p1 = _.merge({ author: author }, p1);
    let _p2 = _.merge({ author: author }, p2);
    yield Post.create(_p1);
    yield Post.create(_p2);
  });
});
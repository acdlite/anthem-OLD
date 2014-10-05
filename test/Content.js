'use strict';

require('./utils/test-setup');

let expect = require('chai').expect;
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');

describe('Content', function() {
  beforeEach(function() {
    mockgoose.reset();
  });

  afterEach(function() {
    mockgoose.reset();
  });

  // ContentSchema shouldn't be used to create a model directly,
  // but we do here for testing purposes
  let ContentSchema = require('../models/abstract/Content').Schema;
  let Content = mongoose.model('Content', new ContentSchema());

  let c1 = {
    type: 'markdown',
    content: '**Lorem ipsum**'
  };

  let c2 = {
    type: 'number',
    content: 1234,
  };

  // Missing type
  let c3 = {
    content: 'Lorem ipsum',
  };

  it('should accept any SchemaType as content', function *() {
    let content1 = yield Content.create(c1);
    let content2 = yield Content.create(c2);

    expect(content1.content).to.equal('**Lorem ipsum**');
    expect(content2.content).to.equal(1234);
  });

  it('should require content.type to exist', function *() {
    let error;
    try { yield Content.create(c3); } catch (e) { error = e; }

    expect(error.name).to.equal('ValidationError');
  });
});
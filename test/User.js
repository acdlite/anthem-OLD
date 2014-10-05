'use strict';

require('./utils/test-setup');

let expect = require('chai').expect;
let mockgoose = require('mockgoose');
let co = require('co');

describe('User', function() {
  beforeEach(function() {
    mockgoose.reset();
  });

  afterEach(function() {
    mockgoose.reset();
  });

  let User = require('../models/User');

  let u1 = {
    email: 'john@example.org',
    password: 'abcd1234',
  };

  let u2 = {
    email: 'jane@email.com',
    password: 'asdfjkl',
    name: {
      first: 'Jane',
      last: 'Doe',
    },
  };

  it('should hash passwords', function *() {
    let user = yield User.create(u1);
    expect(user.password).to.not.equal('abcd1234');
    expect(yield user.isValidPassword('abcd1234')).to.be.true;
    expect(yield user.isValidPassword('wrongpassword')).to.be.false;
  });

  it('should not create multiple users with the same email', function *() {
    yield User.create(u1);

    let error;
    try {
      yield User.create(u1);
    }
    catch (e) {
      error = e;
    }

    expect(error.name).to.equal('MongoError');
  });

  describe('user.name.display', function() {
    beforeEach(function() {
      mockgoose.reset();
    });

    afterEach(function() {
      mockgoose.reset();
    });

    it('should return empty string if neither first name nor last name are set', function *() {
      let user = yield User.create(u1);
      expect(user.name.display).to.equal('');
    });

    it('should return first name + last name, if both are set', function *() {
      let user = yield User.create(u2);
      expect(user.name.display).to.equal('Jane Doe');
    });
  });
});
'use strict';

/**
 * User model
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let inherits = require('util').inherits;
let bcrypt = require('bcrypt');
let co = require('co');

let Promise = require('bluebird');
Promise.promisifyAll(require('bcrypt'));

const SALT_WORK_FACTOR = 10;

function UserSchema() {
  var self = this;
  Schema.apply(this, arguments);

  this.add({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: {
      first: String,
      last: String,
    },
  });

  /**
   * Returns display name. For now, this is just first name + last name.
   * TODO: Make this configurable.
   * @return {String} Display name
   */
  this.virtual('name.display').get(function() {
    if (this.name) {
      if (this.name.first && this.name.last) {
        return this.name.first + ' ' + this.name.last;
      }
      else if (this.name.first) {
        return this.name.first;
      }
      else if (this.name.last) {
        return this.name.last;
      }
      else {
        return '';
      }
    }
    else {
      return this.email;
    }
  });

  // Hash password before saving
  this.pre('save', function(next) {
    let user = this;

    // Return if password hasn't been changed or created
    if (!user.isModified('password')) return next();

    co(function *() {
      try {
        user.password = yield self.statics.generateHash(user.password);
        next();
      }
      catch (error) {
        next(error);
      }
    })();
  });

  /**
   * Generates hashed password
   * @param {String} password - Password to hash
   * @param {Integer} [rounds] - Salt work factor
   * @returns {Promise} Promise for hash
   * @static
   */
  this.statics.generateHash = function(password, rounds) {
    if (typeof rounds === 'undefined') {
      rounds = SALT_WORK_FACTOR;
    }

    return bcrypt.hashAsync(password, rounds);
  };

  /**
   * Checks if password is valid
   * @param  {String} password - Password to check
   * @return {Promise} Promise for boolean
   */
  this.methods.isValidPassword = function(password) {
    return bcrypt.compareAsync(password, this.password);
  };
}

inherits(UserSchema, Schema);

let User = mongoose.model('User', new UserSchema());
exports = module.exports = User;
exports.Schema = UserSchema;
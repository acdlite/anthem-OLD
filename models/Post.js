'use strict';

/**
 * Post
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ContentSchema = require('./abstract/Content').Schema;

let PostSchema = new ContentSchema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post', PostSchema);
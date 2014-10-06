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

PostSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Post', PostSchema);
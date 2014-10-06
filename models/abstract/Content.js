'use strict';

/**
 * Content
 *
 * Base schema for Post and similar schemas
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let inherits = require('util').inherits;
let ContentField = require('./ContentField');

function ContentSchema() {
  Schema.apply(this, arguments);

  this.add({
    contentType: { type: String, required: true },
    content: Schema.Types.Mixed,
  });
}

inherits(ContentSchema, Schema);

exports.Schema = ContentSchema;
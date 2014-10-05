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
    type: { type: String, required: true },
    content: Schema.Types.Mixed,
    fields: [ContentField.Schema],
  });
}

inherits(ContentSchema, Schema);

exports.Schema = ContentSchema;
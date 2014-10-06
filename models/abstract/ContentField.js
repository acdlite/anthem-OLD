'use strict';

/**
 * ContentField
 *
 * Should only be used as a subdocument.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContentFieldSchema = Schema({
  name: { type: String, required: true },
  contentType: { type: String, default: '', required: true },
});

exports.Schema = ContentFieldSchema;
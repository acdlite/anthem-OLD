'use strict';

let app = require('../app.js');
let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId();
const config = require('../config/api');

function restifyModel(Model) {
  let collectionName = Model.collection.name;

  // GET /collection
  app.get('/' + collectionName, function *() {
    let queryParams = this.query;

    let query = Model.find({});

    let sort =
      queryParams.sort ||
      (typeof Model.getDefaultSort ==='function' && Model.getDefaultSort()) ||
      config.defaultSort;

    query = query.sort(sort);

    let limit = parseInt(queryParams.limit);

    if (!isNaN(limit)) {
      limit = (typeof Model.getDefaultLimit === 'function')
        ? Model.getDefaultLimit()
        : config.defaultLimit;
    }
    else {
      limit = config.defaultLimit;
    }

    query = query.limit(limit);

    if (queryParams.after) {
      let cursor = new ObjectId(queryParams.after);
      query = query.gt('_id', cursor);
    }

    let docs = yield query.exec();

    docs = docs.map(function(doc) {
      return doc.toJSON();
    });

    let response = {
      href: this.request.url,
    };

    response[collectionName] = docs;

    response = formatObjectForConsumer(response);
    this.body = response;
  });

  // POST /collection
  app.post('/' + collectionName, function *() {
    let doc = yield Model.create(this.request.body);

    let response = {};
    response[collectionName] = doc.toJSON();

    this.body = response;
  });

  // GET /collection/:id

  // PUT /colection/:id

  // DELETE /collection/:id
}

function formatObjectForConsumer(object) {
  // TODO: Should we convert keys to camelcase?
  return object;
}

module.exports = restifyModel;
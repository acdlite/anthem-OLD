'use strict';

let fs = require('fs');

require('./setup');

// Connect to database
let mongoose = require('mongoose');
let dbConfig = require('./config/database');
mongoose.connect(dbConfig.url);

let koa = require('koa');
let app = koa();


let bodyParser = require('koa-bodyparser');
app.use(bodyParser());

let json = require('koa-json');
app.use(json());

let session = require('koa-session');
app.keys = ['icallthebigonebitey'];
app.use(session());

let passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

let router = require('koa-router');
app.use(router(app));

require('koa-qs')(app);

let scriptFilter = require('./lib/scriptFilter');
let path = require('path');
const MODEL_DIR = './models';
fs.readdirSync('./models')
  .filter(scriptFilter)
  .forEach(function(filename) {
    filename = path.resolve(MODEL_DIR, filename);
    let model = require(filename);
    let collectionName = model.collection.name;

    // model.find();

    app.get('/' + collectionName, function *() {
      let response = {
        url: '/' + collectionName,
      };

      this.body = response;
    });
  });

app.listen(process.env.PORT || 8000);
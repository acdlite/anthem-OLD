'use strict';

let fs = require('fs');

require('./setup');

let koa = require('koa');
let app = module.exports = koa();

// Error handling
app.use(function *(next) {
  try {
    yield next;
  }
  catch (error) {
    this.status = error.status || 500;
    this.body = error.message;
    this.app.emit('error', error, this);
  }
});

// Connect to database
let mongoose = require('mongoose');
let dbConfig = require('./config/database');
mongoose.connect(dbConfig.url);

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

let restifyModel = require('./lib/restifyModel');

let scriptFilter = require('./lib/scriptFilter');
let path = require('path');
const MODEL_DIR = './models';
fs.readdirSync('./models')
  .filter(scriptFilter)
  .forEach(function(filename) {
    filename = path.resolve(MODEL_DIR, filename);
    let Model = require(filename);
    restifyModel(Model);
  });

app.listen(process.env.PORT || 8000);
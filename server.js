'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Employees = require('./api/models/employee'),
  bodyParser = require('body-parser'),
  multer = require("multer");


mongoose.connect('mongodb://vj:vj123@ds241677.mlab.com:41677/apria');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));



var routes = require('./api/routes/appRoutes');

routes(app);


app.listen(port);



module.exports = app;
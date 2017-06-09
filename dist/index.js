'use strict';

var output = require('d3node-output');
var ejs = require('ejs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var d3 = require('d3');

var votingData = require('../models/votingSchema');

var VotingRoute = require('../routes/voting'

//mongoose DATABASE
);var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/d3_vote')
var MONGODB_URI = 'mongodb://admin:admin@ds119302.mlab.com:19302/voting';

mongoose.connect(process.env.MONGODB_URI).then(function () {
  return console.log('connected to MONGODB server');
}).catch(function (err) {
  return console.log('Server disconnected');
});

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(VotingRoute);

app.listen(3000, function () {
  return console.log('server on port: ');
});
console.log(process.env.MONGODB_URI);